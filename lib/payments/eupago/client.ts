/* -----------------------------------------------------------------------------
   Cliente REST da EuPago (server-only).

   Docs: https://eupago.readme.io/reference/api-eupago

   A EuPago tem dois esquemas de autenticação e é preciso usar o certo em cada
   endpoint:
     · ApiKey  — `Authorization: ApiKey xxxx-xxxx-...` (criar subscrições, cobrar)
     · OAuth   — `Authorization: Bearer <token>`       (gestão, ex.: revogar)

   Ambientes:
     · sandbox    → https://sandbox.eupago.pt/api/
     · produção   → https://clientes.eupago.pt/api/
----------------------------------------------------------------------------- */

import "server-only";

const SANDBOX_BASE = "https://sandbox.eupago.pt/api";
const PRODUCTION_BASE = "https://clientes.eupago.pt/api";

export type EupagoEnv = "sandbox" | "production";

export function eupagoEnv(): EupagoEnv {
  return process.env.EUPAGO_ENV === "production" ? "production" : "sandbox";
}

export function eupagoBaseUrl(): string {
  return eupagoEnv() === "production" ? PRODUCTION_BASE : SANDBOX_BASE;
}

export function eupagoApiKey(): string | null {
  return process.env.EUPAGO_API_KEY?.trim() || null;
}

/** Erro devolvido pela EuPago, já com o corpo da resposta anexado. */
export class EupagoError extends Error {
  readonly status: number;
  readonly body: unknown;

  constructor(message: string, status: number, body: unknown) {
    super(message);
    this.name = "EupagoError";
    this.status = status;
    this.body = body;
  }
}

type RequestOptions = {
  path: string;
  body?: unknown;
  /** ApiKey é o predefinido; os endpoints de /management pedem OAuth. */
  auth?: "apikey" | "oauth";
  method?: "GET" | "POST";
};

async function request<T>({ path, body, auth = "apikey", method = "POST" }: RequestOptions): Promise<T> {
  const authorization =
    auth === "oauth" ? `Bearer ${await getBearerToken()}` : `ApiKey ${requireApiKey()}`;

  const res = await fetch(`${eupagoBaseUrl()}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: authorization,
    },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
    cache: "no-store",
  });

  const text = await res.text();
  let parsed: unknown = null;
  try {
    parsed = text ? JSON.parse(text) : null;
  } catch {
    parsed = text;
  }

  if (!res.ok) {
    throw new EupagoError(`EuPago respondeu ${res.status} em ${path}`, res.status, parsed);
  }

  // A EuPago devolve 200 mesmo em falhas de negócio; o veredicto está no corpo.
  const status = (parsed as { transactionStatus?: string } | null)?.transactionStatus;
  if (status && status.toLowerCase() !== "success") {
    const detail =
      (parsed as { message?: string } | null)?.message ??
      (parsed as { text?: string } | null)?.text ??
      status;
    throw new EupagoError(`EuPago recusou o pedido em ${path}: ${detail}`, res.status, parsed);
  }

  return parsed as T;
}

function requireApiKey(): string {
  const key = eupagoApiKey();
  if (!key) {
    throw new EupagoError("EUPAGO_API_KEY não está configurada.", 0, null);
  }
  return key;
}

/* --------------------------------------------------------------------------
   OAuth — só necessário nos endpoints de gestão (revogar subscrição).
   O token traz uma data de expiração, por isso guardamos em memória e
   renovamos com um minuto de folga.
-------------------------------------------------------------------------- */

type TokenResponse = {
  transactionStatus?: string;
  access_token: string;
  token_type: string;
  /** A EuPago devolve aqui uma data ("2022-01-10 10:47:41"), não segundos. */
  expires_in: string;
};

let cachedToken: { value: string; expiresAtMs: number } | null = null;

export async function getBearerToken(): Promise<string> {
  const clientId = process.env.EUPAGO_CLIENT_ID?.trim();
  const clientSecret = process.env.EUPAGO_CLIENT_SECRET?.trim();
  if (!clientId || !clientSecret) {
    throw new EupagoError(
      "EUPAGO_CLIENT_ID / EUPAGO_CLIENT_SECRET são precisos para os endpoints de gestão.",
      0,
      null,
    );
  }

  if (cachedToken && cachedToken.expiresAtMs > Date.now() + 60_000) {
    return cachedToken.value;
  }

  const res = await fetch(`${eupagoBaseUrl()}/auth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "client_credentials",
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new EupagoError("Não foi possível obter o token da EuPago.", res.status, await res.text());
  }

  const data = (await res.json()) as TokenResponse;
  if (!data?.access_token) {
    throw new EupagoError("Resposta de token da EuPago sem access_token.", res.status, data);
  }

  // "YYYY-MM-DD hh:mm:ss" em UTC; se não der para ler, assumimos 30 minutos.
  const parsedExpiry = Date.parse(String(data.expires_in).replace(" ", "T") + "Z");
  cachedToken = {
    value: data.access_token,
    expiresAtMs: Number.isNaN(parsedExpiry) ? Date.now() + 30 * 60_000 : parsedExpiry,
  };
  return cachedToken.value;
}

/** Só para testes: limpa o token em cache. */
export function resetTokenCache() {
  cachedToken = null;
}

/* --------------------------------------------------------------------------
   Subscrições com cartão de crédito (recorrência automática, com 3D Secure)
-------------------------------------------------------------------------- */

export type Periodicity = "Semanal" | "Quinzenal" | "Mensal" | "Trimestral" | "Semestral" | "Anual";

