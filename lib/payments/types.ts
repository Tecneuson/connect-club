/* -----------------------------------------------------------------------------
   Camada de pagamentos — contrato comum aos gateways.

   O site suporta mais do que um gateway de subscrição (EuPago e Stripe). Cada um
   implementa `PaymentProvider`, e o resto da aplicação só conhece este contrato.
   Trocar de gateway é mudar a variável de ambiente `PAYMENT_PROVIDER`.
----------------------------------------------------------------------------- */

import type { Plan } from "@/lib/content";

export type ProviderId = "eupago" | "stripe";

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
  | { ok: true; url: string; provider: ProviderId; reference?: string }
  | { ok: false; demo: boolean; reason: string };

export interface PaymentProvider {
  readonly id: ProviderId;
  /** Nome apresentado ao cliente ("EuPago", "Stripe"). */
  readonly displayName: string;
  /** true quando há credenciais suficientes para cobrar a sério. */
  isConfigured(): boolean;
  /** Cria a subscrição mensal e devolve o URL do formulário seguro. */
  createSubscriptionCheckout(req: CheckoutRequest): Promise<CheckoutResult>;
}

/** Estado normalizado de um pagamento, comum aos dois gateways. */
export type PaymentStatus = "paid" | "pending" | "failed" | "refunded" | "canceled" | "expired";

/** Evento de pagamento já normalizado, seja de webhook EuPago ou Stripe. */
export type PaymentEvent = {
  provider: ProviderId;
  status: PaymentStatus;
  /** Identificador que nós enviámos ao criar a transação (contém o plano). */
  identifier?: string;
  /** Referência/ID da transação no lado do gateway. */
  transactionId?: string;
  reference?: string;
  amount?: number;
  currency?: string;
  method?: string;
  email?: string;
  /** Slug do plano, extraído do identifier quando possível. */
  plan?: string;
  occurredAt?: string;
  raw: unknown;
};
