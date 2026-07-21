import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { hero, bookingHref } from "@/lib/content";
import { ButtonLink } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-cream">
      {/* Background image */}
      <Image
        src="/images/hero.jpg"
        alt="Personal trainer conduzindo o treino de um aluno em um estúdio premium com equipamentos pretos e detalhes dourados"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      {/* Overlays for legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink/92 via-ink/70 to-ink/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-ink/40" />

      <div className="container-x relative flex min-h-[92vh] flex-col justify-center pb-16 pt-36 md:min-h-screen md:pt-40">
        <div className="max-w-2xl reveal">
          <span className="chip">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            {hero.eyebrow}
          </span>

          <h1 className="mt-6 font-display text-[clamp(2.6rem,6.4vw,4.6rem)] font-medium leading-[0.98] tracking-[-0.03em]">
            <span className="block">{hero.title[0]}</span>
            <span className="block text-gold">{hero.title[1]}</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/80">
            {hero.subtitle}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href={bookingHref} variant="gold">
              Avaliação física gratuita
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href="#planos" variant="onimage">
              Ver planos e preços
            </ButtonLink>
          </div>
        </div>

        {/* Stats */}
        <dl className="mt-14 grid max-w-2xl grid-cols-3 gap-6 border-t border-cream/15 pt-8">
          {hero.stats.map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-display text-3xl font-medium text-cream md:text-4xl">
                {s.value}
              </dd>
              <p className="mt-1 text-sm text-cream/65">{s.label}</p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
