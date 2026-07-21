import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { finalCta, bookingHref } from "@/lib/content";
import { ButtonLink } from "@/components/ui/button";

export function FinalCta() {
  return (
    <section className="section bg-sand pt-0">
      <div className="container-x">
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-ink px-6 py-16 text-cream md:px-16 md:py-24">
          <Image
            src={finalCta.image}
            alt=""
            fill
            sizes="100vw"
            className="scale-105 object-cover opacity-35 blur-[2px]"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-ink/90 via-ink/80 to-ink/60" />

          <div className="relative mx-auto max-w-2xl text-center">
            <span className="eyebrow eyebrow--ondark justify-center">{finalCta.eyebrow}</span>
            <h2 className="mt-4 text-cream text-[clamp(2.1rem,5vw,3.4rem)]">{finalCta.title}</h2>
            <p className="mx-auto mt-5 max-w-xl text-cream/75">{finalCta.subtitle}</p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ButtonLink href={bookingHref} variant="gold">
                Marcar avaliação gratuita
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink href="#planos" variant="onimage">
                Ver planos e preços
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
