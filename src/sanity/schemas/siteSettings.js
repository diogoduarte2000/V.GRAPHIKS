export default {
  name: 'siteSettings',
  title: 'Definições do site',
  type: 'document',
  // Documento único — não faz sentido ter dois
  __experimental_actions: ['update', 'publish'],
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'about', title: 'Sobre' },
    { name: 'contact', title: 'Contacto' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // ── Hero ──
    { name: 'heroLine1', title: 'Hero — linha 1', type: 'string', group: 'hero', initialValue: 'Design' },
    { name: 'heroLine2a', title: 'Hero — palavra amarela', type: 'string', group: 'hero', initialValue: 'Que' },
    { name: 'heroLine2b', title: 'Hero — palavra vermelha', type: 'string', group: 'hero', initialValue: 'Fala' },
    { name: 'heroSubtitle', title: 'Hero — subtítulo', type: 'text', rows: 2, group: 'hero' },
    { name: 'location', title: 'Localização', type: 'string', group: 'hero', initialValue: 'Lisboa, Portugal' },

    // ── Sobre ──
    { name: 'aboutHeading', title: 'Sobre — título', type: 'string', group: 'about' },
    { name: 'aboutLead', title: 'Sobre — parágrafo destacado', type: 'text', rows: 3, group: 'about' },
    { name: 'aboutBody', title: 'Sobre — parágrafo normal', type: 'text', rows: 4, group: 'about' },
    {
      name: 'stats', title: 'Estatísticas', type: 'array', group: 'about',
      validation: (R) => R.max(4),
      of: [{
        type: 'object',
        fields: [
          { name: 'value', title: 'Número', type: 'number', validation: (R) => R.required() },
          { name: 'suffix', title: 'Sufixo', type: 'string', description: 'Ex.: +' },
          { name: 'label', title: 'Legenda', type: 'string', validation: (R) => R.required() },
        ],
        preview: { select: { title: 'label', subtitle: 'value' } },
      }],
    },

    // ── Contacto ──
    { name: 'marqueeText', title: 'Texto do marquee', type: 'string', group: 'contact' },
    { name: 'contactHeading', title: 'Contacto — título', type: 'string', group: 'contact' },
    { name: 'contactBody', title: 'Contacto — texto', type: 'text', rows: 3, group: 'contact' },
    { name: 'phone', title: 'Telefone', type: 'string', group: 'contact', description: 'Formato apresentado, ex.: +351 933 402 201' },
    { name: 'phoneRaw', title: 'Telefone (só dígitos)', type: 'string', group: 'contact', description: 'Para os links tel: e WhatsApp, ex.: 351933402201' },
    { name: 'email', title: 'Email', type: 'string', group: 'contact', validation: (R) => R.email() },
    {
      name: 'socials', title: 'Redes sociais', type: 'array', group: 'contact',
      of: [{
        type: 'object',
        fields: [
          { name: 'label', title: 'Nome', type: 'string', validation: (R) => R.required() },
          { name: 'url', title: 'URL', type: 'url', validation: (R) => R.required() },
        ],
        preview: { select: { title: 'label', subtitle: 'url' } },
      }],
    },

    // ── SEO ──
    { name: 'siteTitle', title: 'Título do site', type: 'string', group: 'seo' },
    { name: 'metaDescription', title: 'Meta description', type: 'text', rows: 2, group: 'seo', validation: (R) => R.max(160) },
    {
      name: 'ogImage', title: 'Imagem de partilha (og:image)', type: 'image', group: 'seo',
      description: '1200x630 px. Se vazio, usa /og-image.jpg.',
    },
  ],
  preview: { prepare: () => ({ title: 'Definições do site' }) },
}
