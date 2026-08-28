"use client";

import { useState } from "react";
import { Loader2, Lock, ArrowRight } from "lucide-react";
import { checkout } from "@/lib/content";

export function PayForm({ plan }: { plan: string }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, email }),
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

  return (
    <form onSubmit={submit} className="mt-6">
      <label htmlFor="email" className="text-sm font-medium text-ink">
        {checkout.emailLabel}
      </label>
      <input
        id="email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={checkout.emailPlaceholder}
        className="mt-2 h-13 w-full rounded-xl border border-ink/15 bg-white px-4 text-ink placeholder:text-ink/40 focus:border-gold-600 focus:outline-none"
      />

      <button type="submit" disabled={loading} aria-busy={loading} className="btn btn-dark btn-block mt-5 h-13">
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            A redirecionar…
          </>
        ) : (
          <>
            {checkout.cta}
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>

      {error && (
        <p className="mt-4 rounded-xl border border-gold-600/30 bg-gold/10 px-4 py-3 text-sm text-ink/80">
          {error}
        </p>
      )}

      <p className="mt-5 flex items-center justify-center gap-2 text-xs text-muted">
        <Lock className="h-3.5 w-3.5 text-gold-600" />
        {checkout.secure}
      </p>
    </form>
  );
}
