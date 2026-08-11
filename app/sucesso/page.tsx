import Link from "next/link";
import { CheckCircle2, ArrowRight, CalendarCheck } from "lucide-react";
import { Logo } from "@/components/brand";
import { brand, plans } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Inscrição confirmada" };

export default async function Sucesso({
  searchParams,
}: {
  searchParams: Promise<{ plano?: string }>;
}) {
  const { plano } = await searchParams;
  const planName = plans.find((p) => p.slug === plano)?.name;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-ink px-6 text-center text-cream">
      <Logo tone="dark" className="mb-12" />
      <span className="flex h-20 w-20 items-center justify-center rounded-full bg-gold/15 text-gold">
        <CheckCircle2 className="h-10 w-10" />
      </span>
      <h1 className="mt-8 max-w-lg text-[clamp(2rem,5vw,3rem)]">Bem-vindo ao Connect Club!</h1>
      <p className="mt-4 max-w-md text-cream/75">
        A tua inscrição{planName ? ` no plano ${planName}` : ""} foi confirmada. Falta só um passo:
        marca a tua primeira sessão e nós tratamos do resto.
      </p>
      <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
        <a
          href={`mailto:${brand.email}?subject=${encodeURIComponent(
            "Marcar a primeira sessão" + (planName ? ` (plano ${planName})` : "")
          )}`}
          className="btn btn-gold"
        >
          Marcar a primeira sessão
          <CalendarCheck className="h-4 w-4" />
        </a>
        <Link href="/" className="btn btn-onimage">
          Voltar ao início
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </main>
  );
}
