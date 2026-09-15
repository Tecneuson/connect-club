/* -----------------------------------------------------------------------------
   Checkout do Connect Club via EuPago. Três caminhos, conforme o que se compra:

   · mensalidade, débito direto — mandato SEPA criado servidor a servidor. O
     cliente dá o IBAN no nosso site e recebe o mandato por email. Com
     periodicidade mensal a EuPago debita sozinha (autoProcess = "1").
   · mensalidade, cartão — subscrição com 3D Secure no formulário da EuPago.
   · pack — Pay By Link: pagamento único numa página da EuPago.

   Os pagamentos seguintes chegam pelo webhook em /api/webhooks/eupago.
----------------------------------------------------------------------------- */

import "server-only";

import type { CheckoutRequest, CheckoutResult, DirectDebitRequest } from "@/lib/payments/types";
import {
  createCreditCardSubscription,
  createDirectDebitAuthorization,
  createPayByLink,
  eupagoApiKey,
  EupagoError,
} from "./client";

/** Prefixo do `identifier` para reconhecermos as nossas transações no webhook. */
const IDENTIFIER_PREFIX = "cc";

/** Formata uma data em YYYY-MM-DD (a EuPago espera este formato). */
function toApiDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/**
 * Dia do mês em que a mensalidade é cobrada.
 * Limitado a 28 para que exista em todos os meses (incluindo fevereiro).
 */
function collectionDay(reference: Date): number {
  const configured = Number(process.env.EUPAGO_COLLECTION_DAY);
  const day = Number.isFinite(configured) && configured >= 1 ? configured : reference.getDate();
  return Math.min(Math.max(Math.trunc(day), 1), 28);
}

/**
 * Data do último débito da autorização. Não há fidelização, por isso pomos um
 * horizonte longo: quem cancela é revogado antes disto chegar.
 */
function limitDate(start: Date): Date {
  const years = Number(process.env.EUPAGO_SUBSCRIPTION_YEARS);
  const span = Number.isFinite(years) && years > 0 ? Math.trunc(years) : 10;
  const end = new Date(start);
  end.setFullYear(end.getFullYear() + span);
  return end;
}

/** O primeiro débito direto precisa de pré-aviso ao banco: não pode ser hoje. */
function firstDebitDate(now: Date): Date {
  const configured = Number(process.env.EUPAGO_DD_LEAD_DAYS);
  const days = Number.isFinite(configured) && configured >= 0 ? Math.trunc(configured) : 5;
  const date = new Date(now);
  date.setDate(date.getDate() + days);
  return date;
}

/** Identificador único e legível, com o plano lá dentro para o webhook o ler. */
function buildIdentifier(planSlug: string): string {
  const nonce = Math.random().toString(36).slice(2, 10);
  return `${IDENTIFIER_PREFIX}-${planSlug}-${nonce}`;
}

/** Lê o slug do plano a partir de um identifier criado por `buildIdentifier`. */
export function planFromIdentifier(identifier: string | undefined): string | undefined {
  if (!identifier) return undefined;
  const withoutPrefix = identifier.startsWith(`${IDENTIFIER_PREFIX}-`)
    ? identifier.slice(IDENTIFIER_PREFIX.length + 1)
    : identifier;
  const lastDash = withoutPrefix.lastIndexOf("-");
  if (lastDash <= 0) return undefined;
  return withoutPrefix.slice(0, lastDash);
}

/** true quando há API Key para cobrar a sério. */
export function isConfigured(): boolean {
  return Boolean(eupagoApiKey());
}

const NOT_CONFIGURED: CheckoutResult = {
  ok: false,
  demo: true,
  reason: "Pagamentos ainda não ativos: falta configurar EUPAGO_API_KEY.",
};

const FAILED: CheckoutResult = {
  ok: false,
  demo: false,
  reason: "Não foi possível iniciar o pagamento.",
};

/** URLs de volta do formulário da EuPago, com o plano e a referência na query. */
function returnUrls(origin: string, planSlug: string, ref: string, tipo: "cartao" | "pack") {
  const query = `plano=${encodeURIComponent(planSlug)}&ref=${encodeURIComponent(ref)}&tipo=${tipo}`;
  return {
    successUrl: `${origin}/sucesso?${query}`,
    failUrl: `${origin}/cancelado?${query}&estado=falha`,
    backUrl: `${origin}/cancelado?${query}`,
  };
}

