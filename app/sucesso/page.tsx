import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Logo } from "@/components/brand";
import { plans } from "@/lib/content";
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
        A tua inscrição{planName ? ` no plano ${planName}` : ""} foi confirmada. Vais receber um
        email com os próximos passos para marcares a tua primeira sessão.
      </p>
      <Link href="/" className="btn btn-gold mt-9">
        Voltar ao início
        <ArrowRight className="h-4 w-4" />
      </Link>
    </main>
  );
}
