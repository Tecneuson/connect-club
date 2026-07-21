import Image from "next/image";
import Link from "next/link";
import { Dumbbell, Zap, Users, Apple, Flower2, ArrowRight, type LucideIcon } from "lucide-react";
import { pilares, bookingHref } from "@/lib/content";

const icons: Record<string, LucideIcon> = {
  dumbbell: Dumbbell,
  hybrid: Zap,
  group: Users,
  nutrition: Apple,
  massage: Flower2,
};

export function Intro() {
  return (
    <section id="pilares" className="section bg-sand">
      <div className="container-x">
        <div className="grid gap-6 md:grid-cols-2 md:items-end">
          <div>
            <span className="eyebrow">{pilares.eyebrow}</span>
            <h2 className="mt-4 max-w-xl text-[clamp(2rem,4.2vw,2.9rem)]">{pilares.title}</h2>
          </div>
          <p className="max-w-md text-muted md:justify-self-end md:text-right">
            {pilares.subtitle}
          </p>
        </div>

        {/* 5 pilares */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {pilares.items.map((item) => {
            const Icon = icons[item.icon] ?? Dumbbell;
            return (
              <div key={item.title} className="card flex flex-col p-6">
                <span className="icon-badge">
                  <Icon className="h-5 w-5" strokeWidth={1.8} />
                </span>
                <h3 className="mt-5 text-lg">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
              </div>
            );
          })}
        </div>

        {/* Diferenciador: treino autónomo */}
        <div className="mt-6 grid overflow-hidden rounded-3xl bg-ink lg:grid-cols-2">
          <div className="relative min-h-[280px] lg:min-h-full">
            <Image
              src="/images/coaching.jpg"
              alt="Treinadora a acompanhar de perto o treino de um aluno no estúdio"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-ink/60 lg:to-ink" />
          </div>
          <div className="flex flex-col justify-center gap-5 p-8 text-cream sm:p-12">
            <span className="font-display text-5xl font-medium text-gold sm:text-6xl">
              {pilares.highlight.value}
            </span>
            <p className="max-w-md text-lg text-cream/80">{pilares.highlight.label}</p>
            <Link href={bookingHref} className="btn btn-gold self-start">
              Marcar avaliação gratuita
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
