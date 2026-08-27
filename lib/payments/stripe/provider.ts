/* -----------------------------------------------------------------------------
   Stripe como gateway de subscrição — alternativa ao EuPago.

   Fica ativo com PAYMENT_PROVIDER=stripe. Precisa de STRIPE_SECRET_KEY e de um
   Price recorrente por plano (STRIPE_PRICE_PT_1X / _2X / _3X).
----------------------------------------------------------------------------- */

import "server-only";

import Stripe from "stripe";
import type { CheckoutRequest, CheckoutResult, PaymentProvider } from "@/lib/payments/types";

function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key) return null;
  return new Stripe(key);
}

export const stripeProvider: PaymentProvider = {
  id: "stripe",
  displayName: "Stripe",

  isConfigured() {
    return Boolean(process.env.STRIPE_SECRET_KEY?.trim());
  },

  async createSubscriptionCheckout({ plan, email, origin }: CheckoutRequest): Promise<CheckoutResult> {
    const stripe = getStripe();
    const priceId = process.env[plan.stripePriceEnv];

    if (!stripe || !priceId) {
      return {
        ok: false,
        demo: true,
        reason:
          "Pagamentos ainda não ativos: falta configurar as chaves da Stripe (ver .env.local.example).",
      };
    }

    try {
      const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        line_items: [{ price: priceId, quantity: 1 }],
        allow_promotion_codes: true,
        billing_address_collection: "auto",
        locale: "pt",
        ...(email ? { customer_email: email } : {}),
        metadata: { plan: plan.slug },
        subscription_data: { metadata: { plan: plan.slug } },
        success_url: `${origin}/sucesso?session_id={CHECKOUT_SESSION_ID}&plano=${plan.slug}`,
        cancel_url: `${origin}/cancelado?plano=${plan.slug}`,
      });

      if (!session.url) {
        return { ok: false, demo: false, reason: "A Stripe não devolveu o URL de checkout." };
      }
      return { ok: true, url: session.url, provider: "stripe", reference: session.id };
    } catch (err) {
      console.error("Stripe checkout error:", err);
      return { ok: false, demo: false, reason: "Não foi possível iniciar o pagamento." };
    }
  },
};
