/* -----------------------------------------------------------------------------
   O que fazer quando um pagamento muda de estado.

   O site não tem base de dados, por isso este módulo é o ponto único onde os
   eventos aterram: regista sempre no log e, se `PAYMENT_EVENT_WEBHOOK_URL`
   estiver definido, reencaminha o evento normalizado para lá (n8n, Make,
   Zapier, Google Sheets — o que o clube usar para gerir as inscrições).

   Quando existir CRM ou base de dados, é aqui que se liga.
----------------------------------------------------------------------------- */

import "server-only";

import type { PaymentEvent } from "./types";

export async function handlePaymentEvent(event: PaymentEvent): Promise<void> {
  console.info("[pagamento]", {
    provider: event.provider,
    status: event.status,
    plan: event.plan,
    identifier: event.identifier,
    reference: event.reference,
    amount: event.amount,
    method: event.method,
    at: event.occurredAt,
  });

  const forwardTo = process.env.PAYMENT_EVENT_WEBHOOK_URL?.trim();
  if (!forwardTo) return;

  try {
    const res = await fetch(forwardTo, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("Falha ao reencaminhar o evento de pagamento:", res.status, await res.text());
    }
  } catch (err) {
    // Nunca deixamos isto rebentar: a EuPago tem de receber o 200 à mesma,
    // senão fica a repetir a notificação durante 24 horas.
    console.error("Erro ao reencaminhar o evento de pagamento:", err);
  }
}
