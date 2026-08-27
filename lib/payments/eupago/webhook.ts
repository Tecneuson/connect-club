/* -----------------------------------------------------------------------------
   Webhooks da EuPago — verificação, desencriptação e normalização.

   A EuPago tem dois formatos e o backoffice pode estar configurado em qualquer
   um deles, por isso aceitamos os dois:

   · 1.0 — GET com os dados em query string (`valor`, `referencia`, `mp`, ...).
           Só notifica pagamentos concluídos.
   · 2.0 — POST com JSON. Suporta PAID/REFUNDED/ERROR/CANCELED/EXPIRED e pode vir
           encriptado (AES-256-CBC) e assinado (HMAC SHA-256).

   Docs: https://eupago.readme.io/reference/realtime-webhooks-20
----------------------------------------------------------------------------- */

import "server-only";

import crypto from "node:crypto";
import type { PaymentEvent, PaymentStatus } from "@/lib/payments/types";
import { planFromIdentifier } from "./provider";

export const SIGNATURE_HEADER = "x-signature";
export const IV_HEADER = "x-initialization-vector";

function webhookSecret(): string | null {
  return process.env.EUPAGO_WEBHOOK_SECRET?.trim() || null;
}

/**
 * O PHP da EuPago passa a chave em bruto ao OpenSSL, que a enche com NUL até
 * 32 bytes (ou trunca, se for maior). Reproduzimos esse comportamento para que
 * a desencriptação bata certo com o exemplo deles.
 */
function normalizeKey(secret: string): Buffer {
  const key = Buffer.alloc(32);
  Buffer.from(secret, "utf8").copy(key, 0, 0, 32);
  return key;
}

function timingSafeEqual(a: Buffer, b: Buffer): boolean {
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

/**
 * Confirma o `X-Signature` (HMAC SHA-256 em base64).
 *
 * A documentação não é explícita sobre o que é assinado, por isso testamos os
 * dois candidatos plausíveis: o corpo em bruto e, quando o payload vem
 * encriptado, o conteúdo do campo `data`.
 */
export function verifySignature(rawBody: string, signature: string | null): boolean {
  const secret = webhookSecret();
  if (!secret || !signature) return false;

  let expected: Buffer;
  try {
    expected = Buffer.from(signature, "base64");
  } catch {
    return false;
  }

  const candidates = [rawBody];
  try {
    const parsed = JSON.parse(rawBody) as { data?: unknown };
    if (typeof parsed?.data === "string") candidates.push(parsed.data);
  } catch {
    /* corpo não-JSON: fica só o corpo em bruto */
  }

  return candidates.some((candidate) =>
    timingSafeEqual(crypto.createHmac("sha256", secret).update(candidate).digest(), expected),
  );
}

/** Desencripta o campo `data` (AES-256-CBC) usando o IV vindo no header. */
export function decryptPayload(data: string, ivBase64: string): string {
  const secret = webhookSecret();
  if (!secret) throw new Error("EUPAGO_WEBHOOK_SECRET não está configurada.");

  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    normalizeKey(secret),
    Buffer.from(ivBase64, "base64"),
  );
  return Buffer.concat([
    decipher.update(Buffer.from(data, "base64")),
    decipher.final(),
  ]).toString("utf8");
}

/* -------------------------------------------------------------------------- */

const STATUS_MAP: Record<string, PaymentStatus> = {
  paid: "paid",
  refund: "refunded",
  refunded: "refunded",
  error: "failed",
  cancel: "canceled",
  canceled: "canceled",
  cancelled: "canceled",
  expired: "expired",
  pending: "pending",
};

function toStatus(value: unknown): PaymentStatus {
  const key = String(value ?? "").toLowerCase();
  return STATUS_MAP[key] ?? "pending";
}

