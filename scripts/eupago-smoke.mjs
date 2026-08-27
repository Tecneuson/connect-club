#!/usr/bin/env node
/* -----------------------------------------------------------------------------
   Teste de fumo contra a EuPago.

   Cria uma subscrição real no ambiente configurado (usa sandbox!) e imprime o
   URL do formulário seguro, para confirmar que a API Key e o canal estão bem.

     npm run eupago:smoke

   Lê as variáveis de .env.local.
----------------------------------------------------------------------------- */

try {
  process.loadEnvFile(".env.local");
} catch {
  console.warn("Aviso: .env.local não encontrado — a usar as variáveis do ambiente.\n");
}

const env = process.env.EUPAGO_ENV === "production" ? "production" : "sandbox";
const baseUrl =
  env === "production" ? "https://clientes.eupago.pt/api" : "https://sandbox.eupago.pt/api";
const apiKey = process.env.EUPAGO_API_KEY?.trim();

if (!apiKey) {
  console.error("✗ EUPAGO_API_KEY não está definida. Preenche o .env.local primeiro.");
  process.exit(1);
}

if (env === "production") {
  console.warn("⚠  EUPAGO_ENV=production — isto cria uma subscrição a sério. Ctrl+C para abortar.");
}

const today = new Date();
const iso = (d) => d.toISOString().slice(0, 10);
const limit = new Date(today);
limit.setFullYear(limit.getFullYear() + 1);

const identifier = `smoke-pt-2x-${Math.random().toString(36).slice(2, 10)}`;
const site = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "http://localhost:3000";

const body = {
  payment: {
    identifier,
    amount: { value: 1.0, currency: "EUR" },
    subscription: {
      date: iso(today),
      autoProcess: "1",
      collectionDay: Math.min(today.getDate(), 28),
      periodicity: "Mensal",
      limitDate: iso(limit),
      customer: { notify: false, email: "teste@connectclub.pt" },
    },
    successUrl: `${site}/sucesso?plano=pt-2x&ref=${identifier}`,
    failUrl: `${site}/cancelado?plano=pt-2x&estado=falha`,
    backUrl: `${site}/cancelado?plano=pt-2x`,
  },
  customer: { notify: false, email: "teste@connectclub.pt" },
};

console.log(`→ POST ${baseUrl}/v1.02/creditcard/subscription  (${env})`);
console.log(`  identifier: ${identifier}\n`);

const res = await fetch(`${baseUrl}/v1.02/creditcard/subscription`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `ApiKey ${apiKey}`,
  },
  body: JSON.stringify(body),
});

const text = await res.text();
let data;
try {
  data = JSON.parse(text);
} catch {
  data = text;
}

console.log(`HTTP ${res.status}`);
console.dir(data, { depth: null });

if (res.ok && data?.transactionStatus === "Success" && data?.redirectUrl) {
  console.log("\n✓ Subscrição criada. Abre este URL para completar com um cartão de teste:");
  console.log(`  ${data.redirectUrl}`);
  console.log("\n  Cartões de teste: https://eupago.readme.io/reference/test-cards");
} else {
  console.error("\n✗ A EuPago não aceitou o pedido. Vê a resposta acima.");
  process.exitCode = 1;
}
