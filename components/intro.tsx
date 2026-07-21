import Image from "next/image";
import { UserCheck, ClipboardList, Target, CalendarClock, type LucideIcon } from "lucide-react";
import { intro } from "@/lib/content";

const icons: Record<string, LucideIcon> = {
  "user-check": UserCheck,
  clipboard: ClipboardList,
  target: Target,
  calendar: CalendarClock,
};

export function Intro() {
  return (
    <section id="estudio" className="section bg-sand">
      <div className="container-x">
        <div className="grid gap-6 md:grid-cols-2 md:items-end">
          <div>
            <span className="eyebrow">{intro.eyebrow}</span>
            <h2 className="mt-4 max-w-xl text-[clamp(2rem,4.2vw,2.9rem)]">{intro.title}</h2>
          </div>
          <p className="max-w-md text-muted md:justify-self-end md:text-right">
            {intro.subtitle}
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-12">
          {/* Image */}
          <div className="relative min-h-[340px] overflow-hidden rounded-3xl lg:col-span-5 lg:min-h-full">
            <Image
              src="/images/coaching.jpg"
              alt="Personal trainer ajudando aluna com halteres durante o treino no estúdio"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="chip !text-cream">Do aquecimento ao alongamento, sempre acompanhado</p>
            </div>
          </div>

          {/* Cards + stat */}
          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
            {intro.cards.map((card) => {
              const Icon = icons[card.icon] ?? Target;
              return (
                <div key={card.title} className="card p-6 sm:p-7">
                  <span className="icon-badge">
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <h3 className="mt-5 text-xl">{card.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{card.text}</p>
                </div>
              );
            })}

            <div className="rounded-3xl bg-ink p-7 text-cream sm:col-span-2">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
                <span className="font-display text-6xl font-medium text-gold">{intro.stat.value}</span>
                <p className="max-w-md text-cream/75">{intro.stat.label}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
