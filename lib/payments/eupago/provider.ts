/* -----------------------------------------------------------------------------
   EuPago como gateway de subscrição do Connect Club.

   Fluxo (equivalente ao Checkout da Stripe):
     1. criamos a autorização de subscrição via API;
     2. a EuPago devolve um `redirectUrl` para um formulário seguro com 3D Secure;
     3. o cliente preenche o cartão lá e volta ao nosso `successUrl`;
     4. as cobranças seguintes correm sozinhas (autoProcess = "1") e chegam-nos
        pelo webhook em /api/webhooks/eupago.
----------------------------------------------------------------------------- */

import "server-only";

import type { CheckoutRequest, CheckoutResult, PaymentProvider } from "@/lib/payments/types";
import { createCreditCardSubscription, eupagoApiKey, EupagoError } from "./client";

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

export const eupagoProvider: PaymentProvider = {
  id: "eupago",
  displayName: "EuPago",

  isConfigured() {
    return Boolean(eupagoApiKey());
  },

  async createSubscriptionCheckout({ plan, email, origin }: CheckoutRequest): Promise<CheckoutResult> {
    if (!eupagoApiKey()) {
      return {
        ok: false,
        demo: true,
        reason: "Pagamentos ainda não ativos: falta configurar EUPAGO_API_KEY.",
      };
    }

    const now = new Date();
    const identifier = buildIdentifier(plan.slug);
    const query = `plano=${encodeURIComponent(plan.slug)}&ref=${encodeURIComponent(identifier)}`;

    try {
      const subscription = await createCreditCardSubscription({
        identifier,
        amount: plan.amountEur,
        currency: "EUR",
        startDate: toApiDate(now),
        periodicity: "Mensal",
        collectionDay: collectionDay(now),
        limitDate: toApiDate(limitDate(now)),
        autoProcess: "1",
        customerEmail: email,
        notifyCustomer: true,
        successUrl: `${origin}/sucesso?${query}`,
        failUrl: `${origin}/cancelado?${query}&estado=falha`,
        backUrl: `${origin}/cancelado?${query}`,
      });

      if (!subscription?.redirectUrl) {
        console.error("EuPago: subscrição criada sem redirectUrl", subscription);
        return { ok: false, demo: false, reason: "A EuPago não devolveu o formulário de pagamento." };
      }

      return {
        ok: true,
        url: subscription.redirectUrl,
        provider: "eupago",
        reference: subscription.subscriptionID ?? subscription.referenceSubs,
      };
    } catch (err) {
      if (err instanceof EupagoError) {
        console.error("EuPago checkout error:", err.message, err.body);
      } else {
        console.error("EuPago checkout error:", err);
      }
      return { ok: false, demo: false, reason: "Não foi possível iniciar o pagamento." };
    }
  },
};
