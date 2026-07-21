import { Check, ShieldCheck, Sparkles } from "lucide-react";
import { plans } from "@/lib/content";
import { ButtonLink } from "@/components/ui/button";

export function Pricing() {
  return (
    <section id="planos" className="section bg-sand">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">Planos</span>
          <h2 className="mt-4 text-[clamp(2rem,4.2vw,2.9rem)]">
            Escolhe o ritmo. O acompanhamento está sempre incluído.
          </h2>
          <p className="mt-4 text-muted">
            Sem taxa de inscrição e sem fidelização. Cancela quando quiseres. Inscrição 100% online e
            segura.
          </p>
        </div>

        <div className="mt-14 grid items-start gap-6 lg:grid-cols-3">
          {plans.map((plan) => {
            const featured = plan.highlight;
            return (
              <div
                key={plan.slug}
                className={
                  featured
                    ? "relative rounded-3xl bg-ink p-8 text-cream shadow-[0_30px_60px_-30px_rgba(25,25,25,0.6)] lg:-mt-4 lg:pb-10"
                    : "relative rounded-3xl border border-ink/10 bg-white p-8"
                }
              >
                {featured && (
                  <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-gold px-4 py-1.5 text-xs font-semibold text-ink">
                    <Sparkles className="h-3.5 w-3.5" />
                    Mais popular
                  </span>
                )}

                <h3 className={`font-display text-xl ${featured ? "text-cream" : "text-ink"}`}>
                  {plan.name}
                </h3>
                <p className={`mt-1 text-sm ${featured ? "text-cream/70" : "text-muted"}`}>
                  {plan.blurb}
                </p>

                <div className="mt-6 flex items-end gap-1">
                  <span className="font-display text-5xl font-medium">{plan.price}</span>
                  <span className={`pb-2 text-sm ${featured ? "text-cream/60" : "text-muted"}`}>
                    {plan.period}
                  </span>
                </div>

                <div className="mt-7">
                  <ButtonLink
                    href={`/inscricao/${plan.slug}`}
                    variant={featured ? "gold" : "dark"}
                    block
                  >
                    {plan.cta}
                  </ButtonLink>
                </div>

                <ul className="mt-8 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-3 text-[15px]">
                      <span
                        className={`mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full ${
                          featured ? "bg-gold text-ink" : "bg-gold/18 text-gold-600"
                        }`}
                      >
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      <span className={featured ? "text-cream/85" : "text-ink/80"}>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <p className="mt-8 flex items-center justify-center gap-2 text-sm text-muted">
          <ShieldCheck className="h-4 w-4 text-gold-600" />
          Pagamento seguro processado pela Stripe · cancela quando quiseres
        </p>
      </div>
    </section>
  );
}
