/* -----------------------------------------------------------------------------
   Seleção do gateway de pagamento.

   `PAYMENT_PROVIDER` decide quem cobra: "eupago" (predefinido) ou "stripe".
   Todo o resto da aplicação passa por aqui e nunca importa um gateway direto.
----------------------------------------------------------------------------- */

import "server-only";

import type { PaymentProvider, ProviderId } from "./types";
import { activeProviderId } from "./display";
import { eupagoProvider } from "./eupago/provider";
import { stripeProvider } from "./stripe/provider";

const providers: Record<ProviderId, PaymentProvider> = {
  eupago: eupagoProvider,
  stripe: stripeProvider,
};

export function getPaymentProvider(): PaymentProvider {
  return providers[activeProviderId()];
}

export { activeProviderId, paymentProviderName } from "./display";
export type { PaymentProvider, PaymentEvent, ProviderId, CheckoutResult } from "./types";
