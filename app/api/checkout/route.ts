import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { plans } from "@/lib/content";

export async function POST(req: Request) {
  let plan = "pt-2x";
  let email: string | undefined;
  try {
    const body = await req.json();
    if (typeof body?.plan === "string") plan = body.plan;
    if (typeof body?.email === "string" && body.email.includes("@")) email = body.email;
  } catch {
    /* keep default plan */
  }

  const selected = plans.find((p) => p.slug === plan);
  if (!selected) {
    return NextResponse.json({ error: "Plano inválido." }, { status: 400 });
  }

  const stripe = getStripe();
  const priceId = process.env[selected.envKey];

  // Modo demonstração — sem chaves configuradas. Informa o cliente.
  if (!stripe || !priceId) {
    return NextResponse.json(
      {
        demo: true,
        error:
          "Pagamentos ainda não ativos. Configura as chaves da Stripe em .env.local (ver .env.local.example).",
      },
      { status: 200 },
    );
  }

  const origin =
    req.headers.get("origin") ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    "http://localhost:3000";

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      allow_promotion_codes: true,
      billing_address_collection: "auto",
      locale: "pt",
      ...(email ? { customer_email: email } : {}),
      metadata: { plan: selected.slug },
      subscription_data: { metadata: { plan: selected.slug } },
      success_url: `${origin}/sucesso?session_id={CHECKOUT_SESSION_ID}&plano=${selected.slug}`,
      cancel_url: `${origin}/cancelado?plano=${selected.slug}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json(
      { error: "Não foi possível iniciar o checkout. Tente novamente." },
      { status: 500 },
    );
  }
}
