import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/brand";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Inscrição não concluída" };

export default function Cancelado() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-sand px-6 text-center">
      <Logo className="mb-12" />
      <h1 className="max-w-lg text-[clamp(1.8rem,5vw,2.6rem)]">A tua inscrição não foi concluída.</h1>
      <p className="mt-4 max-w-md text-muted">
        Tudo bem — não foi cobrado nada. Quando quiseres continuar, é só voltar e escolher o teu
        plano. Se tiveres qualquer dúvida, estamos aqui para ajudar.
      </p>
      <div className="mt-9 flex flex-col gap-3 sm:flex-row">
        <Link href="/#planos" className="btn btn-dark">
          <ArrowLeft className="h-4 w-4" />
          Ver os planos
        </Link>
        <Link href="/" className="btn btn-ghost">
          Voltar ao início
        </Link>
      </div>
    </main>
  );
}
