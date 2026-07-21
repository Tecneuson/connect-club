/* -----------------------------------------------------------------------------
   Connect Club — todo o texto e dados do site num só sítio (pt-PT).
----------------------------------------------------------------------------- */

export const brand = {
  name: "Connect Club",
  tagline: "Estúdio de treino assistido",
  phoneDisplay: "+351 210 000 000",
  phone: "+351210000000",
  email: "geral@connectclub.pt",
  address: "Rua do Movimento, 100 — Lisboa",
  instagram: "https://instagram.com/connectclub",
  social: [
    { label: "Instagram", href: "https://instagram.com/connectclub", icon: "instagram" as const },
    { label: "YouTube", href: "https://youtube.com/@connectclub", icon: "youtube" as const },
  ],
};

export const nav = [
  { label: "O estúdio", href: "#estudio" },
  { label: "Método", href: "#metodo" },
  { label: "Planos", href: "#planos" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Dúvidas", href: "#duvidas" },
];

export const hero = {
  eyebrow: "Estúdio de treino assistido",
  title: ["O teu treino,", "sempre com um personal ao teu lado."],
  subtitle:
    "No Connect Club nunca treinas sozinho. Cada sessão é conduzida por um personal trainer, com um plano feito para o teu corpo, a tua rotina e o teu objetivo.",
  stats: [
    { value: "1:1", label: "Acompanhamento real" },
    { value: "100%", label: "Sessões assistidas" },
    { value: "0 €", label: "Taxa de inscrição" },
  ],
};

export const intro = {
  eyebrow: "O estúdio",
  title: "Aqui, ninguém treina em piloto automático.",
  subtitle:
    "Esquece o ginásio cheio e o treino que não sabes se estás a fazer bem. No Connect Club, cada movimento é orientado por um profissional que sabe o teu nome e a tua meta.",
  cards: [
    {
      icon: "user-check",
      title: "Personal dedicado",
      text: "Um treinador ao teu lado do aquecimento ao alongamento — a corrigir, a motivar e a ajustar a carga.",
    },
    {
      icon: "clipboard",
      title: "Avaliação física",
      text: "Começamos por perceber o teu ponto de partida: composição corporal, mobilidade e histórico.",
    },
    {
      icon: "target",
      title: "Treino à tua medida",
      text: "Nada de planos genéricos. O programa é montado e revisto só para ti.",
    },
    {
      icon: "calendar",
      title: "Horário flexível",
      text: "Marca as tuas sessões nos horários que encaixam na tua rotina, com hora marcada.",
    },
  ],
  stat: {
    value: "92%",
    label: "dos alunos mantêm a frequência depois de 90 dias com acompanhamento individual.",
  },
};

export const method = {
  eyebrow: "O método Connect",
  title: "Como funciona treinar connosco.",
  subtitle:
    "Um processo simples e conduzido do início ao fim. Só precisas de aparecer — do resto tratamos nós.",
  steps: [
    {
      n: "01",
      title: "Avaliação inicial",
      text: "Bioimpedância, mobilidade e uma conversa franca sobre onde queres chegar.",
      image: "/images/coaching.jpg",
    },
    {
      n: "02",
      title: "Plano à tua medida",
      text: "Montamos o teu programa de treino a pensar no objetivo, na rotina e nas limitações.",
      image: "/images/feature-1.jpg",
    },
    {
      n: "03",
      title: "Treino assistido",
      text: "Todas as sessões com um personal ao lado, a garantir técnica e progressão.",
      image: "/images/feature-3.jpg",
    },
    {
      n: "04",
      title: "Reavaliação",
      text: "Em cada ciclo medimos a evolução e ajustamos a rota para não estagnares.",
      image: "/images/feature-2.jpg",
    },
  ],
};

export const why = {
  eyebrow: "Porque funciona",
  title: "Resultado não é sorte. É acompanhamento.",
  subtitle:
    "A diferença de treinar assistido nota-se na constância, na técnica e na motivação que não te deixa desistir à terceira semana.",
  items: [
    {
      title: "Fazes o exercício certo, da forma certa",
      text: "A correção de técnica em tempo real reduz o risco de lesão e acelera os ganhos.",
    },
    {
      title: "Progressão que respeita o teu corpo",
      text: "A carga sobe quando estás preparado — nem antes, nem depois. É isso que gera evolução contínua.",
    },
    {
      title: "Constância que se sustenta",
      text: "Hora marcada e alguém à tua espera: a presença deixa de depender só da força de vontade.",
    },
    {
      title: "Motivação a sério",
      text: "Um profissional que celebra cada conquista e ajusta o plano quando a vida aperta.",
    },
  ],
  widget: {
    title: "Frequência dos alunos",
    metric: "3,4x",
    caption: "por semana, em média",
    barLabel: "Frequência semanal",
  },
};

export const plans = [
  {
    slug: "essencial",
    envKey: "STRIPE_PRICE_ESSENCIAL",
    name: "Essencial",
    price: "149 €",
    period: "/mês",
    blurb: "Para começar com consistência.",
    highlight: false,
    features: [
      "2 sessões assistidas por semana",
      "Avaliação física inicial",
      "Plano de treino personalizado",
      "Acompanhamento pela app",
    ],
    cta: "Escolher o Essencial",
  },
  {
    slug: "performance",
    envKey: "STRIPE_PRICE_PERFORMANCE",
    name: "Performance",
    price: "149 €",
    period: "/mês",
    blurb: "O preferido de quem quer evoluir a sério.",
    highlight: true,
    features: [
      "3 sessões assistidas por semana",
      "Avaliação física a cada 8 semanas",
      "Plano de treino + orientação nutricional",
      "Prioridade na marcação",
      "Acompanhamento pela app",
    ],
    cta: "Escolher o Performance",
  },
  {
    slug: "ilimitado",
    envKey: "STRIPE_PRICE_ILIMITADO",
    name: "Ilimitado",
    price: "149 €",
    period: "/mês",
    blurb: "Treino livre, sempre acompanhado.",
    highlight: false,
    features: [
      "Sessões assistidas ilimitadas",
      "Reavaliação mensal completa",
      "Plano de treino + nutrição + recuperação",
      "Agenda prioritária e flexível",
      "Apoio direto com o teu personal",
    ],
    cta: "Escolher o Ilimitado",
  },
];

export type Plan = (typeof plans)[number];

export const testimonials = [
  {
    quote:
      "Nunca consegui manter uma rotina de treino até vir para o Connect. Ter alguém à minha espera e a corrigir cada exercício mudou tudo. Em 4 meses perdi 9 kg e ganhei confiança.",
    name: "Marina Alves",
    role: "Aluna há 6 meses",
    image: "/images/t2.jpg",
  },
  {
    quote:
      "O acompanhamento é de outro nível. O meu personal ajusta o treino conforme o meu dia, a lesão no ombro desapareceu e hoje levanto cargas que não imaginava.",
    name: "Rafael Nogueira",
    role: "Aluno há 1 ano",
    image: "/images/t1.jpg",
  },
  {
    quote:
      "Sou ocupado e detestava ginásios cheios. Aqui é hora marcada, atenção total e evolução real. Passou a ser a melhor parte do meu dia.",
    name: "Diego Santos",
    role: "Aluno há 8 meses",
    image: "/images/t3.jpg",
  },
];

export const faq = {
  eyebrow: "Perguntas frequentes",
  title: "Tudo o que precisas de saber antes de começar.",
  ctaText: "Ainda com dúvidas? Fala connosco e marca uma visita ao estúdio.",
  items: [
    {
      q: "Preciso de já treinar ou ter experiência?",
      a: "Não. A maioria dos nossos alunos começou do zero. Como cada sessão é acompanhada por um personal, aprendes a técnica correta desde o primeiro dia, ao teu ritmo.",
    },
    {
      q: "O treino é individual ou em grupo?",
      a: "O treino é sempre assistido por um personal trainer. Trabalhamos em formato individual e em pequenos grupos supervisionados, garantindo atenção e correção a todos.",
    },
    {
      q: "Como funciona a inscrição e o pagamento?",
      a: "A inscrição é 100% online e segura, processada pela Stripe. Escolhes o plano, preenches os teus dados e ficas logo com acesso para marcar a primeira sessão.",
    },
    {
      q: "Posso cancelar quando quiser?",
      a: "Sim. Os planos são mensais e sem fidelização. Podes pausar ou cancelar a qualquer momento, sem penalizações.",
    },
    {
      q: "Como marco as minhas sessões?",
      a: "Depois de te inscreveres, marcas pela app nos horários disponíveis. Tudo com hora marcada para nunca apanhares fila nem máquinas ocupadas.",
    },
    {
      q: "Tenho avaliação física incluída?",
      a: "Sim. Todos os planos incluem avaliação física inicial. Nos planos Performance e Ilimitado, as reavaliações são mais frequentes para acompanhar a tua evolução de perto.",
    },
  ],
};

export const finalCta = {
  eyebrow: "Vamos começar",
  title: "A tua primeira sessão pode ser esta semana.",
  subtitle:
    "Escolhe o teu plano e começa hoje. Inscrição 100% online e segura, sem fidelização e com o acompanhamento sempre incluído.",
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
    "Os pagamentos ainda não estão ativos neste ambiente. Configura as chaves da Stripe em .env.local para ativar a compra.",
  error: "Não foi possível iniciar o pagamento. Tenta novamente daqui a instantes.",
};
