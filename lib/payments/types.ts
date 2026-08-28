/* -----------------------------------------------------------------------------
   Tipos partilhados da camada de pagamentos (EuPago).
----------------------------------------------------------------------------- */

import type { Plan } from "@/lib/content";

/** Pedido de checkout vindo da página de inscrição. */
export type CheckoutRequest = {
  plan: Plan;
  /** Email do cliente — usado para o recibo e para as notificações de cobrança. */
  email?: string;
  /** Origem do site (https://...), para montar os URLs de retorno. */
  origin: string;
};

/**
 * Resultado do checkout.
 * `demo` distingue "não há chaves configuradas" de um erro real, porque a
 * primeira situação mostra uma mensagem simpática em vez de um erro.
 */
export type CheckoutResult =
  | { ok: true; url: string; reference?: string }
  | { ok: false; demo: boolean; reason: string };

/** Estado normalizado de um pagamento. */
export type PaymentStatus = "paid" | "pending" | "failed" | "refunded" | "canceled" | "expired";

/** Notificação de pagamento já normalizada, venha ela do webhook 1.0 ou 2.0. */
export type PaymentEvent = {
  status: PaymentStatus;
  /** Identificador que nós enviámos ao criar a transação (contém o plano). */
  identifier?: string;
  /** ID da transação no lado da EuPago. */
  transactionId?: string;
  reference?: string;
  amount?: number;
  currency?: string;
  method?: string;
  /** Slug do plano, extraído do identifier quando possível. */
  plan?: string;
  occurredAt?: string;
  raw: unknown;
};
