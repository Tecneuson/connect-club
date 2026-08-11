"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Dumbbell, Zap, Users, Apple, Flower2, type LucideIcon } from "lucide-react";
import type { pilares } from "@/lib/content";

const icons: Record<string, LucideIcon> = {
  dumbbell: Dumbbell,
  hybrid: Zap,
  group: Users,
  nutrition: Apple,
  massage: Flower2,
};

type Pillar = (typeof pilares.items)[number];

export function PillarCard({ item }: { item: Pillar }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  // o vídeo só aparece quando o ficheiro existir em /public/videos
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

  return (
    <Link
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
      {videoOk && (
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
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
      <span className="absolute left-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-cream/15 text-cream backdrop-blur-sm">
        <Icon className="h-4.5 w-4.5" strokeWidth={1.8} />
      </span>
      <div className="absolute inset-x-0 bottom-0 p-5 text-cream">
        <h3 className="text-lg leading-snug">{item.title}</h3>
        <p className="mt-1.5 text-[13px] leading-relaxed text-cream/75">{item.text}</p>
        <span className="mt-3 inline-block text-xs font-medium uppercase tracking-wide text-gold-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          Ver planos
        </span>
      </div>
    </Link>
  );
}
