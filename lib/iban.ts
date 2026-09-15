/* -----------------------------------------------------------------------------
   IBAN e BIC — validação local, antes de pedir o mandato de débito direto.
   Serve tanto o formulário (browser) como a rota de checkout (servidor).
----------------------------------------------------------------------------- */

export function normalizeIban(value: string): string {
  return value.replace(/\s+/g, "").toUpperCase();
}

/** "PT50 0002 0123 …" — agrupado de 4 em 4, como vem no extrato. */
export function formatIban(value: string): string {
  return normalizeIban(value).replace(/(.{4})/g, "$1 ").trim();
}

/** Só o início e o fim, para logs e eventos. O IBAN inteiro nunca sai da rota. */
export function maskIban(value: string): string {
  const iban = normalizeIban(value);
  return `${iban.slice(0, 4)} •••• ${iban.slice(-4)}`;
}

/** Valida o IBAN pelo dígito de controlo (mod-97, ISO 13616). */
export function isValidIban(value: string): boolean {
  const iban = normalizeIban(value);
  if (!/^[A-Z]{2}\d{2}[A-Z0-9]{10,30}$/.test(iban)) return false;
  if (iban.startsWith("PT") && iban.length !== 25) return false;

  const rearranged = iban.slice(4) + iban.slice(0, 4);
  let remainder = 0;
  for (const ch of rearranged) {
    const digits = ch >= "A" && ch <= "Z" ? String(ch.charCodeAt(0) - 55) : ch;
    for (const d of digits) remainder = (remainder * 10 + Number(d)) % 97;
  }
  return remainder === 1;
}

export function normalizeBic(value: string): string {
  return value.replace(/\s+/g, "").toUpperCase();
}

export function isValidBic(value: string): boolean {
  return /^[A-Z]{4}[A-Z]{2}[A-Z0-9]{2}([A-Z0-9]{3})?$/.test(normalizeBic(value));
}

/**
 * BIC dos principais bancos portugueses, pelo código de banco do IBAN (4
 * dígitos a seguir ao "PTnn"). A EuPago exige o BIC e quase ninguém o sabe de
 * cor, por isso sugerimos — o campo continua editável para quem quiser corrigir.
 */
const PT_BANK_BIC: Record<string, string> = {
  "0007": "BESCPTPL", // Novo Banco
  "0010": "BBPIPTPL", // BPI
  "0018": "TOTAPTPL", // Santander
  "0023": "ACTVPTPL", // ActivoBank
  "0033": "BCOMPTPL", // Millennium BCP
  "0035": "CGDIPTPL", // Caixa Geral de Depósitos
  "0036": "MPIOPTPL", // Banco Montepio
  "0045": "CCCMPTPL", // Crédito Agrícola
  "0061": "BDIGPTPL", // Banco BiG
  "0079": "BPNPPTPL", // EuroBic
  "0193": "CTTVPTPL", // Banco CTT
  "0269": "BKBKPTPL", // Bankinter
};

export function suggestBic(value: string): string | undefined {
  const iban = normalizeIban(value);
  if (!iban.startsWith("PT") || iban.length < 8) return undefined;
  return PT_BANK_BIC[iban.slice(4, 8)];
}
