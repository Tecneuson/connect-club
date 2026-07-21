"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { faq, brand, signupHref } from "@/lib/content";
import { ButtonLink } from "@/components/ui/button";

export function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="duvidas" className="section bg-cream">
      <div className="container-x grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <span className="eyebrow">{faq.eyebrow}</span>
          <h2 className="mt-4 text-[clamp(2rem,4.2vw,2.9rem)]">{faq.title}</h2>
          <p className="mt-4 max-w-sm text-muted">{faq.ctaText}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={signupHref} variant="dark">
              Começa a treinar agora
            </ButtonLink>
            <ButtonLink href={`mailto:${brand.email}`} variant="ghost">
              Fala connosco
            </ButtonLink>
          </div>
        </div>

        <div className="divide-y divide-ink/10 border-t border-ink/10">
          {faq.items.map((item, i) => {
            const active = open === i;
            return (
              <div key={item.q}>
                <button
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  onClick={() => setOpen(active ? -1 : i)}
                  aria-expanded={active}
                >
                  <span className="font-display text-lg font-medium">{item.q}</span>
                  <span
                    className={`flex h-9 w-9 flex-none items-center justify-center rounded-full transition-colors ${
                      active ? "bg-gold text-ink" : "bg-ink/5 text-ink"
                    }`}
                  >
                    {active ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ${
                    active ? "grid-rows-[1fr] pb-6 opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-xl text-[15px] leading-relaxed text-muted">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
