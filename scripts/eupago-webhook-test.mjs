#!/usr/bin/env node
/* -----------------------------------------------------------------------------
   Simula uma notificação da EuPago contra o nosso endpoint local.

   Constrói o payload pela mesma receita da documentação da EuPago
   (AES-256-CBC + HMAC SHA-256) e envia-o para /api/webhooks/eupago, para
   confirmar que a verificação de assinatura e a desencriptação funcionam.

     npm run dev                  # noutro terminal
     npm run eupago:webhook-test  # v2 encriptado (predefinido)
     npm run eupago:webhook-test -- --plain
     npm run eupago:webhook-test -- --v1
----------------------------------------------------------------------------- */

import crypto from "node:crypto";

try {
  process.loadEnvFile(".env.local");
} catch {
  console.warn("Aviso: .env.local não encontrado — a usar as variáveis do ambiente.\n");
}

const target = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
const endpoint = `${target}/api/webhooks/eupago`;
const secret = process.env.EUPAGO_WEBHOOK_SECRET ?? "";
const mode = process.argv.includes("--v1") ? "v1" : process.argv.includes("--plain") ? "plain" : "encrypted";

/** A EuPago (PHP/OpenSSL) enche a chave com NUL até 32 bytes. */
function normalizeKey(value) {
  const key = Buffer.alloc(32);
  Buffer.from(value, "utf8").copy(key, 0, 0, 32);
  return key;
}

const payload = {
  transactions: {
    entity: 82307,
    reference: 102087857,
    identifier: "cc-pt-2x-smoke001",
    method: "CreditCard",
    amount: { value: 268.8, currency: "EUR" },
    fees: { value: 3.2, currency: "EUR" },
    date: new Date().toISOString(),
    trid: 10409241,
    status: "Paid",
  },
  channel: { name: "connect-club" },
};

if (mode === "v1") {
  const params = new URLSearchParams({
    valor: "268.80",
    canal: "connect-club",
    referencia: "102087857",
    transacao: "10409241",
    identificador: "cc-pt-2x-smoke001",
    mp: "CC:PT",
    chave_api: process.env.EUPAGO_API_KEY ?? "xxxx",
    data: new Date().toISOString().slice(0, 16).replace("T", ":"),
    entidade: "82307",
    comissao: "3.20",
    local: "online",
  });
  const url = `${endpoint}?${params}`;
  console.log(`→ GET ${url}\n`);
  const res = await fetch(url);
  console.log(`HTTP ${res.status}`, await res.text());
  process.exitCode = res.ok ? 0 : 1;
} else {
  let body;
  const headers = { "Content-Type": "application/json" };

  if (mode === "encrypted") {
    if (!secret) {
      console.error("✗ --encrypted precisa de EUPAGO_WEBHOOK_SECRET no .env.local.");
      process.exit(1);
    }
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv("aes-256-cbc", normalizeKey(secret), iv);
    const encrypted = Buffer.concat([
      cipher.update(JSON.stringify(payload), "utf8"),
      cipher.final(),
    ]).toString("base64");
    body = JSON.stringify({ data: encrypted });
    headers["X-Initialization-Vector"] = iv.toString("base64");
  } else {
    body = JSON.stringify(payload);
  }

  if (secret) {
    headers["X-Signature"] = crypto.createHmac("sha256", secret).update(body).digest("base64");
  } else {
    console.warn("Aviso: sem EUPAGO_WEBHOOK_SECRET, o pedido vai sem assinatura.\n");
  }

  console.log(`→ POST ${endpoint}  (${mode})\n`);
  const res = await fetch(endpoint, { method: "POST", headers, body });
  console.log(`HTTP ${res.status}`, await res.text());
  process.exitCode = res.ok ? 0 : 1;
}
