// Conteúdo de arranque: é o que estava escrito à mão no index.html antigo.
// Serve para o site funcionar sem Sanity configurado e como referência
// do que migrar para o Studio. Depois de o Sanity estar a servir conteúdo,
// este ficheiro deixa de ser usado (podes apagá-lo).

export const fallbackSettings = {
  siteTitle: 'V.GRAPHIKS | Design Que Fala',
  metaDescription:
    'Estúdio de Design Gráfico em Lisboa, especializado em branding, web design e soluções criativas com impacto visual duradouro.',
  heroLine1: 'Design',
  heroLine2a: 'Que',
  heroLine2b: 'Fala',
  heroSubtitle: 'Construímos marcas com soluções criativas e impacto visual duradouro.',
  location: 'Lisboa, Portugal',
  aboutHeading: 'Onde a Forma\nEncontra a Função',
  aboutLead:
    'A V.GRAPHIKS é um estúdio independente focado em elevar identidades visuais através de geometria precisa e cores audazes.',
  aboutBody:
    'Acreditamos que o bom design é a intersecção entre arte e estratégia. Cada projeto é uma oportunidade de contar uma história visual que conecta marcas com as suas audiências.',
  stats: [
    { value: 50, suffix: '+', label: 'Projetos\nEntregues' },
    { value: 30, suffix: '+', label: 'Clientes\nSatisfeitos' },
    { value: 3, suffix: '', label: 'Anos de\nExperiência' },
  ],
  marqueeText:
    'PORQUE PERDER MAIS TEMPO? ENTRE EM CONTACTO CONNOSCO PARA LEVAR A SUA EMPRESA AO PRÓXIMO NÍVEL',
  contactHeading: 'CONTACTE-NOS',
  contactBody:
    'Pronto para transformar a sua visão em realidade? A nossa equipa está disponível para ajudar no seu próximo grande passo.',
  phone: '+351 933 402 201',
  phoneRaw: '351933402201',
  email: 'v.graphikscorp@gmail.com',
  socials: [
    { label: 'Instagram', url: 'https://instagram.com/v.graphiks' },
    { label: 'Behance', url: 'https://behance.net/vgraphiks' },
  ],
  ogImage: null,
}

export const fallbackProjects = [
  {
    _id: 'fb-1', title: 'Identidade Bauhaus', slug: 'identidade-bauhaus', year: 2024,
    tags: ['Branding', 'Design Gráfico'], featured: true, order: 10,
    excerpt: 'Uma identidade visual inspirada no movimento Bauhaus, com formas geométricas primárias e tipografia bold.',
    coverUrl: '/images/project1.webp', coverAlt: 'Identidade visual Bauhaus com formas geométricas primárias',
    gallery: [],
  },
  {
    _id: 'fb-2', title: 'Linhas Orgânicas', slug: 'linhas-organicas', year: 2023,
    tags: ['Ilustração', 'Arte'], featured: false, order: 20,
    excerpt: 'Ilustração abstrata com linhas fluidas e paleta terrosa.',
    coverUrl: '/images/project2.webp', coverAlt: 'Ilustração abstrata com linhas fluidas e paleta terrosa',
    gallery: [],
  },
  {
    _id: 'fb-3', title: 'Surfari', slug: 'surfari', year: 2024,
    tags: ['Branding', 'Print'], featured: false, order: 30,
    excerpt: 'Branding completo para escola de surf — flyers, preçários e identidade visual.',
    coverUrl: '/images/surf1.webp', coverAlt: 'Materiais de branding da escola de surf Surfari',
    gallery: [],
  },
  {
    _id: 'fb-4', title: 'The Furnish', slug: 'the-furnish', year: 2024,
    tags: ['UI/UX', 'App Design'], featured: true, order: 40,
    excerpt: 'Design de interface para e-commerce de mobiliário com experiência de compra intuitiva.',
    coverUrl: '/images/app.webp', coverAlt: 'Ecrãs da aplicação de e-commerce de mobiliário The Furnish',
    gallery: [],
  },
  {
    _id: 'fb-5', title: 'Furniture Store', slug: 'furniture-store', year: 2023,
    tags: ['Web Design', 'E-commerce'], featured: false, order: 50,
    excerpt: 'Web design para loja online de mobiliário com catálogo interativo.',
    coverUrl: '/images/f1.webp', coverAlt: 'Página inicial da loja online de mobiliário',
    gallery: [],
  },
  {
    _id: 'fb-6', title: 'Surfari — Logotipos', slug: 'surfari-logotipos', year: 2024,
    tags: ['Logo Design', 'Branding'], featured: false, order: 60,
    excerpt: 'Conceitos de logotipos para a marca Surfari, explorando formas marinhas.',
    coverUrl: '/images/surf2.webp', coverAlt: 'Conceitos de logotipo da marca Surfari a preto e branco',
    gallery: [],
  },
]

export const fallbackServices = [
  {
    _id: 'fs-1', order: 1, title: 'Branding & Identidade',
    description: 'Criamos identidades visuais completas — do logotipo ao sistema de marca — que captam a essência do seu negócio.',
    hoverImageUrl: '/images/project1.webp',
  },
  {
    _id: 'fs-2', order: 2, title: 'Web Design',
    description: 'Websites modernos e responsivos que combinam estética premium com performance e usabilidade.',
    hoverImageUrl: '/images/app.webp',
  },
  {
    _id: 'fs-3', order: 3, title: 'Social Media',
    description: 'Conteúdo visual para redes sociais que reforça a presença da marca e gera engagement.',
    hoverImageUrl: '/images/surf1.webp',
  },
  {
    _id: 'fs-4', order: 4, title: 'Design Gráfico',
    description: 'Desde flyers e cartões de visita a packaging e ilustração — materiais gráficos de excelência.',
    hoverImageUrl: '/images/project2.webp',
  },
]
