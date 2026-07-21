import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, Check, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/brand";
import { PayForm } from "@/components/checkout/pay-form";
import { plans, checkout } from "@/lib/content";

export function generateStaticParams() {
  return plans.map((p) => ({ plano: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ plano: string }>;
}): Promise<Metadata> {
  const { plano } = await params;
  const plan = plans.find((p) => p.slug === plano);
  return { title: plan ? `Inscrição · ${plan.name}` : "Inscrição" };
}

export default async function Inscricao({
  params,
}: {
  params: Promise<{ plano: string }>;
}) {
  const { plano } = await params;
  const plan = plans.find((p) => p.slug === plano);
  if (!plan) notFound();

  return (
    <main className="min-h-screen bg-sand">
      <div className="container-x flex h-20 items-center justify-between">
        <Logo />
        <Link
          href="/#planos"
          className="inline-flex items-center gap-2 text-sm font-medium text-ink/70 transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" />
          {checkout.back}
        </Link>
      </div>

      <div className="container-x grid gap-8 pb-24 pt-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        {/* Order summary */}
        <section className="order-2 lg:order-1">
          <span className="eyebrow">{checkout.summaryTitle}</span>
          <div className="mt-5 card p-7 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="font-display text-2xl">{plan.name}</h1>
                <p className="mt-1 text-sm text-muted">{plan.blurb}</p>
              </div>
              {plan.highlight && (
                <span className="rounded-full bg-gold px-3 py-1 text-xs font-semibold text-ink">
                  Mais popular
                </span>
              )}
            </div>

            <div className="mt-6 flex items-end gap-1 border-t border-ink/10 pt-6">
              <span className="font-display text-5xl font-medium">{plan.price}</span>
              <span className="pb-2 text-sm text-muted">{plan.period}</span>
            </div>

            <ul className="mt-7 space-y-3">
              {plan.features.map((f) => (
                <li key={f} className="flex gap-3 text-[15px]">
                  <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-gold/18 text-gold-600">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  <span className="text-ink/80">{f}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex items-center justify-between border-t border-ink/10 pt-6">
              <span className="text-sm font-medium text-muted">{checkout.totalLabel}</span>
              <span className="font-display text-xl">
                {plan.price}
                <span className="text-sm text-muted">{plan.period}</span>
              </span>
            </div>
          </div>

          <p className="mt-4 flex items-center gap-2 text-sm text-muted">
            <ShieldCheck className="h-4 w-4 text-gold-600" />
            {checkout.terms}
          </p>
        </section>

        {/* Payment */}
        <section className="order-1 lg:order-2">
          <div className="rounded-3xl bg-ink p-7 text-cream sm:p-9 lg:sticky lg:top-8">
            <h2 className="font-display text-2xl text-cream">{checkout.heading}</h2>
            <p className="mt-2 text-sm text-cream/70">{checkout.intro}</p>

            <div className="mt-6 rounded-2xl bg-cream p-6 text-ink">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted">Plano {plan.name}</span>
                <span className="font-display text-lg">
                  {plan.price}
                  <span className="text-sm text-muted">{plan.period}</span>
                </span>
              </div>
              <PayForm plan={plan.slug} />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
