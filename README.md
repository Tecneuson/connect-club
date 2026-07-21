# Connect Club — Landing Page

Página de alta conversão para o **Connect Club**, estúdio de treino 100% acompanhado por personal, com inscrição via **Stripe Checkout**.

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

## Configuração da Stripe (inscrição)

O checkout funciona em **modo demonstração** sem chaves (os botões caem para o WhatsApp).
Para ativar a cobrança real:

1. Copie o arquivo de exemplo:
   ```bash
   cp .env.local.example .env.local
   ```
2. Na Stripe, crie 3 produtos **recorrentes (mensais)** — um por plano — e copie o `price_...` de cada um.
3. Preencha o `.env.local`:
   - `STRIPE_SECRET_KEY` — chave secreta da conta
   - `STRIPE_PRICE_ESSENCIAL`, `STRIPE_PRICE_PERFORMANCE`, `STRIPE_PRICE_ILIMITADO`
   - `NEXT_PUBLIC_SITE_URL` — URL pública do site (produção)

O fluxo cria uma sessão de assinatura e redireciona para `/sucesso` ou `/cancelado`.

## Estrutura

```
app/
  layout.tsx            fontes (Space Grotesk + Inter), SEO
  page.tsx              montagem das seções
  globals.css           tokens de marca (cores/tipografia/botões)
  icon.svg              favicon (emblema)
  api/checkout/route.ts cria a sessão de Checkout da Stripe
  sucesso/ · cancelado/ páginas de retorno do pagamento
components/             Header, Hero, Intro, Método, Why, Depoimentos, Planos, FAQ, CTA, Footer
lib/
  content.ts            TODO o texto e os planos (editar aqui)
  stripe.ts             cliente Stripe (server)
public/images/          fotos (banco Magnific/Freepik) já otimizadas
public/logo-*.svg       versões do logo (claro/escuro) + emblema
```

## Onde editar o conteúdo

Praticamente todo o texto (headline, planos, preços, depoimentos, FAQ, contato,
redes sociais e WhatsApp) está centralizado em [`lib/content.ts`](lib/content.ts).

## Marca

- Cores: `#191919` (ink) · `#cdb18a` (dourado) · `#fff4eb` (creme), extraídas do logo.
- As imagens vêm do banco Magnific/Freepik e já estão redimensionadas para a web.
