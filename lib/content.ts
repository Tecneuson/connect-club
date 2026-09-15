/* -----------------------------------------------------------------------------
   Connect Club — todo o texto e dados do site num só sítio (pt-PT).
   Estúdio de treino personalizado no Porto.
----------------------------------------------------------------------------- */

export const brand = {
  name: "Connect Club",
  tagline: "Estúdio de treino personalizado",
  slogan: "5 pilares, 1 propósito",
  city: "Porto",
  address: "Edifício do Fluvial, Rua do Aleixo da Mota S/N, Porto",
  email: "connectclubhlp@gmail.com",
  phoneDisplay: "+351 220 000 000",
  phone: "+351220000000",
  hours: [
    { day: "Segunda a sexta", time: "06h30 às 21h00" },
    { day: "Sábado", time: "08h00 às 14h00" },
    { day: "Domingo", time: "09h00 às 13h00" },
  ],
};

/** Âncora para onde apontam os CTAs de inscrição */
export const signupHref = "#planos";

export const nav = [
  { label: "Pilares", href: "#pilares" },
  { label: "Método", href: "#metodo" },
  { label: "Espaço", href: "#espaco" },
  { label: "Planos", href: "#planos" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Dúvidas", href: "#duvidas" },
];

export const hero = {
  eyebrow: "Estúdio de treino personalizado · Porto",
  title: ["O teu treino,", "guiado por quem percebe."],
  subtitle:
    "Um plano à tua medida, um treinador sempre a puxar por ti e a liberdade de treinares sozinho quando quiseres. É isto que fazemos no Connect Club, no coração do Porto.",
  note: "Vagas limitadas. As turmas são reduzidas de propósito.",
  stats: [
    { value: "5", label: "pilares num só estúdio" },
    { value: "2x", label: "treinos autónomos por semana" },
    { value: "0 €", label: "taxa de inscrição" },
  ],
};

export type PillarSlug =
  | "personal-training"
  | "hybrid-training"
  | "aulas-de-grupo"
  | "nutricao"
  | "massagem";

/** Âncora que abre o preçário já no separador de um pilar. */
export const pricingHref = (slug: PillarSlug) => `#planos-${slug}`;

/** Um pilar do clube. `video` só existe nos pilares que já foram filmados. */
export type Pillar = {
  slug: PillarSlug;
  icon: string;
  title: string;
  text: string;
  image: string;
  video?: string;
  href: string;
};

/**
 * Cada pilar mostra a fotografia e, se houver vídeo, corre-o ao passar o rato.
 * Para os outros pilares ganharem o mesmo efeito do PT basta juntar o `video`.
 * Clicar abre o preçário desse pilar, e só desse.
 */
const pillarItems: Pillar[] = [
  {
    slug: "personal-training",
    icon: "dumbbell",
    title: "Personal Training",
    text: "Treino individual ou em grupo, com plano à tua medida e avaliação física inicial.",
    image: "/images/treino-halteres.jpg",
    video: "/videos/personal-training.mp4",
    href: pricingHref("personal-training"),
  },
  {
    slug: "hybrid-training",
    icon: "hybrid",
    title: "Hybrid Training",
    text: "Força e resistência na mesma sessão, para ganhares performance e superares limites.",
    image: "/images/treino-boxx.jpg",
    href: pricingHref("hybrid-training"),
  },
  {
    slug: "aulas-de-grupo",
    icon: "group",
    title: "Aulas de Grupo",
    text: "Yoga, Pilates, Local, Meditação e Circuito, em turmas até 12 pessoas.",
    image: "/images/sala-aulas.jpg",
    href: pricingHref("aulas-de-grupo"),
  },
  {
    slug: "nutricao",
    icon: "nutrition",
    title: "Nutrição",
    text: "Consultas para acertar a alimentação com o treino e ver resultados que ficam.",
    image: "/images/equipa-1.jpg",
    href: pricingHref("nutricao"),
  },
  {
    slug: "massagem",
    icon: "massage",
    title: "Massagem",
    text: "Terapêutica, relaxamento, desportiva, drenagem linfática e anti-celulite.",
    image: "/images/equipa-2.jpg",
    href: pricingHref("massagem"),
  },
];

export const pilares = {
  eyebrow: "5 pilares, 1 propósito",
  title: "Cinco pilares, um só estúdio.",
  subtitle:
    "Treino, nutrição e recuperação a trabalhar em conjunto, com uma equipa que sabe o teu nome e puxa por ti.",
  items: pillarItems,
  image: "/images/treino-boxx-wide-bw.jpg",
  highlight: {
    value: "2x / semana",
    label:
      "de treino autónomo incluído. Treina no teu tempo, sempre com o plano que o teu personal montou para ti.",
  },
};

export const method = {
  eyebrow: "O método",
  title: "Um método pensado para ti.",
  subtitle:
    "Mais do que treino: um serviço completo de saúde e bem-estar, montado à tua medida.",
  steps: [
    {
      n: "01",
      title: "Serviço 360º",
      text: "Integras na tua rotina diferentes componentes de saúde e bem-estar, tudo no mesmo sítio.",
      image: "/images/treino-pernas.jpg",
    },
    {
      n: "02",
      title: "Plano à tua medida",
      text: "Treino personalizado para os teus objetivos e para aquilo que te diverte.",
      image: "/images/treino-boxx-bw.jpg",
    },
    {
      n: "03",
      title: "Treino autónomo",
      text: "Treinar mais vezes traz melhores resultados. Aqui não dependes do PT nem precisas de outro ginásio para os treinos extra.",
      image: "/images/sala-cardio-34.jpg",
    },
    {
      n: "04",
      title: "Bem-estar",
      text: "Um espaço feito para a melhoria contínua do bem-estar de quem treina connosco.",
      image: "/images/equipa-1-alt.jpg",
    },
    {
      n: "05",
      title: "Dinâmico",
      text: "Cria a tua própria aula de grupo, com a modalidade e o horário à tua medida.",
      image: "/images/treino-pernas-bw.jpg",
    },
  ],
};

export const why = {
  eyebrow: "Porque funciona",
  title: "O que faz a diferença aqui.",
  image: "/images/treino-boxx-wide.jpg",
  subtitle:
    "Se já andaste noutros ginásios e não resultou, provavelmente o problema não eras tu. Era faltar alguém a acompanhar-te a sério.",
  items: [
    {
      title: "Alguém que te conhece mesmo",
      text: "Um treinador que sabe o teu nome, o teu histórico e para onde queres ir. Corrige-te em cada sessão, para treinares sem medo de te magoares.",
    },
    {
      title: "Autonomia sem perder o rumo",
      text: "Além das sessões com o personal, treinas por tua conta com o plano feito para ti. Mais consistência, mais resultados.",
    },
    {
      title: "Para te sentires bem hoje e daqui a 20 anos",
      text: "Do emagrecimento à reabilitação, o objetivo é sempre o mesmo: mais saúde e mais qualidade de vida.",
    },
    {
      title: "Aqui não és mais um número",
      text: "Turmas pequenas e um ambiente próximo, onde toda a gente é acompanhada e ninguém treina esquecido a um canto.",
    },
  ],
};

/* -----------------------------------------------------------------------------
   Preçário, organizado por pilar (tabela oficial do Connect Club).

   Cada serviço vende-se de duas formas:
     · mensalidade — débito automático todos os meses, sem fidelização;
     · pack        — pagamento único de um número fechado de sessões.
----------------------------------------------------------------------------- */

export type BillingKind = "mensal" | "pack";

type PriceOption = {
  /**
   * Junta-se ao slug do serviço para formar o slug da oferta (`pt-one-1x`).
   * Não mudar depois de publicado: vai dentro do identifier da EuPago.
   */
  id: string;
  name: string;
  amountEur: number;
  /** Meses entre cobranças numa mensalidade. 1 por omissão. */
  everyMonths?: number;
};

export type Service = {
  slug: string;
  name: string;
  blurb: string;
  features: string[];
  monthly: PriceOption[];
  packs: PriceOption[];
};

export type PricingPillar = {
  slug: PillarSlug;
  title: string;
  description: string;
  services: Service[];
};

export const pricing: PricingPillar[] = [
  {
    slug: "personal-training",
    title: "Personal Training",
    description:
      "Treino guiado do início ao fim: o teu personal monta o plano, corrige cada movimento e ajusta a carga à tua evolução. Sozinho ou em grupo.",
    services: [
      {
        slug: "pt-one",
        name: "PT Home One",
        blurb: "Sessões individuais, só tu e o teu treinador.",
        features: ["2 treinos autónomos por semana", "Avaliação física inicial"],
        monthly: [
          { id: "1x", name: "1x / semana", amountEur: 142.8 },
          { id: "2x", name: "2x / semana", amountEur: 268.8 },
          { id: "3x", name: "3x / semana", amountEur: 378 },
        ],
        packs: [
          { id: "pack10", name: "Pack 10 sessões", amountEur: 399 },
          { id: "pack20", name: "Pack 20 sessões", amountEur: 756 },
          { id: "pack30", name: "Pack 30 sessões", amountEur: 1071 },
        ],
      },
      {
        slug: "pt-group",
        name: "PT Home Group",
        blurb: "Personal training em grupo, com o mesmo acompanhamento.",
        features: ["Plano de treino personalizado", "10% de desconto nas Aulas de Grupo"],
        monthly: [
          { id: "1x", name: "1x / semana", amountEur: 83.3 },
          { id: "2x", name: "2x / semana", amountEur: 156.8 },
          { id: "3x", name: "3x / semana", amountEur: 220.5 },
        ],
        packs: [
          { id: "pack10", name: "Pack 10 sessões", amountEur: 232.75 },
          { id: "pack20", name: "Pack 20 sessões", amountEur: 441 },
          { id: "pack30", name: "Pack 30 sessões", amountEur: 624.75 },
        ],
      },
    ],
  },
  {
    slug: "hybrid-training",
    title: "Hybrid Training",
    description:
      "Força e cardio na mesma sessão, em treinos intensos e variados para ganhares resistência, potência e ires mais longe.",
    services: [
      {
        slug: "hybrid",
        name: "Hybrid Performance",
        blurb: "Treino de força e condicionamento, lado a lado.",
        features: ["Força e resistência", "Superação e performance"],
        monthly: [
          { id: "1x", name: "1x / semana", amountEur: 51 },
          { id: "2x", name: "2x / semana", amountEur: 96 },
          { id: "3x", name: "3x / semana", amountEur: 135 },
        ],
        packs: [
          { id: "pack10", name: "Pack 10 sessões", amountEur: 142.5 },
          { id: "pack20", name: "Pack 20 sessões", amountEur: 270 },
          { id: "pack30", name: "Pack 30 sessões", amountEur: 382.5 },
        ],
      },
    ],
  },
  {
    slug: "aulas-de-grupo",
    title: "Aulas de Grupo",
    description:
      "Turmas até 12 pessoas, do yoga e pilates ao circuito. Escolhes o registo do dia: energia e bem-estar, ou movimento e desafio.",
    services: [
      {
        slug: "aulas",
        name: "Aulas de Grupo",
        blurb: "Yoga, Local, Meditação, Pilates e Circuito.",
        features: ["Até 12 pessoas por aula", "Energia e bem-estar", "Movimento e desafio"],
        monthly: [
          { id: "1x", name: "1x / semana", amountEur: 27.2 },
          { id: "2x", name: "2x / semana", amountEur: 51.2 },
          { id: "3x", name: "3x / semana", amountEur: 72 },
        ],
        packs: [
          { id: "pack10", name: "Pack 10 aulas", amountEur: 76 },
          { id: "pack20", name: "Pack 20 aulas", amountEur: 144 },
          { id: "pack30", name: "Pack 30 aulas", amountEur: 204 },
        ],
      },
    ],
  },
  {
    slug: "nutricao",
    title: "Nutrição",
    description:
      "Consultas para acertares a alimentação com o teu treino, com um plano realista que cabe no teu dia a dia e resultados que ficam.",
    services: [
      {
        slug: "nutricao",
        name: "Nutrição",
        blurb: "Acompanhamento com nutricionista.",
        features: ["Alimentação", "Equilíbrio", "Resultados"],
        monthly: [
          { id: "1m", name: "1 consulta / mês", amountEur: 40 },
          { id: "2m", name: "1 consulta a cada 2 meses", amountEur: 42.5, everyMonths: 2 },
        ],
        packs: [
          { id: "pack3", name: "Pack 3 consultas", amountEur: 142.5 },
          { id: "pack6", name: "Pack 6 consultas", amountEur: 270 },
        ],
      },
    ],
  },
  {
    slug: "massagem",
    title: "Massagem",
    description:
      "Massagens para recuperares do treino e cuidares do corpo: terapêuticas, de relaxamento, anti-celulite, drenagem linfática e desportivas.",
    services: [
      {
        slug: "massagem",
        name: "Massagem",
        blurb: "Escolhes o tipo de massagem em cada sessão.",
        features: ["Terapêuticas", "Relaxamento", "Anti-celulite", "Drenagem linfática", "Desportivas"],
        monthly: [
          { id: "1x", name: "1x / mês", amountEur: 42.5 },
          { id: "2x", name: "2x / mês", amountEur: 80 },
          { id: "4x", name: "4x / mês", amountEur: 150 },
        ],
        packs: [
          { id: "pack5", name: "Pack 5 massagens", amountEur: 237.5 },
          { id: "pack10", name: "Pack 10 massagens", amountEur: 450 },
        ],
      },
    ],
  },
];

/**
 * "142,80 €". Formatado à mão, e não com Intl, para o servidor e o browser
 * escreverem exatamente o mesmo texto (senão a hidratação queixa-se).
 */
export function formatEur(value: number): string {
  return `${value.toFixed(2).replace(".", ",")} €`;
}

/** Uma opção concreta que se pode comprar: é o que chega ao checkout. */
export type Offer = {
  slug: string;
  kind: BillingKind;
  pillar: PillarSlug;
  pillarTitle: string;
  service: string;
  features: string[];
  name: string;
  amountEur: number;
  price: string;
  /** "/mês", "/2 meses" ou "" num pack. */
  period: string;
  everyMonths: number;
};

export const offers: Offer[] = pricing.flatMap((pillar) =>
  pillar.services.flatMap((service) =>
    (["mensal", "pack"] as const).flatMap((kind) =>
      (kind === "mensal" ? service.monthly : service.packs).map((option): Offer => {
        const everyMonths = kind === "mensal" ? option.everyMonths ?? 1 : 0;
        return {
          slug: `${service.slug}-${option.id}`,
          kind,
          pillar: pillar.slug,
          pillarTitle: pillar.title,
          service: service.name,
          features: service.features,
          name: option.name,
          amountEur: option.amountEur,
          price: formatEur(option.amountEur),
          period: kind === "pack" ? "" : everyMonths === 1 ? "/mês" : `/${everyMonths} meses`,
          everyMonths,
        };
      }),
    ),
  ),
);

/** Slugs da primeira versão do site, para links antigos continuarem a funcionar. */
const LEGACY_SLUGS: Record<string, string> = {
  "pt-1x": "pt-one-1x",
  "pt-2x": "pt-one-2x",
  "pt-3x": "pt-one-3x",
};

export function findOffer(slug: string | undefined): Offer | undefined {
  if (!slug) return undefined;
  const wanted = LEGACY_SLUGS[slug] ?? slug;
  return offers.find((o) => o.slug === wanted);
}

/** "PT Home One · 1x / semana" */
export function offerLabel(offer: Offer): string {
  return offer.service === offer.name ? offer.name : `${offer.service} · ${offer.name}`;
}

export const pricingSection = {
  eyebrow: "Preçário",
  title: "Escolhe o pilar e o teu ritmo.",
  subtitle:
    "Em cada serviço decides como pagar: mensalidade com débito automático e sem fidelização, ou um pack de sessões pago de uma só vez.",
};

export const billing: Record<BillingKind, { title: string; hint: string; cta: string }> = {
  mensal: { title: "Mensalidade", hint: "Débito direto todos os meses · sem fidelização", cta: "Aderir" },
  pack: { title: "Packs", hint: "Pagamento único · sem renovação automática", cta: "Comprar" },
};

/** Passos do fluxo de inscrição, mostrados na secção de planos */
export const signupSteps = [
  { n: "1", title: "Escolhe o serviço", text: "Mensalidade ou pack, como te der mais jeito." },
  { n: "2", title: "Paga online", text: "Pagamento seguro em menos de um minuto." },
  { n: "3", title: "Marca a tua sessão", text: "Agendamos contigo a primeira sessão." },
];

export const plansNote =
  "Descontos de família (10%) e Member Get Member (15%). Sem taxa de inscrição e sem fidelização.";

export const testimonials = [
  {
    quote:
      "Já tinha desistido de ginásios antes. Nunca me sentia acompanhada. Aqui é hora marcada, atenção total e um plano à minha medida. Aos 56, sinto-me melhor do que aos 40.",
    name: "Fernanda Costa",
    role: "Aluna há 7 meses",
    image: "/images/t2.jpg",
  },
  {
    quote:
      "Vim por causa de dores nas costas e fiquei pela energia. O acompanhamento é próximo e, nos dias sem sessão, treino sozinho com o meu plano. Faz toda a diferença.",
    name: "Joaquim Ferreira",
    role: "Aluno há 1 ano",
    image: "/images/t1.jpg",
  },
  {
    quote:
      "Entre o trabalho e a família não tinha tempo nem cabeça para treinar. O plano à medida e a liberdade dos treinos autónomos mudaram isso por completo.",
    name: "Ricardo Matos",
    role: "Aluno há 5 meses",
    image: "/images/t3.jpg",
  },
];

export const faq = {
  eyebrow: "Perguntas frequentes",
  title: "O que costumam perguntar antes de começar.",
  ctaText:
    "Ficou alguma dúvida? Escreve-nos ou passa pelo estúdio no Fluvial. Respondemos a tudo.",
  items: [
    {
      q: "Preciso de experiência para começar?",
      a: "Não. Muita gente começa do zero ou depois de anos parada. Como tens sempre um treinador ao lado, aprendes a fazer bem desde o primeiro dia, ao teu ritmo.",
    },
    {
      q: "Posso treinar sozinho?",
      a: "Podes, e faz parte do método. Além das sessões com o teu personal, tens 2 treinos autónomos por semana a seguir o plano definido para ti. Mais consistência e mais autonomia.",
    },
    {
      q: "Que serviços estão incluídos?",
      a: "São 5 pilares: personal training, hybrid training, aulas de grupo, nutrição e massagem. Tudo pensado para trabalhar em conjunto.",
    },
    {
      q: "Como começo?",
      a: "Escolhes o plano, tratas da inscrição online e marcamos a tua primeira sessão. No arranque fazemos uma avaliação para montar o teu plano. Simples assim.",
    },
    {
      q: "Há fidelização ou taxa de inscrição?",
      a: "Não. Sem taxa de inscrição e sem fidelização. Cancelas quando quiseres. E ainda temos descontos de família (10%) e Member Get Member (15%).",
    },
    {
      q: "Onde ficam e a que horas?",
      a: "Estamos no Edifício do Fluvial, na Rua do Aleixo da Mota, no Porto. Abrimos de segunda a sexta das 06h30 às 21h00, sábado das 08h00 às 14h00 e domingo das 09h00 às 13h00.",
    },
  ],
};

export const espaco = {
  eyebrow: "O espaço",
  title: "Vê onde vais treinar.",
  subtitle:
    "Estamos no Edifício do Fluvial, no Porto. Sala de musculação, zona de cardio e uma sala reservada só para as aulas de grupo.",
  /** A ordem importa: a 1.ª foto ocupa duas colunas e a 2.ª tem de ser vertical. */
  photos: [
    {
      src: "/images/sala-aulas-wide.jpg",
      alt: "Sala de aulas de grupo do Connect Club, com colchões no chão, espelho e luz natural",
    },
    {
      src: "/images/equipa-2-alt.jpg",
      alt: "Treinador do Connect Club em frente ao logótipo do clube",
    },
    {
      src: "/images/sala-cardio.jpg",
      alt: "Zona de cardio do Connect Club com bicicletas de ar e ski ergs",
    },
    {
      src: "/images/rack-halteres.jpg",
      alt: "Rack de halteres da sala de musculação do Connect Club",
    },
    {
      src: "/images/treino-boxx-wide2.jpg",
      alt: "Treinador do Connect Club a corrigir a postura de um aluno numa máquina de treino funcional",
    },
    {
      src: "/images/equipa-1-wide.jpg",
      alt: "Treinador do Connect Club em frente ao logótipo do clube",
    },
  ],
};

export const finalCta = {
  eyebrow: "Vamos a isto",
  title: "Começa a treinar já esta semana.",
  subtitle:
    "Escolhe o teu plano, marca a primeira sessão e aparece. As vagas são poucas e as turmas também.",
  image: "/images/estudio-geral.jpg",
};

export const checkout = {
  back: "Voltar ao preçário",
  heading: "Finalizar inscrição",
  intro: "Falta pouco. Confirma o serviço e escolhe como pagar.",
  summaryTitle: "Resumo da inscrição",
  emailLabel: "O teu email",
  emailPlaceholder: "nome@email.com",
  emailInvalid: "Indica um email válido.",
  cta: "Ir para pagamento seguro",
  totalLabel: { mensal: "Mensalidade", pack: "Total a pagar" },
  secure: "Pagamento seguro processado pela EuPago",
  terms: {
    mensal: "Sem fidelização · cancelas quando quiseres",
    pack: "Pagamento único · sem renovação automática",
  },
  included: {
    mensal: "Sem fidelização: cancelas quando quiseres",
    pack: "Pagas uma vez, sem renovações automáticas",
  },
  bimonthly: "Débito de 2 em 2 meses",
  methods: { debito: "Débito direto", cartao: "Cartão" },
  packNote: "Na página seguinte, da EuPago, escolhes o método de pagamento.",
  cardNote: "Na página seguinte, da EuPago, introduzes o cartão com 3D Secure.",
  debito: {
    nameLabel: "Nome do titular da conta",
    ibanLabel: "IBAN",
    ibanPlaceholder: "PT50 0000 0000 0000 0000 0000 0",
    bicLabel: "BIC / SWIFT",
    bicHint: "Preenchido sozinho para os principais bancos portugueses. Confirma que está certo.",
    consent:
      "Autorizo o Connect Club, através da EuPago, a debitar na minha conta o valor da mensalidade, e o meu banco a efetuar esses débitos. Posso pedir o reembolso de um débito ao meu banco nas 8 semanas seguintes.",
    cta: "Confirmar débito direto",
    note: "Recebes o mandato por email. O primeiro débito acontece daqui a poucos dias.",
    nameMissing: "Indica o nome do titular da conta.",
    ibanInvalid: "O IBAN não parece válido. Confirma os dígitos.",
    bicInvalid: "Indica o BIC/SWIFT do teu banco (8 ou 11 caracteres).",
    consentMissing: "Para avançar, confirma a autorização de débito direto.",
  },
  notConfigured:
    "Versão de demonstração: os pagamentos ficam ativos assim que a conta EuPago do Connect Club for ligada.",
  error: "Não foi possível iniciar o pagamento. Tenta novamente daqui a instantes.",
};
