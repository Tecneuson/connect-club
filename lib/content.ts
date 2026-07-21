/* -----------------------------------------------------------------------------
   Connect Club — todo o texto e dados do site num só sítio (pt-PT).
   Baseado no briefing real: estúdio de treino personalizado no Porto.
----------------------------------------------------------------------------- */

export const brand = {
  name: "Connect Club",
  tagline: "Estúdio de treino personalizado",
  slogan: "5 pilares, 1 propósito",
  city: "Porto",
  address: "Edifício do Fluvial, Rua do Aleixo da Mota S/N, Porto",
  email: "geral@connectclub.pt",
  phoneDisplay: "+351 220 000 000",
  phone: "+351220000000",
  hours: [
    { day: "Segunda a sexta", time: "06h30 às 21h00" },
    { day: "Sábado", time: "08h00 às 14h00" },
    { day: "Domingo", time: "09h00 às 13h00" },
  ],
};

/** mailto pré-preenchido para marcar a avaliação física gratuita */
export const bookingHref = `mailto:${brand.email}?subject=${encodeURIComponent(
  "Avaliação física gratuita no Connect Club",
)}&body=${encodeURIComponent(
  "Olá! Gostava de marcar a minha avaliação física gratuita.\n\nNome:\nContacto:\nMelhor horário:",
)}`;

