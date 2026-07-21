"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";
import { testimonials } from "@/lib/content";

export function Testimonials() {
  const [i, setI] = useState(0);
  const total = testimonials.length;
  const t = testimonials[i];

  const go = (dir: 1 | -1) => setI((prev) => (prev + dir + total) % total);

  return (
    <section id="depoimentos" className="section bg-ink text-cream">
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow eyebrow--ondark">Depoimentos</span>
            <h2 className="mt-4 max-w-xl text-cream text-[clamp(2rem,4.2vw,2.9rem)]">
              Histórias de quem encontrou o seu ritmo.
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-display text-sm text-cream/60">
              {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <div className="flex gap-3">
              <button className="icon-btn" onClick={() => go(-1)} aria-label="Depoimento anterior">
                <ArrowLeft className="h-5 w-5" />
              </button>
              <button className="icon-btn" onClick={() => go(1)} aria-label="Próximo depoimento">
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-8 overflow-hidden rounded-3xl border border-cream/10 bg-ink-800 md:grid-cols-[minmax(0,22rem)_1fr] md:gap-0">
          <div className="relative aspect-square md:aspect-auto">
            <Image
              key={t.image}
              src={t.image}
              alt={t.name}
              fill
              sizes="(max-width: 768px) 100vw, 22rem"
              className="object-cover"
            />
          </div>
          <figure className="flex flex-col justify-center p-8 md:p-12">
            <Quote className="h-10 w-10 text-gold" />
            <div className="mt-4 flex gap-1 text-gold" aria-label="5 de 5 estrelas">
              {Array.from({ length: 5 }).map((_, s) => (
                <Star key={s} className="h-4 w-4 fill-gold" />
              ))}
            </div>
            <blockquote className="mt-5 font-display text-xl font-medium leading-snug text-cream md:text-2xl">
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-6">
              <p className="font-display text-lg text-cream">{t.name}</p>
              <p className="text-sm text-gold-300">{t.role}</p>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
