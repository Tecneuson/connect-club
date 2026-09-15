import Link from "next/link";
import { CheckCircle2, ArrowRight, CalendarCheck } from "lucide-react";
import { Logo } from "@/components/brand";
import { brand, findOffer, offerLabel } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Inscrição confirmada" };

/**
 * `tipo` diz por onde o cliente pagou, e o texto muda com isso:
 *   · debito → o mandato foi criado; o primeiro débito ainda vem aí;
 *   · pack   → pode ter escolhido Multibanco, por isso o pagamento pode estar pendente;
 *   · cartao (ou sem tipo, nos links antigos) → a subscrição ficou ativa.
 */
export default async function Sucesso({
  searchParams,
}: {
  searchParams: Promise<{ plano?: string; ref?: string; tipo?: string }>;
}) {
  const { plano, ref, tipo } = await searchParams;
  const offer = findOffer(plano);
  const planName = offer ? offerLabel(offer) : undefined;
  const em = planName ? ` em ${planName}` : "";

  const message =
    tipo === "debito"
      ? `A tua adesão${em} por débito direto ficou registada. Vais receber o mandato por email e o primeiro débito acontece daqui a poucos dias. Falta só marcar a tua primeira sessão.`
      : tipo === "pack"
        ? `Recebemos o teu pedido${em}. Assim que o pagamento for confirmado, o pack fica ativo. Falta só marcar a tua primeira sessão.`
        : `A tua inscrição${em} foi confirmada. Falta só um passo: marca a tua primeira sessão e nós tratamos do resto.`;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-ink px-6 text-center text-cream">
      <Logo tone="dark" className="mb-12" />
      <span className="flex h-20 w-20 items-center justify-center rounded-full bg-gold/15 text-gold">
        <CheckCircle2 className="h-10 w-10" />
      </span>
      <h1 className="mt-8 max-w-lg text-[clamp(2rem,5vw,3rem)]">Bem-vindo ao Connect Club!</h1>
      <p className="mt-4 max-w-md text-cream/75">{message}</p>
      {ref && (
        <p className="mt-3 text-xs text-cream/45">
          {tipo === "debito" ? "Referência do mandato" : "Referência da inscrição"}:{" "}
          <span className="font-mono">{ref}</span>
        </p>
      )}
      <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
        <a
          href={`mailto:${brand.email}?subject=${encodeURIComponent(
            "Marcar a primeira sessão" + (planName ? ` (${planName})` : "")
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
