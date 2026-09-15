import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/brand";
import { brand, findOffer, offerLabel } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Inscrição não concluída" };

/**
 * Página de retorno quando o pagamento não se concretiza.
 *
 * A EuPago distingue duas saídas do formulário e nós mostramos textos
 * diferentes para cada uma:
 *   · `backUrl`  → o cliente carregou em voltar (sem `estado`);
 *   · `failUrl`  → o pagamento foi recusado (`estado=falha`).
 */
export default async function Cancelado({
  searchParams,
}: {
  searchParams: Promise<{ plano?: string; estado?: string }>;
}) {
  const { plano, estado } = await searchParams;
  const offer = findOffer(plano);
  const falhou = estado === "falha";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-sand px-6 text-center">
      <Logo className="mb-12" />
      <h1 className="max-w-lg text-[clamp(1.8rem,5vw,2.6rem)]">
        {falhou ? "O pagamento não foi aceite." : "A tua inscrição não foi concluída."}
      </h1>
      <p className="mt-4 max-w-md text-muted">
        {falhou
          ? "A operação foi recusada e não foi cobrado nada. Confirma os dados de pagamento ou tenta com outro método. Se continuar a falhar, fala connosco que resolvemos contigo."
          : "Tudo bem, não foi cobrado nada. Quando quiseres continuar, é só voltar e escolher o teu plano. Se tiveres qualquer dúvida, estamos aqui para ajudar."}
      </p>
      <div className="mt-9 flex flex-col gap-3 sm:flex-row">
        {offer ? (
          <Link href={`/inscricao/${offer.slug}`} className="btn btn-dark">
            <ArrowLeft className="h-4 w-4" />
            {`Tentar de novo (${offerLabel(offer)})`}
          </Link>
        ) : (
          <Link href="/#planos" className="btn btn-dark">
            <ArrowLeft className="h-4 w-4" />
            Ver os planos
          </Link>
        )}
        <a href={`mailto:${brand.email}?subject=${encodeURIComponent("Ajuda com a inscrição")}`} className="btn btn-ghost">
          Falar connosco
        </a>
      </div>
    </main>
  );
}
