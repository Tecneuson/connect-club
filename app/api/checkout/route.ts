import { NextResponse } from "next/server";
import {
  createDirectDebitSubscription,
  createPackCheckout,
  createSubscriptionCheckout,
} from "@/lib/payments/eupago/checkout";
import { handlePaymentEvent } from "@/lib/payments/events";
import type { CheckoutResult } from "@/lib/payments/types";
import { findOffer } from "@/lib/content";
import { isValidBic, isValidIban, maskIban, normalizeBic, normalizeIban } from "@/lib/iban";

type Body = {
  plan?: unknown;
  email?: unknown;
  method?: unknown;
  name?: unknown;
  iban?: unknown;
  bic?: unknown;
};

const text = (value: unknown) => (typeof value === "string" ? value.trim() : "");

const badRequest = (error: string) => NextResponse.json({ error }, { status: 400 });

/**
 * Inicia o pagamento de uma oferta do preçário:
 *   · pack                    → Pay By Link da EuPago (devolve o URL da página);
 *   · mensalidade, cartão     → subscrição com cartão (devolve o URL do formulário);
 *   · mensalidade, débito     → mandato SEPA (devolve o URL da nossa página de sucesso).
 */
export async function POST(req: Request) {
  let body: Body = {};
  try {
    body = (await req.json()) as Body;
  } catch {
    /* corpo vazio ou inválido: as validações abaixo respondem */
  }

  const offer = findOffer(text(body.plan));
  if (!offer) return badRequest("Plano inválido.");

  const email = text(body.email);
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return badRequest("Indica um email válido.");

  const origin = (
    process.env.NEXT_PUBLIC_SITE_URL ??
    req.headers.get("origin") ??
    "http://localhost:3000"
  ).replace(/\/$/, "");

  let result: CheckoutResult;

  if (offer.kind === "pack") {
    result = await createPackCheckout({ offer, email, origin });
  } else if (text(body.method) === "cartao" && offer.everyMonths === 1) {
    result = await createSubscriptionCheckout({ offer, email, origin });
  } else {
    const name = text(body.name);
    const iban = normalizeIban(text(body.iban));
    const bic = normalizeBic(text(body.bic));

    if (name.length < 3) return badRequest("Indica o nome do titular da conta.");
    if (!isValidIban(iban)) return badRequest("O IBAN não parece válido. Confirma os dígitos.");
    if (!isValidBic(bic)) return badRequest("Indica o BIC/SWIFT do teu banco.");

    result = await createDirectDebitSubscription({ offer, email, origin, debtor: { name, iban, bic } });

    // O débito direto não passa por nenhuma página da EuPago, por isso a adesão
    // é avisada daqui. O IBAN vai sempre mascarado.
    if (result.ok) {
      await handlePaymentEvent({
        status: "pending",
        identifier: result.identifier,
        reference: result.reference,
        amount: offer.amountEur,
        currency: "EUR",
        method: "DirectDebit",
        plan: offer.slug,
        customer: { name, email },
        occurredAt: new Date().toISOString(),
        raw: {
          type: "direct_debit_mandate",
          iban: maskIban(iban),
          everyMonths: offer.everyMonths,
          // De 2 em 2 meses a EuPago não debita sozinha: cada débito é lançado pelo clube.
          manualCharge: offer.everyMonths !== 1,
        },
      });
    }
  }

  if (result.ok) {
    return NextResponse.json({ url: result.url });
  }

  // Sem chaves configuradas devolvemos 200: não é um erro, é o modo demonstração.
  return NextResponse.json(
    result.demo ? { demo: true, error: result.reason } : { error: result.reason },
    { status: result.demo ? 200 : 500 },
  );
}
