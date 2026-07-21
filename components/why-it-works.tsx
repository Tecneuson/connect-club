"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Check, TrendingUp } from "lucide-react";
import { why } from "@/lib/content";

export function WhyItWorks() {
  const [open, setOpen] = useState(0);
  const bars = [55, 68, 74, 82, 88, 92];

  return (
    <section className="section bg-sand">
      <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        {/* Accordion */}
        <div>
          <span className="eyebrow">{why.eyebrow}</span>
          <h2 className="mt-4 max-w-lg text-[clamp(2rem,4.2vw,2.9rem)]">{why.title}</h2>
          <p className="mt-4 max-w-lg text-muted">{why.subtitle}</p>

          <div className="mt-8 divide-y divide-ink/10 border-t border-ink/10">
            {why.items.map((item, i) => {
              const active = open === i;
              return (
                <div key={item.title}>
                  <button
                    className="flex w-full items-center gap-4 py-5 text-left"
                    onClick={() => setOpen(active ? -1 : i)}
                    aria-expanded={active}
                  >
                    <span
                      className={`flex h-9 w-9 flex-none items-center justify-center rounded-full transition-colors ${
                        active ? "bg-gold text-ink" : "bg-gold/18 text-gold-600"
                      }`}
                    >
                      {active ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </span>
                    <span className="flex-1 font-display text-lg font-medium">{item.title}</span>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ${
                      active ? "grid-rows-[1fr] pb-5 opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pl-13 text-[15px] leading-relaxed text-muted">{item.text}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Image + floating widget */}
        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
            <Image
              src="/images/why.jpg"
              alt="Aluno treinando com o acompanhamento de um personal trainer"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
          </div>

          <div className="absolute -bottom-6 -left-3 w-[16rem] rounded-2xl border border-ink/10 bg-cream/85 p-5 shadow-[0_24px_50px_-24px_rgba(25,25,25,0.5)] backdrop-blur-md sm:-left-6">
            <div className="flex items-center gap-2 text-gold-600">
              <TrendingUp className="h-4 w-4" />
              <span className="text-xs font-medium uppercase tracking-wide">{why.widget.title}</span>
            </div>
            <div className="mt-2 flex items-end gap-2">
              <span className="font-display text-4xl font-medium text-ink">{why.widget.metric}</span>
              <span className="pb-1 text-sm text-muted">{why.widget.caption}</span>
            </div>
            <div className="mt-4 flex h-14 items-end gap-1.5" aria-hidden="true">
              {bars.map((h, i) => (
                <span
                  key={i}
                  className="flex-1 rounded-t bg-gold"
                  style={{ height: `${h}%`, opacity: 0.45 + i * 0.09 }}
                />
              ))}
            </div>
            <p className="mt-2 text-xs text-muted">{why.widget.barLabel}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
