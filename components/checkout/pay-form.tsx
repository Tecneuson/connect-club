"use client";

import { useState } from "react";
import { ArrowRight, CreditCard, Landmark, Loader2, Lock } from "lucide-react";
import { checkout, type BillingKind } from "@/lib/content";
import { formatIban, isValidBic, isValidIban, normalizeBic, suggestBic } from "@/lib/iban";

type Method = "debito" | "cartao";

const inputClass =
  "mt-2 h-13 w-full rounded-xl border border-ink/15 bg-white px-4 text-ink placeholder:text-ink/40 focus:border-gold-600 focus:outline-none";

/**
 * Formulário de pagamento.
 *   · pack         → só o email; segue para a página Pay By Link da EuPago.
 *   · mensalidade  → débito direto (nome, IBAN, BIC e autorização) ou cartão.
 */
export function PayForm({
  plan,
  kind,
  allowCard,
}: {
  plan: string;
  kind: BillingKind;
  /** Falso nas mensalidades que a EuPago não cobra por cartão (ex.: de 2 em 2 meses). */
  allowCard: boolean;
}) {
  const [email, setEmail] = useState("");
  const [method, setMethod] = useState<Method>("debito");
  const [name, setName] = useState("");
  const [iban, setIban] = useState("");
  // null = a pessoa ainda não mexeu no BIC, e mostra-se o sugerido pelo IBAN.
  const [bicTyped, setBicTyped] = useState<string | null>(null);
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debito = kind === "mensal" && (method === "debito" || !allowCard);
  const bic = bicTyped ?? suggestBic(iban) ?? "";

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    setError(null);

    // Validação toda aqui, por ordem e em pt-PT. Com a validação nativa do
    // browser (`required`), um BIC vazio travava o envio com um balão genérico
    // e escondia o erro que interessava — por exemplo, um IBAN mal escrito.
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) return setError(checkout.emailInvalid);
    if (debito) {
      if (name.trim().length < 3) return setError(checkout.debito.nameMissing);
      if (!isValidIban(iban)) return setError(checkout.debito.ibanInvalid);
      if (!isValidBic(bic)) return setError(checkout.debito.bicInvalid);
      if (!consent) return setError(checkout.debito.consentMissing);
    }

    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan,
          email,
          ...(kind === "mensal" ? { method: debito ? "debito" : "cartao" } : {}),
          ...(debito ? { name, iban, bic } : {}),
        }),
      });
      const data = await res.json();

      if (data?.url) {
        window.location.href = data.url;
        return;
      }
      setError(data?.demo ? checkout.notConfigured : data?.error ?? checkout.error);
    } catch {
      setError(checkout.error);
    } finally {
      setLoading(false);
    }
  }

  const cta = debito ? checkout.debito.cta : checkout.cta;
  const note = kind === "pack" ? checkout.packNote : debito ? checkout.debito.note : checkout.cardNote;

  return (
    <form onSubmit={submit} noValidate className="mt-6">
      {kind === "mensal" && allowCard && (
        <div
          role="radiogroup"
          aria-label="Como queres pagar"
          className="mb-6 grid grid-cols-2 gap-1 rounded-2xl bg-sand-100 p-1"
        >
          {(["debito", "cartao"] as const).map((m) => {
            const Icon = m === "debito" ? Landmark : CreditCard;
            const selected = method === m;
            return (
              <button
                key={m}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => setMethod(m)}
                className={`flex h-11 items-center justify-center gap-2 rounded-xl text-sm font-medium transition-colors ${
                  selected ? "bg-white text-ink shadow-sm" : "text-ink/60 hover:text-ink"
                }`}
              >
                <Icon className="h-4 w-4" />
                {checkout.methods[m]}
              </button>
            );
          })}
        </div>
      )}

      <label htmlFor="email" className="text-sm font-medium text-ink">
        {checkout.emailLabel}
      </label>
      <input
        id="email"
        type="email"
        required
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={checkout.emailPlaceholder}
        className={inputClass}
      />

      {debito && (
        <div className="mt-5 space-y-5">
          <div>
            <label htmlFor="titular" className="text-sm font-medium text-ink">
              {checkout.debito.nameLabel}
            </label>
            <input
              id="titular"
              required
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="iban" className="text-sm font-medium text-ink">
              {checkout.debito.ibanLabel}
            </label>
            <input
              id="iban"
              required
              autoComplete="off"
              spellCheck={false}
              value={iban}
              onChange={(e) => setIban(e.target.value)}
              onBlur={() => setIban((v) => formatIban(v))}
              placeholder={checkout.debito.ibanPlaceholder}
              className={`${inputClass} font-mono tracking-wide`}
            />
          </div>

          <div>
            <label htmlFor="bic" className="text-sm font-medium text-ink">
              {checkout.debito.bicLabel}
            </label>
            <input
              id="bic"
              required
              autoComplete="off"
              spellCheck={false}
              value={bic}
              onChange={(e) => setBicTyped(normalizeBic(e.target.value))}
              aria-describedby="bic-hint"
              className={`${inputClass} font-mono uppercase tracking-wide`}
            />
            <p id="bic-hint" className="mt-1.5 text-xs text-muted">
              {checkout.debito.bicHint}
            </p>
          </div>

          <label className="flex items-start gap-3 text-[13px] leading-relaxed text-ink/75">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1 h-4 w-4 flex-none accent-ink"
            />
            {checkout.debito.consent}
          </label>
        </div>
      )}

      <button type="submit" disabled={loading} aria-busy={loading} className="btn btn-dark btn-block mt-6 h-13">
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {debito ? "A confirmar…" : "A redirecionar…"}
          </>
        ) : (
          <>
            {cta}
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>

      {error && (
        <p
          role="alert"
          className="mt-4 rounded-xl border border-gold-600/30 bg-gold/10 px-4 py-3 text-sm text-ink/80"
        >
          {error}
        </p>
      )}

      <p className="mt-4 text-center text-xs text-muted">{note}</p>
      <p className="mt-2 flex items-center justify-center gap-2 text-xs text-muted">
        <Lock className="h-3.5 w-3.5 text-gold-600" />
        {checkout.secure}
      </p>
    </form>
  );
}
