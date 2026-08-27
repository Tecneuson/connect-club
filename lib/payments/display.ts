/* -----------------------------------------------------------------------------
   Identidade do gateway ativo, sem puxar os SDKs.

   Os componentes (server) só precisam de saber o nome para o texto
   "Pagamento seguro processado pela …". Este módulo fica leve de propósito.
----------------------------------------------------------------------------- */

import type { ProviderId } from "./types";

const DISPLAY_NAMES: Record<ProviderId, string> = {
  eupago: "EuPago",
  stripe: "Stripe",
};

export function activeProviderId(): ProviderId {
  return process.env.PAYMENT_PROVIDER?.trim().toLowerCase() === "stripe" ? "stripe" : "eupago";
}

/** Nome do gateway para mostrar ao cliente. */
export function paymentProviderName(): string {
  return DISPLAY_NAMES[activeProviderId()];
}
