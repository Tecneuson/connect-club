import { NextResponse } from "next/server";
import { createSubscriptionCheckout } from "@/lib/payments/eupago/checkout";
import { plans } from "@/lib/content";

/**
 * Cria a subscrição mensal na EuPago e devolve o URL do formulário seguro para
 * onde o cliente é redirecionado.
 */
export async function POST(req: Request) {
  let planSlug = "pt-2x";
  let email: string | undefined;
  try {
    const body = await req.json();
    if (typeof body?.plan === "string") planSlug = body.plan;
    if (typeof body?.email === "string" && body.email.includes("@")) email = body.email.trim();
  } catch {
    /* mantém o plano predefinido */
  }

  const plan = plans.find((p) => p.slug === planSlug);
  if (!plan) {
    return NextResponse.json({ error: "Plano inválido." }, { status: 400 });
  }

  const origin =
    process.env.NEXT_PUBLIC_SITE_URL ??
    req.headers.get("origin") ??
    "http://localhost:3000";

  const result = await createSubscriptionCheckout({
    plan,
    email,
    origin: origin.replace(/\/$/, ""),
  });

  if (result.ok) {
    return NextResponse.json({ url: result.url });
  }

  // Sem chaves configuradas devolvemos 200: não é um erro, é o modo demonstração.
  return NextResponse.json(
    result.demo ? { demo: true, error: result.reason } : { error: result.reason },
    { status: result.demo ? 200 : 500 },
  );
}
