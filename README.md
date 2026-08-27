# Connect Club — Landing Page

Página de alta conversão para o **Connect Club**, estúdio de treino 100% acompanhado por personal, com inscrição e mensalidade recorrente via **EuPago** (ou Stripe).

Stack: **Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · TypeScript**.

## Rodando localmente

```bash
npm install
npm run dev
# abre http://localhost:3000
```

Build de produção:

```bash
npm run build
npm start
```

## Pagamentos (inscrição)

O site cobra **mensalidades recorrentes** e suporta dois gateways. A escolha é
feita por variável de ambiente, sem tocar em código:

```bash
PAYMENT_PROVIDER=eupago   # predefinido
PAYMENT_PROVIDER=stripe   # alternativa
```

Sem chaves configuradas o site arranca em **modo demonstração**: o checkout
explica que o pagamento ainda não está ativo em vez de rebentar.

### EuPago (predefinido)

A EuPago suporta recorrência nativa. Usamos a **subscrição por cartão de
crédito**, que é o equivalente ao Checkout da Stripe:

1. `POST /v1.02/creditcard/subscription` cria a autorização e devolve um
   `redirectUrl`;
2. o cliente preenche o cartão nesse formulário seguro (com 3D Secure);
3. volta ao site em `/sucesso` (ou `/cancelado?estado=falha` se for recusado);
4. as mensalidades seguintes são cobradas automaticamente pela EuPago
   (`autoProcess: "1"`, `periodicity: "Mensal"`).

Configuração:

1. `cp .env.local.example .env.local`
2. No backoffice da EuPago, em **Canais → Listagem de canais**, copia a API Key
   para `EUPAGO_API_KEY`.
3. Mantém `EUPAGO_ENV=sandbox` até validares, depois passa a `production`.
4. Ainda em **Canais → editar canal**, ativa *"Receber notificação para um URL"*
   e aponta para:

   ```
   https://<dominio>/api/webhooks/eupago
   ```

5. Gera a chave de encriptação dos webhooks e põe-na em `EUPAGO_WEBHOOK_SECRET`.
   **Sem esta chave as notificações são aceites sem verificação de assinatura** —
   em produção é obrigatória.

Testar:

```bash
npm run eupago:smoke          # cria uma subscrição de 1 € no sandbox
npm run eupago:webhook-test   # simula uma notificação contra o site local
```

O `eupago:webhook-test` aceita `-- --plain` (JSON sem encriptação) e `-- --v1`
(o formato antigo, em query string). O endpoint aceita os três.

Cartões de teste: <https://eupago.readme.io/reference/test-cards>

**Débito Direto SEPA** fica preparado em `lib/payments/eupago/client.ts`
(`createDirectDebitAuthorization`). Tem comissão bem mais baixa que o cartão,
mas exige o IBAN do cliente no checkout, o que costuma baixar a conversão.

### Stripe (alternativa)

1. Cria 3 produtos **recorrentes (mensais)**, um por plano.
2. Preenche `STRIPE_SECRET_KEY` e `STRIPE_PRICE_PT_1X` / `_2X` / `_3X`.
3. Define `PAYMENT_PROVIDER=stripe`.

### Para onde vão os pagamentos confirmados

Não há base de dados. Os eventos normalizados passam todos por
`lib/payments/events.ts`, que os regista no log e — se definires
`PAYMENT_EVENT_WEBHOOK_URL` — os reencaminha em POST JSON para o teu n8n, Make,
Zapier ou folha de cálculo. É aí que se liga um CRM quando existir.

## Estrutura

```
app/
  layout.tsx            fontes (Space Grotesk + Inter), SEO
  page.tsx              montagem das seções
  globals.css           tokens de marca (cores/tipografia/botões)
  icon.svg              favicon (emblema)
  api/checkout/route.ts cria a subscrição no gateway ativo
  api/webhooks/eupago/  recebe as notificações de pagamento da EuPago
  sucesso/ · cancelado/ páginas de retorno do pagamento
components/             Header, Hero, Intro, Método, Why, Depoimentos, Planos, FAQ, CTA, Footer
lib/
  content.ts            TODO o texto e os planos (editar aqui)
  payments/
    types.ts            contrato comum aos gateways
    index.ts            resolve o gateway a partir de PAYMENT_PROVIDER
    display.ts          nome do gateway para a interface
    events.ts           onde aterram os pagamentos confirmados
    eupago/             cliente REST, provider e webhooks da EuPago
    stripe/             provider da Stripe
scripts/                testes de fumo da EuPago
public/images/          fotos (banco Magnific/Freepik) já otimizadas
public/logo-*.svg       versões do logo (claro/escuro) + emblema
```

## Onde editar o conteúdo

Praticamente todo o texto (headline, planos, preços, depoimentos, FAQ, contato,
redes sociais e WhatsApp) está centralizado em [`lib/content.ts`](lib/content.ts).

## Marca

- Cores: `#191919` (ink) · `#cdb18a` (dourado) · `#fff4eb` (creme), extraídas do logo.
- As imagens vêm do banco Magnific/Freepik e já estão redimensionadas para a web.