export const nav = [
  { label: "Pilares", href: "#pilares" },
  { label: "Método", href: "#metodo" },
  { label: "Planos", href: "#planos" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Dúvidas", href: "#duvidas" },
];

export const hero = {
  eyebrow: "Estúdio de treino personalizado · Porto",
  title: ["O teu treino,", "guiado por quem percebe."],
  subtitle:
    "No Connect Club tens um plano feito à tua medida e um personal a acompanhar-te de perto, com a liberdade de treinares também por tua conta. Personal training, hybrid, aulas de grupo, nutrição e massagem, num só estúdio.",
  stats: [
    { value: "5", label: "pilares num só estúdio" },
    { value: "2x", label: "treinos autónomos por semana" },
    { value: "0 €", label: "taxa de inscrição" },
  ],
};

export const pilares = {
  eyebrow: "5 pilares, 1 propósito",
  title: "Uma abordagem completa, num só estúdio.",
  subtitle:
    "Não é só treino. É saúde, performance e bem-estar tratados em conjunto, com acompanhamento próximo e uma comunidade que te puxa para a frente.",
  items: [
    {
      icon: "dumbbell",
      title: "Personal Training",
      text: "Sessões individuais com um treinador dedicado ao teu objetivo e ao teu ritmo.",
    },
    {
      icon: "hybrid",
      title: "Hybrid Training",
      text: "Força e condicionamento combinados para resultados mais completos.",
    },
    {
      icon: "group",
      title: "Aulas de Grupo",
      text: "Turmas reduzidas, energia de equipa e a mesma atenção ao detalhe.",
    },
    {
      icon: "nutrition",
      title: "Nutrição",
      text: "Orientação alimentar alinhada com o teu treino e a tua rotina.",
    },
    {
      icon: "massage",
      title: "Massagem",
      text: "Recuperação e bem-estar para treinares mais e melhor.",
    },
  ],
  highlight: {
    value: "2x / semana",
    label:
      "de treino autónomo incluído. Treina no teu tempo, sempre com o plano do teu personal.",
  },
};

export const method = {
  eyebrow: "Como funciona",
  title: "Simples, do primeiro dia aos resultados.",
  subtitle:
    "Sem burocracia. Marcas a tua avaliação gratuita e nós tratamos do resto.",
  steps: [
    {
      n: "01",
      title: "Avaliação física gratuita",
      text: "Bioimpedância, mobilidade e uma conversa sobre os teus objetivos. Sem compromisso.",
      image: "/images/coaching.jpg",
    },
    {
      n: "02",
      title: "Plano à tua medida",
      text: "Montamos o teu programa a pensar na tua idade, na rotina e no teu histórico.",
      image: "/images/feature-1.jpg",
    },
    {
      n: "03",
      title: "Treino acompanhado + autónomo",
      text: "Sessões com o teu personal e treinos autónomos por semana, sempre com o teu plano.",
      image: "/images/feature-3.jpg",
    },
    {
      n: "04",
      title: "Reavaliação e evolução",
      text: "Medimos os resultados e ajustamos a rota para continuares a evoluir.",
      image: "/images/feature-2.jpg",
    },
  ],
};

export const why = {
  eyebrow: "Porque funciona",
  title: "Resultados que ficam, ao teu ritmo.",
  subtitle:
    "Acompanhamento próximo, plano personalizado e a autonomia certa. É isto que faz a diferença, sobretudo se já tiveste experiências que não correram bem.",
  items: [
    {
      title: "Acompanhamento altamente individualizado",
      text: "Um treinador que sabe o teu nome, o teu histórico e o teu objetivo. Correção de técnica em cada sessão, para treinares em segurança.",
    },
    {
      title: "Autonomia sem perder o rumo",
      text: "Além das sessões com o personal, treinas por tua conta com o plano definido para ti. Mais consistência, mais resultados.",
    },
    {
      title: "Saúde, performance e longevidade",
      text: "Do emagrecimento à reabilitação, o foco é sentires-te melhor e viveres com mais qualidade, hoje e daqui a 20 anos.",
    },
    {
      title: "Uma comunidade forte e próxima",
      text: "Turmas reduzidas e um ambiente onde cada pessoa é acompanhada. Aqui não és mais um número.",
    },
  ],
  widget: {
    title: "Acompanhamento próximo",
    metric: "1:1",
    caption: "atenção real em cada treino",
    barLabel: "Evolução dos alunos",
  },
};

export const plans = [
  {
    slug: "pt-1x",
    envKey: "STRIPE_PRICE_PT_1X",
    name: "1x / semana",
    price: "142,80 €",
    period: "/mês",
    blurb: "Para manter a consistência.",
    highlight: false,
    features: [
      "1 sessão de personal training por semana",
      "+ 2 treinos autónomos por semana",
      "Avaliação física gratuita",
      "Plano de treino personalizado",
      "Acompanhamento pela app",
    ],
    cta: "Escolher 1x / semana",
  },
  {
    slug: "pt-2x",
    envKey: "STRIPE_PRICE_PT_2X",
    name: "2x / semana",
    price: "268,80 €",
    period: "/mês",
    blurb: "O equilíbrio perfeito. O preferido.",
    highlight: true,
    features: [
      "2 sessões de personal training por semana",
      "+ 2 treinos autónomos por semana",
      "Avaliação física a cada 8 semanas",
      "Plano de treino + orientação nutricional",
      "Prioridade na marcação",
    ],
    cta: "Escolher 2x / semana",
  },
  {
    slug: "pt-3x",
    envKey: "STRIPE_PRICE_PT_3X",
    name: "3x / semana",
    price: "378 €",
    period: "/mês",
    blurb: "Evolução ao máximo.",
    highlight: false,
    features: [
      "3 sessões de personal training por semana",
      "Treino autónomo livre",
      "Reavaliação mensal completa",
      "Plano de treino + nutrição + recuperação",
      "Prioridade máxima na agenda",
    ],
    cta: "Escolher 3x / semana",
  },
];

export type Plan = (typeof plans)[number];

export const plansNote =
  "Também tens aulas de grupo a partir de 27,20 €/mês. Descontos de família (10%) e Member Get Member (15%). Sem taxa de inscrição e sem fidelização.";

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
  title: "Tudo o que precisas de saber antes de começar.",
  ctaText:
    "Ainda com dúvidas? Marca a tua avaliação física gratuita e vem conhecer o estúdio, sem compromisso.",
  items: [
    {
      q: "Preciso de experiência para começar?",
      a: "Não. Muitos dos nossos alunos começaram do zero ou depois de anos parados. Como tens sempre um personal a acompanhar, aprendes a técnica correta desde o primeiro dia, ao teu ritmo.",
    },
    {
      q: "Posso treinar sozinho?",
      a: "Podes, e faz parte do método. Além das sessões com o teu personal, tens 2 treinos autónomos por semana, sempre a seguir o plano definido para ti. Mais consistência e mais autonomia.",
    },
    {
      q: "Que serviços estão incluídos?",
      a: "O Connect Club assenta em 5 pilares: personal training, hybrid training, aulas de grupo, nutrição e massagem. Uma abordagem completa de saúde, performance e bem-estar.",
    },
    {
      q: "Como começo?",
      a: "Marca a tua avaliação física gratuita. Fazemos bioimpedância e mobilidade, conversamos sobre os teus objetivos e mostramos-te o estúdio, tudo sem compromisso.",
    },
    {
      q: "Há fidelização ou taxa de inscrição?",
      a: "Não. Sem taxa de inscrição e sem fidelização. Cancela quando quiseres. Ainda temos descontos de família (10%) e Member Get Member (15%).",
    },
    {
      q: "Onde ficam e a que horas?",
      a: "Estamos no Edifício do Fluvial, Rua do Aleixo da Mota, no Porto. Horário: segunda a sexta das 06h30 às 21h00, sábado das 08h00 às 14h00 e domingo das 09h00 às 13h00.",
    },
  ],
};

export const finalCta = {
  eyebrow: "Vamos começar",
  title: "A tua avaliação gratuita pode ser esta semana.",
  subtitle:
    "Vem conhecer o estúdio e o método, sem compromisso. Ou escolhe já o teu plano e começa a treinar.",
  image: "/images/cta.jpg",
};

export const checkout = {
  back: "Voltar aos planos",
  heading: "Finalizar inscrição",
  intro: "Estás a um passo de começar. Confirma o plano e avança para o pagamento seguro.",
  summaryTitle: "Resumo da inscrição",
  emailLabel: "O teu email",
  emailPlaceholder: "nome@email.com",
  cta: "Ir para pagamento seguro",
  totalLabel: "Total hoje",
  secure: "Pagamento seguro processado pela Stripe",
  terms: "Sem fidelização · cancela quando quiseres · cobrança mensal",
  notConfigured:
    "Versão de demonstração: o pagamento com cartão fica ativo assim que a conta Stripe do Connect Club for ligada.",
  error: "Não foi possível iniciar o pagamento. Tenta novamente daqui a instantes.",
};
