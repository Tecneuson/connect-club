import Stripe from "stripe";

/**
 * Server-side Stripe client. Returns null when no key is configured so the
 * app can run in "demo mode" locally without real credentials.
 */
export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  return new Stripe(key);
}
