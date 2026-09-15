/* -----------------------------------------------------------------------------
   Tipos partilhados da camada de pagamentos (EuPago).
----------------------------------------------------------------------------- */

import type { Offer } from "@/lib/content";

/** Pedido de checkout vindo da página de inscrição. */
export type CheckoutRequest = {
  offer: Offer;
  /** Email do cliente — usado para o recibo e para as notificações de cobrança. */
  email?: string;
  /** Origem do site (https://...), para montar os URLs de retorno. */
  origin: string;
};

/** Mensalidade por débito direto: precisa dos dados da conta a debitar. */
export type DirectDebitRequest = CheckoutRequest & {
  email: string;
  debtor: { name: string; iban: string; bic: string };
};

/**
 * Resultado do checkout.
 * `demo` distingue "não há chaves configuradas" de um erro real, porque a
 * primeira situação mostra uma mensagem simpática em vez de um erro.
 */
export type CheckoutResult =
  | { ok: true; url: string; reference?: string; identifier?: string }
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
  /** Só nas adesões por débito direto, que não passam por formulário da EuPago. */
  customer?: { name?: string; email?: string };
  occurredAt?: string;
  raw: unknown;
};