export type CreateSubscriptionInput = {
  /** A nossa referência interna. Volta nos webhooks como `identifier`. */
  identifier: string;
  amount: number;
  currency?: string;
  /** Data do primeiro débito, YYYY-MM-DD. */
  startDate: string;
  periodicity: Periodicity;
  /** Dia do mês em que a cobrança corre (obrigatório com autoProcess). */
  collectionDay: number;
  /** Último débito desta autorização, YYYY-MM-DD. */
  limitDate: string;
  /** "1" = a EuPago cobra sozinha; "0" = cada débito é pedido por nós. */
  autoProcess?: "0" | "1";
  customerEmail?: string;
  notifyCustomer?: boolean;
  successUrl: string;
  failUrl: string;
  backUrl: string;
};

export type CreateSubscriptionResponse = {
  transactionStatus: string;
  statusSubs: string;
  subscriptionID: string;
  referenceSubs: string;
  /** Formulário seguro para onde o cliente é redirecionado. */
  redirectUrl: string;
};

/**
 * POST /v1.02/creditcard/subscription
 * Cria a autorização de subscrição e devolve o URL do formulário seguro.
 */
export function createCreditCardSubscription(
  input: CreateSubscriptionInput,
): Promise<CreateSubscriptionResponse> {
  const customer = input.customerEmail
    ? { notify: input.notifyCustomer ?? true, email: input.customerEmail }
    : undefined;

  return request<CreateSubscriptionResponse>({
    path: "/v1.02/creditcard/subscription",
    body: {
      payment: {
        identifier: input.identifier,
        amount: {
          value: Number(input.amount.toFixed(2)),
          currency: input.currency ?? "EUR",
        },
        subscription: {
          date: input.startDate,
          autoProcess: input.autoProcess ?? "1",
          collectionDay: input.collectionDay,
          periodicity: input.periodicity,
          limitDate: input.limitDate,
          ...(customer ? { customer } : {}),
        },
        successUrl: input.successUrl,
        failUrl: input.failUrl,
        backUrl: input.backUrl,
      },
      ...(customer ? { customer } : {}),
    },
  });
}

export type SubscriptionPaymentResponse = {
  transactionStatus: string;
  status: string;
  transactionID: string;
  reference: string;
  message: string;
};

/**
 * POST /v1.02/creditcard/payment/{recurrentID}
 * Débito MIT avulso sobre uma autorização já existente. Só é preciso quando a
 * subscrição foi criada com `autoProcess: "0"`.
 */
export function chargeSubscription(
  recurrentId: string | number,
  input: {
    identifier: string;
    amount: number;
    currency?: string;
    successUrl: string;
    failUrl: string;
    backUrl: string;
    lang?: string;
    customerEmail?: string;
  },
): Promise<SubscriptionPaymentResponse> {
  return request<SubscriptionPaymentResponse>({
    path: `/v1.02/creditcard/payment/${encodeURIComponent(String(recurrentId))}`,
    body: {
      payment: {
        identifier: input.identifier,
        amount: {
          value: Number(input.amount.toFixed(2)),
          currency: input.currency ?? "EUR",
        },
        successUrl: input.successUrl,
        failUrl: input.failUrl,
        backUrl: input.backUrl,
        lang: input.lang ?? "PT",
      },
      ...(input.customerEmail ? { customer: { notify: true, email: input.customerEmail } } : {}),
    },
  });
}

/**
 * POST /management/v1.02/subscriptions/revoke/{transactionID}
 * Cancela a recorrência. Este endpoint usa OAuth, não ApiKey.
 */
export function revokeSubscription(transactionId: string | number) {
  return request<SubscriptionPaymentResponse>({
    path: `/management/v1.02/subscriptions/revoke/${encodeURIComponent(String(transactionId))}`,
    auth: "oauth",
  });
}

/* --------------------------------------------------------------------------
   Débito Direto SEPA — alternativa de comissão mais baixa ao cartão.
   Fica disponível para quando o clube quiser oferecer pagamento por IBAN.
-------------------------------------------------------------------------- */

export type DirectDebitInput = {
  identifier: string;
  debtor: {
    name: string;
    email: string;
    iban: string;
    bic: string;
    address?: { street?: string; zipCode?: string; locality?: string; country?: string };
    collectionNotify?: boolean;
  };
  amount: number;
  /** Data do primeiro débito, YYYY-MM-DD. */
  startDate: string;
  collectionDay: number;
  limitDate: string;
  periodicity?: Periodicity;
  autoProcess?: "0" | "1";
  /** FRST = primeiro débito de uma série; RCUR = recorrente. */
  type?: "FRST" | "RCUR" | "OOFF";
  adminCallback?: string;
};

/** POST /v1.02/directdebit/authorization */
export function createDirectDebitAuthorization(input: DirectDebitInput): Promise<unknown> {
  return request({
    path: "/v1.02/directdebit/authorization",
    body: {
      identifier: input.identifier,
      ...(input.adminCallback ? { adminCallback: input.adminCallback } : {}),
      debtor: {
        name: input.debtor.name,
        email: input.debtor.email,
        iban: input.debtor.iban,
        bic: input.debtor.bic,
        collectionNotify: input.debtor.collectionNotify ?? true,
        ...(input.debtor.address ? { address: input.debtor.address } : {}),
      },
      payment: {
        date: input.startDate,
        amount: Number(input.amount.toFixed(2)),
        autoProcess: input.autoProcess ?? "1",
        collectionDay: input.collectionDay,
        limitDate: input.limitDate,
        type: input.type ?? "RCUR",
        ...(input.periodicity ? { periodicity: input.periodicity } : {}),
      },
    },
  });
}
