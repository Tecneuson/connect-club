import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, Check, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/brand";
import { PayForm } from "@/components/checkout/pay-form";
import { billing, checkout, findOffer, offerLabel, offers, pricingHref } from "@/lib/content";

export function generateStaticParams() {
  return offers.map((o) => ({ plano: o.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ plano: string }>;
}): Promise<Metadata> {
  const { plano } = await params;
  const offer = findOffer(plano);
  return { title: offer ? `Inscrição · ${offerLabel(offer)}` : "Inscrição" };
}

export default async function Inscricao({
  params,
}: {
  params: Promise<{ plano: string }>;
}) {
  const { plano } = await params;
  const offer = findOffer(plano);
  if (!offer) notFound();
  // Links da primeira versão do site (pt-1x…) passam para o slug atual.
  if (offer.slug !== plano) redirect(`/inscricao/${offer.slug}`);

  const included = [
    ...offer.features,
    ...(offer.everyMonths > 1 ? [checkout.bimonthly] : []),
    checkout.included[offer.kind],
  ];

  return (
    <main className="min-h-screen bg-sand">
      <div className="container-x flex h-20 items-center justify-between">
        <Logo />
        {/* <a> e não <Link>: carregar a página de novo faz o preçário abrir no pilar certo. */}
        <a
          href={`/${pricingHref(offer.pillar)}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-ink/70 transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" />
          {checkout.back}
        </a>
      </div>

      <div className="container-x grid gap-8 pb-24 pt-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        {/* Resumo */}
        <section className="order-2 lg:order-1">
          <span className="eyebrow">{checkout.summaryTitle}</span>
          <div className="mt-5 card p-7 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-muted">{offer.pillarTitle}</p>
                <h1 className="mt-1 font-display text-2xl">{offerLabel(offer)}</h1>
              </div>
              <span className="flex-none rounded-full bg-gold/25 px-3 py-1 text-xs font-semibold text-ink">
                {billing[offer.kind].title}
              </span>
            </div>

            <div className="mt-6 flex items-end gap-1 border-t border-ink/10 pt-6">
              <span className="font-display text-5xl font-medium">{offer.price}</span>
              {offer.period && <span className="pb-2 text-sm text-muted">{offer.period}</span>}
            </div>

            <ul className="mt-7 space-y-3">
              {included.map((f) => (
                <li key={f} className="flex gap-3 text-[15px]">
                  <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-gold/18 text-gold-600">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  <span className="text-ink/80">{f}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex items-center justify-between border-t border-ink/10 pt-6">
              <span className="text-sm font-medium text-muted">{checkout.totalLabel[offer.kind]}</span>
              <span className="font-display text-xl">
                {offer.price}
                <span className="text-sm text-muted">{offer.period}</span>
              </span>
            </div>
          </div>

          <p className="mt-4 flex items-center gap-2 text-sm text-muted">
            <ShieldCheck className="h-4 w-4 text-gold-600" />
            {checkout.terms[offer.kind]}
          </p>
        </section>

        {/* Pagamento */}
        <section className="order-1 lg:order-2">
          <div className="rounded-3xl bg-ink p-7 text-cream sm:p-9 lg:sticky lg:top-8">
            <h2 className="font-display text-2xl text-cream">{checkout.heading}</h2>
            <p className="mt-2 text-sm text-cream/70">{checkout.intro}</p>

            <div className="mt-6 rounded-2xl bg-cream p-6 text-ink">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm text-muted">{offerLabel(offer)}</span>
                <span className="whitespace-nowrap font-display text-lg">
                  {offer.price}
                  <span className="text-sm text-muted">{offer.period}</span>
                </span>
              </div>
              <PayForm plan={offer.slug} kind={offer.kind} allowCard={offer.everyMonths === 1} />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