/** Códigos de método de pagamento do webhook 1.0 (`mp=PC:PT`). */
const METHOD_MAP: Record<string, string> = {
  PC: "Multibanco",
  PS: "Payshop",
  MW: "MB WAY",
  CC: "CreditCard",
  PF: "Paysafecard",
  DD: "DirectDebit",
  CP: "CofidisPay",
  GP: "GooglePay",
  PA: "ApplePay",
  PX: "Pix",
  FP: "Floa",
};

type WebhookV2 = {
  transactions?: {
    entity?: number | string;
    reference?: number | string;
    identifier?: string;
    method?: string;
    amount?: { value?: number | string; currency?: string };
    date?: string;
    trid?: number | string;
    status?: string;
  };
  channel?: { name?: string };
  data?: string;
};

/** Normaliza o JSON do webhook 2.0 (já desencriptado, se for o caso). */
export function normalizeV2(payload: WebhookV2): PaymentEvent {
  const tx = payload.transactions ?? {};
  const amount = Number(tx.amount?.value);

  return {
    provider: "eupago",
    status: toStatus(tx.status),
    identifier: tx.identifier,
    transactionId: tx.trid === undefined ? undefined : String(tx.trid),
    reference: tx.reference === undefined ? undefined : String(tx.reference),
    amount: Number.isFinite(amount) ? amount : undefined,
    currency: tx.amount?.currency ?? "EUR",
    method: tx.method,
    plan: planFromIdentifier(tx.identifier),
    occurredAt: tx.date,
    raw: payload,
  };
}

/** Normaliza o webhook 1.0, que chega em query string e é sempre "pago". */
export function normalizeV1(params: URLSearchParams): PaymentEvent {
  const identifier = params.get("identificador") ?? undefined;
  const amount = Number(params.get("valor"));
  const methodCode = params.get("mp")?.split(":")[0] ?? "";

  return {
    provider: "eupago",
    status: "paid",
    identifier,
    transactionId: params.get("transacao") ?? undefined,
    reference: params.get("referencia") ?? undefined,
    amount: Number.isFinite(amount) ? amount : undefined,
    currency: "EUR",
    method: METHOD_MAP[methodCode] ?? (methodCode || undefined),
    plan: planFromIdentifier(identifier),
    occurredAt: params.get("data") ?? undefined,
    raw: Object.fromEntries(params),
  };
}

export type ParseResult =
  | { ok: true; event: PaymentEvent }
  | { ok: false; status: number; reason: string };

/**
 * Lê um webhook 2.0: valida a assinatura (quando há segredo configurado),
 * desencripta se vier encriptado e devolve o evento normalizado.
 */
export function parseV2(rawBody: string, headers: Headers): ParseResult {
  const secret = webhookSecret();
  const signature = headers.get(SIGNATURE_HEADER);

  if (secret && !verifySignature(rawBody, signature)) {
    return { ok: false, status: 401, reason: "Assinatura inválida." };
  }
  if (!secret) {
    // Sem segredo não há como provar a origem. Deixamos passar para não perder
    // notificações em desenvolvimento, mas fica registado.
    console.warn(
      "EuPago webhook recebido sem EUPAGO_WEBHOOK_SECRET configurado: assinatura não verificada.",
    );
  }

  let payload: WebhookV2;
  try {
    payload = JSON.parse(rawBody) as WebhookV2;
  } catch {
    return { ok: false, status: 400, reason: "Corpo não é JSON válido." };
  }

  if (typeof payload.data === "string" && !payload.transactions) {
    const iv = headers.get(IV_HEADER);
    if (!iv) return { ok: false, status: 400, reason: "Payload encriptado sem X-Initialization-Vector." };
    try {
      payload = JSON.parse(decryptPayload(payload.data, iv)) as WebhookV2;
    } catch (err) {
      console.error("EuPago webhook: falha a desencriptar", err);
      return { ok: false, status: 400, reason: "Não foi possível desencriptar o payload." };
    }
  }

  return { ok: true, event: normalizeV2(payload) };
}