function logError(scope: string, err: unknown) {
  if (err instanceof EupagoError) {
    console.error(`EuPago ${scope}:`, err.message, err.body);
  } else {
    console.error(`EuPago ${scope}:`, err);
  }
}

/** Mensalidade com cartão: subscrição e URL do formulário seguro da EuPago. */
export async function createSubscriptionCheckout({
  offer,
  email,
  origin,
}: CheckoutRequest): Promise<CheckoutResult> {
  if (!isConfigured()) return NOT_CONFIGURED;

  const now = new Date();
  const identifier = buildIdentifier(offer.slug);

  try {
    const subscription = await createCreditCardSubscription({
      identifier,
      amount: offer.amountEur,
      currency: "EUR",
      startDate: toApiDate(now),
      periodicity: "Mensal",
      collectionDay: collectionDay(now),
      limitDate: toApiDate(limitDate(now)),
      autoProcess: "1",
      customerEmail: email,
      notifyCustomer: true,
      ...returnUrls(origin, offer.slug, identifier, "cartao"),
    });

    if (!subscription?.redirectUrl) {
      console.error("EuPago: subscrição criada sem redirectUrl", subscription);
      return { ok: false, demo: false, reason: "A EuPago não devolveu o formulário de pagamento." };
    }

    return {
      ok: true,
      url: subscription.redirectUrl,
      reference: subscription.subscriptionID ?? subscription.referenceSubs,
      identifier,
    };
  } catch (err) {
    logError("subscrição com cartão", err);
    return FAILED;
  }
}

/** Pack: pagamento único na página Pay By Link da EuPago. */
export async function createPackCheckout({
  offer,
  email,
  origin,
}: CheckoutRequest): Promise<CheckoutResult> {
  if (!isConfigured()) return NOT_CONFIGURED;

  const identifier = buildIdentifier(offer.slug);

  try {
    const link = await createPayByLink({
      identifier,
      amount: offer.amountEur,
      customerEmail: email,
      ...returnUrls(origin, offer.slug, identifier, "pack"),
    });

    if (!link?.redirectUrl) {
      console.error("EuPago: Pay By Link criado sem redirectUrl", link);
      return { ok: false, demo: false, reason: "A EuPago não devolveu a página de pagamento." };
    }

    return { ok: true, url: link.redirectUrl, reference: link.transactionID, identifier };
  } catch (err) {
    logError("pay by link", err);
    return FAILED;
  }
}

/**
 * Mensalidade por débito direto: cria o mandato SEPA. Não há formulário da
 * EuPago, por isso devolvemos logo o URL da nossa página de sucesso.
 *
 * A EuPago não tem periodicidade bimestral. Nas mensalidades de 2 em 2 meses o
 * mandato fica criado sem débito automático e cada débito é lançado pelo clube
 * (backoffice da EuPago ou POST /v1.02/directdebit/payment/{referência}).
 */
export async function createDirectDebitSubscription({
  offer,
  email,
  origin,
  debtor,
}: DirectDebitRequest): Promise<CheckoutResult> {
  if (!isConfigured()) return NOT_CONFIGURED;

  const identifier = buildIdentifier(offer.slug);
  const start = firstDebitDate(new Date());
  const automatic = offer.everyMonths === 1;

  try {
    const mandate = await createDirectDebitAuthorization({
      identifier,
      adminCallback: `${origin}/api/webhooks/eupago`,
      debtor: { name: debtor.name, email, iban: debtor.iban, bic: debtor.bic, collectionNotify: true },
      amount: offer.amountEur,
      startDate: toApiDate(start),
      limitDate: toApiDate(limitDate(start)),
      type: "RCUR",
      autoProcess: automatic ? "1" : "0",
      ...(automatic ? { periodicity: "Mensal" as const, collectionDay: collectionDay(start) } : {}),
    });

    if (!mandate?.reference) {
      console.error("EuPago: mandato de débito direto sem referência", mandate);
      return { ok: false, demo: false, reason: "A EuPago não confirmou o mandato de débito direto." };
    }

    const query = `plano=${encodeURIComponent(offer.slug)}&ref=${encodeURIComponent(mandate.reference)}&tipo=debito`;
    return { ok: true, url: `${origin}/sucesso?${query}`, reference: mandate.reference, identifier };
  } catch (err) {
    logError("débito direto", err);
    return {
      ok: false,
      demo: false,
      reason: "Não foi possível criar o débito direto. Confirma o IBAN e o BIC e tenta de novo.",
    };
  }
}
