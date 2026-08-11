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

export const pilares = {
  eyebrow: "5 pilares, 1 propósito",
  title: "Cinco pilares, um só estúdio.",
  subtitle:
    "Treino, nutrição e recuperação a trabalhar em conjunto, com uma equipa que sabe o teu nome e puxa por ti.",
  /**
   * Cada pilar mostra a imagem e, ao passar o rato, o vídeo (se existir em
   * /public/videos). Clicar leva à zona do plano correspondente (href).
   */
  items: [
    {
      icon: "dumbbell",
      title: "Personal Training",
      text: "Sessões individuais com um treinador dedicado ao teu objetivo e ao teu ritmo.",
      image: "/images/coaching.jpg",
      video: "/videos/personal-training.mp4",
      href: "#planos",
    },
    {
      icon: "hybrid",
      title: "Hybrid Training",
      text: "Força e condicionamento na mesma sessão, para um corpo mais completo.",
      image: "/images/feature-1.jpg",
      video: "/videos/hybrid-training.mp4",
      href: "#planos",
    },
    {
      icon: "group",
      title: "Aulas de Grupo",
      text: "Turmas pequenas, boa energia e a mesma atenção ao detalhe.",
      image: "/images/feature-3.jpg",
      video: "/videos/aulas-de-grupo.mp4",
      href: "#planos",
    },
    {
      icon: "nutrition",
      title: "Nutrição",
      text: "Orientação alimentar a puxar na mesma direção do teu treino.",
      image: "/images/feature-2.jpg",
      video: "/videos/nutricao.mp4",
      href: "#planos",
    },
    {
      icon: "massage",
      title: "Massagem",
      text: "Recuperação a sério, para aguentares o ritmo e treinares melhor.",
      image: "/images/why.jpg",
      video: "/videos/massagem.mp4",
      href: "#planos",
    },
  ],
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
      image: "/images/hero.jpg",
    },
    {
      n: "02",
      title: "Plano à tua medida",
      text: "Treino personalizado para os teus objetivos e para aquilo que te diverte.",
      image: "/images/feature-1.jpg",
    },
    {
      n: "03",
      title: "Treino autónomo",
      text: "Treinar mais vezes traz melhores resultados. Aqui não dependes do PT nem precisas de outro ginásio para os treinos extra.",
      image: "/images/feature-3.jpg",
    },
    {
      n: "04",
      title: "Bem-estar",
      text: "Um espaço feito para a melhoria contínua do bem-estar de quem treina connosco.",
      image: "/images/why.jpg",
    },
    {
      n: "05",
      title: "Dinâmico",
      text: "Cria a tua própria aula de grupo, com a modalidade e o horário à tua medida.",
      image: "/images/feature-2.jpg",
    },
  ],
};

export const why = {
  eyebrow: "Porque funciona",
  title: "O que faz a diferença aqui.",
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
      "Avaliação física incluída",
      "Plano de treino personalizado",
      "Acompanhamento pela app",
    ],
    cta: "Começar com 1x / semana",
  },
  {
    slug: "pt-2x",
    envKey: "STRIPE_PRICE_PT_2X",
    name: "2x / semana",
    price: "268,80 €",
    period: "/mês",
    blurb: "O equilíbrio perfeito. O mais escolhido.",
    highlight: true,
    features: [
      "2 sessões de personal training por semana",
      "+ 2 treinos autónomos por semana",
      "Avaliação física a cada 8 semanas",
      "Plano de treino e orientação nutricional",
      "Prioridade na marcação",
    ],
    cta: "Começar com 2x / semana",
  },
  {
    slug: "pt-3x",
    envKey: "STRIPE_PRICE_PT_3X",
    name: "3x / semana",
    price: "378 €",
    period: "/mês",
    blurb: "Para quem quer ir com tudo.",
    highlight: false,
    features: [
      "3 sessões de personal training por semana",
      "Treino autónomo livre",
      "Reavaliação mensal completa",
      "Plano de treino, nutrição e recuperação",
      "Prioridade máxima na agenda",
    ],
    cta: "Começar com 3x / semana",
  },
];

export type Plan = (typeof plans)[number];

/** Passos do fluxo de inscrição, mostrados na secção de planos */
export const signupSteps = [
  { n: "1", title: "Escolhe o plano", text: "O ritmo que encaixa na tua semana." },
  { n: "2", title: "Paga online", text: "Pagamento seguro em menos de um minuto." },
  { n: "3", title: "Marca a tua sessão", text: "Agendamos contigo a primeira avaliação." },
];

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

export const finalCta = {
  eyebrow: "Vamos a isto",
  title: "Começa a treinar já esta semana.",
  subtitle:
    "Escolhe o teu plano, marca a primeira sessão e aparece. As vagas são poucas e as turmas também.",
  image: "/images/cta.jpg",
};

export const checkout = {
  back: "Voltar aos planos",
  heading: "Finalizar inscrição",
  intro: "Falta pouco. Confirma o plano e avança para o pagamento seguro.",
  summaryTitle: "Resumo da inscrição",
  emailLabel: "O teu email",
  emailPlaceholder: "nome@email.com",
  cta: "Ir para pagamento seguro",
  totalLabel: "Total hoje",
  secure: "Pagamento seguro processado pela Stripe",
  terms: "Sem fidelização · cancelas quando quiseres · cobrança mensal",
  notConfigured:
    "Versão de demonstração: o pagamento com cartão fica ativo assim que a conta Stripe do Connect Club for ligada.",
  error: "Não foi possível iniciar o pagamento. Tenta novamente daqui a instantes.",
};
