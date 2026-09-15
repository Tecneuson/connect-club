"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Dumbbell, Zap, Users, Apple, Flower2, type LucideIcon } from "lucide-react";
import type { Pillar } from "@/lib/content";

const icons: Record<string, LucideIcon> = {
  dumbbell: Dumbbell,
  hybrid: Zap,
  group: Users,
  nutrition: Apple,
  massage: Flower2,
};

export function PillarCard({ item }: { item: Pillar }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  // nem todos os pilares já foram filmados; os que não têm ficam só com a foto
  const [videoOk, setVideoOk] = useState(true);
  const Icon = icons[item.icon] ?? Dumbbell;

  function play() {
    videoRef.current?.play().catch(() => {});
  }

  function stop() {
    const el = videoRef.current;
    if (!el) return;
    el.pause();
    el.currentTime = 0;
  }

  // <a> normal e não <Link>: o preçário abre o separador certo ao ouvir o
  // `hashchange`, e o router do Next muda o hash sem disparar esse evento.
  return (
    <a
      href={item.href}
      onMouseEnter={play}
      onMouseLeave={stop}
      onFocus={play}
      onBlur={stop}
      className="group relative block aspect-[3/4] overflow-hidden rounded-3xl shadow-soft"
    >
      <Image
        src={item.image}
        alt={item.title}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      {item.video && videoOk && (
        <video
          ref={videoRef}
          src={item.video}
          muted
          loop
          playsInline
          preload="none"
          onError={() => setVideoOk(false)}
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-transparent" />
      <span className="absolute left-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-cream/15 text-cream backdrop-blur-sm">
        <Icon className="h-4.5 w-4.5" strokeWidth={1.8} />
      </span>
      <div className="absolute inset-x-0 bottom-0 p-5 text-cream">
        <h3 className="text-lg leading-snug">{item.title}</h3>
        <p className="mt-1.5 text-[13px] leading-relaxed text-cream/75">{item.text}</p>
        <span className="mt-3 inline-block text-xs font-medium uppercase tracking-wide text-gold-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          Ver preços
        </span>
      </div>
    </a>
  );
}
