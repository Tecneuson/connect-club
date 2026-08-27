import { NextResponse } from "next/server";
import { handlePaymentEvent } from "@/lib/payments/events";
import { normalizeV1, parseV2 } from "@/lib/payments/eupago/webhook";

/**
 * Recebe as notificações de pagamento da EuPago.
 *
 * Configurar no backoffice em Canais → Listagem de canais → editar canal →
 * "Receber notificação para um URL":
 *
 *   https://<dominio>/api/webhooks/eupago
 *
 * Aceita os dois formatos:
 *   · webhooks 1.0 — GET com query string (só notifica pagamentos concluídos);
 *   · webhooks 2.0 — POST com JSON, assinado e opcionalmente encriptado.
 *
 * A EuPago só considera a entrega bem-sucedida com um HTTP 200, e repete
 * durante 24 horas se não o receber. Por isso devolvemos 200 assim que o evento
 * é aceite, mesmo que o reencaminhamento a jusante falhe.
 */

export async function POST(req: Request) {
  const rawBody = await req.text();
  const parsed = parseV2(rawBody, req.headers);

  if (!parsed.ok) {
    console.warn("EuPago webhook rejeitado:", parsed.reason);
    return NextResponse.json({ error: parsed.reason }, { status: parsed.status });
  }

  await handlePaymentEvent(parsed.event);
  return NextResponse.json({ received: true });
}

export async function GET(req: Request) {
  const params = new URL(req.url).searchParams;

  // Sem referência não é uma notificação — provavelmente é alguém a testar o URL.
  if (!params.has("referencia") && !params.has("identificador")) {
    return NextResponse.json({ status: "ok", endpoint: "eupago-webhook" });
  }

  await handlePaymentEvent(normalizeV1(params));
  return NextResponse.json({ received: true });
}
