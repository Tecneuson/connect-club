"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { method } from "@/lib/content";

export function MethodCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  function update() {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }

  function scrollBy(dir: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    const amount = Math.min(el.clientWidth * 0.8, 400);
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  }

  return (
    <section id="metodo" className="section bg-cream">
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow">{method.eyebrow}</span>
            <h2 className="mt-4 max-w-xl text-[clamp(2rem,4.2vw,2.9rem)]">{method.title}</h2>
            <p className="mt-4 max-w-lg text-muted">{method.subtitle}</p>
          </div>
          <div className="flex gap-3">
            <button
              className="icon-btn"
              onClick={() => scrollBy(-1)}
              disabled={atStart}
              aria-label="Anterior"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              className="icon-btn"
              onClick={() => scrollBy(1)}
              disabled={atEnd}
              aria-label="Próximo"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          onScroll={update}
          className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2"
        >
          {method.steps.map((step) => (
            <article
              key={step.n}
              className="group relative aspect-[3/4] w-[80%] flex-none snap-start overflow-hidden rounded-3xl sm:w-[46%] lg:w-[31%]"
            >
              <Image
                src={step.image}
                alt={step.title}
                fill
                sizes="(max-width: 640px) 80vw, (max-width: 1024px) 46vw, 31vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
              <span className="absolute left-5 top-5 inline-flex h-11 w-11 items-center justify-center rounded-full bg-gold font-display text-sm font-semibold text-ink">
                {step.n}
              </span>
              <div className="absolute inset-x-0 bottom-0 p-6 text-cream">
                <h3 className="text-xl">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/75">{step.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
