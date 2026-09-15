"use client";

import { useSyncExternalStore, type KeyboardEvent } from "react";
import Link from "next/link";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import {
  billing,
  offers,
  plansNote,
  pricing,
  pricingHref,
  pricingSection,
  signupSteps,
  type BillingKind,
  type PillarSlug,
  type Service,
} from "@/lib/content";

/* -----------------------------------------------------------------------------
   Preçário por pilar.

   Mostra um pilar de cada vez. O pilar aberto vive no hash do URL
   (`#planos-massagem`), por isso clicar num cartão de pilar — um link normal
   para essa âncora — faz scroll até aqui e abre logo o separador certo.
----------------------------------------------------------------------------- */

const HASH_PREFIX = "#planos-";

function subscribeHash(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}

function pillarFromHash(hash: string): PillarSlug {
  const slug = hash.startsWith(HASH_PREFIX) ? hash.slice(HASH_PREFIX.length) : "";
  return pricing.find((p) => p.slug === slug)?.slug ?? pricing[0].slug;
}

/** Troca de separador sem saltar a página: substitui o hash e avisa quem ouve. */
function openPillar(slug: PillarSlug) {
  window.history.replaceState(window.history.state, "", pricingHref(slug));
  window.dispatchEvent(new HashChangeEvent("hashchange"));
}

export function Pricing() {
  const hash = useSyncExternalStore(subscribeHash, () => window.location.hash, () => "");
  const active = pillarFromHash(hash);
  const pillar = pricing.find((p) => p.slug === active) ?? pricing[0];

  function onTabKey(e: KeyboardEvent<HTMLButtonElement>) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const i = pricing.findIndex((p) => p.slug === active);
    const next = pricing[(i + (e.key === "ArrowRight" ? 1 : -1) + pricing.length) % pricing.length];
    openPillar(next.slug);
    document.getElementById(`tab-${next.slug}`)?.focus();
  }

  return (
    <section id="planos" className="section relative bg-sand">
      {/* Uma âncora por pilar, todas no topo da secção, para o scroll bater sempre no mesmo sítio. */}
      {pricing.map((p) => (
        <span key={p.slug} id={`planos-${p.slug}`} aria-hidden className="absolute inset-x-0 top-0" />
      ))}

      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">{pricingSection.eyebrow}</span>
          <h2 className="mt-4 text-[clamp(2rem,4.2vw,2.9rem)]">{pricingSection.title}</h2>
          <p className="mt-4 text-muted">{pricingSection.subtitle}</p>
        </div>

        <div
          role="tablist"
          aria-label="Pilares"
          className="-mx-6 mt-10 flex gap-2 overflow-x-auto px-6 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0"
        >
          {pricing.map((p) => {
            const selected = p.slug === active;
            return (
              <button
                key={p.slug}
                id={`tab-${p.slug}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="painel-preco"
                tabIndex={selected ? 0 : -1}
                onClick={() => openPillar(p.slug)}
                onKeyDown={onTabKey}
                className={`flex-none rounded-full border px-4 py-2.5 text-sm font-medium transition-colors ${
                  selected
                    ? "border-ink bg-ink text-cream"
                    : "border-ink/15 bg-white text-ink/75 hover:border-ink/40 hover:text-ink"
                }`}
              >
                {p.title}
              </button>
            );
          })}
        </div>

        <div
          id="painel-preco"
          role="tabpanel"
          aria-labelledby={`tab-${pillar.slug}`}
          className="mx-auto mt-8 grid max-w-5xl gap-5 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,2fr)]"
        >
          <div className="rounded-3xl bg-ink p-7 text-cream lg:self-start">
            <h3 className="text-2xl text-cream">{pillar.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-cream/75">{pillar.description}</p>
            <dl className="mt-6 space-y-3 border-t border-cream/10 pt-5 text-sm">
              {(Object.keys(billing) as BillingKind[]).map((kind) => (
                <div key={kind}>
                  <dt className="font-medium text-gold-300">{billing[kind].title}</dt>
                  <dd className="text-cream/65">{billing[kind].hint}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="space-y-5">
            {pillar.services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>

        <ol className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-3">
          {signupSteps.map((step) => (
            <li key={step.n} className="flex items-start gap-3">
              <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-gold font-display text-xs font-semibold text-ink">
                {step.n}
              </span>
              <div>
                <p className="font-display text-sm font-medium">{step.title}</p>
                <p className="mt-0.5 text-[13px] text-muted">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>

        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted">{plansNote}</p>
        <p className="mt-3 flex items-center justify-center gap-2 text-sm text-muted">
          <ShieldCheck className="h-4 w-4 text-gold-600" />
          Pagamento seguro processado pela EuPago
        </p>
      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: Service }) {
  const mine = offers.filter((o) => o.slug.startsWith(`${service.slug}-`));

  return (
    <article className="rounded-3xl border border-ink/10 bg-white p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h4 className="font-display text-lg">{service.name}</h4>
        <p className="text-sm text-muted">{service.blurb}</p>
      </div>

      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
        {service.features.map((f) => (
          <li key={f} className="flex items-center gap-1.5 text-[13px] text-ink/75">
            <Check className="h-3.5 w-3.5 text-gold-600" strokeWidth={3} />
            {f}
          </li>
        ))}
      </ul>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        {(["mensal", "pack"] as const).map((kind) => {
          const options = mine.filter((o) => o.kind === kind);
          if (options.length === 0) return null;
          return (
            <div key={kind}>
              <p className="text-xs font-medium uppercase tracking-wide text-gold-600">
                {billing[kind].title}
              </p>
              <ul className="mt-2 divide-y divide-ink/8 border-y border-ink/8">
                {options.map((offer) => (
                  <li key={offer.slug}>
                    <Link
                      href={`/inscricao/${offer.slug}`}
                      aria-label={`${billing[kind].cta}: ${service.name}, ${offer.name}, ${offer.price}${
                        offer.period ? ` ${offer.period}` : ""
                      }`}
                      className="group flex items-center justify-between gap-3 py-2.5"
                    >
                      <span className="text-[14px] text-ink/85">{offer.name}</span>
                      <span className="flex items-center gap-2">
                        <span className="whitespace-nowrap font-display text-[15px] font-medium tabular-nums">
                          {offer.price}
                          {offer.period && (
                            <span className="text-xs font-normal text-muted">{offer.period}</span>
                          )}
                        </span>
                        <span className="inline-flex h-7 items-center gap-1 rounded-full bg-sand-100 px-2.5 text-xs font-medium text-ink transition-colors group-hover:bg-ink group-hover:text-cream">
                          {billing[kind].cta}
                          <ArrowRight className="h-3 w-3" />
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </article>
  );
}
