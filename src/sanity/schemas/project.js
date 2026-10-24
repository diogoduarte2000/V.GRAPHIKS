export default {
  name: 'project',
  title: 'Projeto',
  type: 'document',
  fields: [
    { name: 'title', title: 'Título', type: 'string', validation: (R) => R.required() },
    {
      name: 'slug', title: 'Slug (URL)', type: 'slug',
      description: 'O endereço da página: /projetos/<slug>',
      options: { source: 'title', maxLength: 96 },
      validation: (R) => R.required(),
    },
    { name: 'client', title: 'Cliente', type: 'string' },
    {
      name: 'year', title: 'Ano', type: 'number',
      validation: (R) => R.min(2000).max(2100).integer(),
    },
    {
      name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }],
      description: 'Ex.: Branding, Web Design, Ilustração',
      options: { layout: 'tags' },
    },
    {
      name: 'excerpt', title: 'Descrição curta', type: 'text', rows: 3,
      description: 'Aparece no cartão da grelha, na homepage. 1–2 frases.',
      validation: (R) => R.max(200),
    },
    {
      name: 'cover', title: 'Imagem de capa', type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Texto alternativo', type: 'string', validation: (R) => R.required() }],
      validation: (R) => R.required(),
    },
    {
      name: 'body', title: 'Descrição completa', type: 'array',
      of: [{ type: 'block' }],
      description: 'O texto da página do projeto.',
    },
    {
      name: 'gallery', title: 'Galeria', type: 'array',
      of: [{
        type: 'image',
        options: { hotspot: true },
        fields: [{ name: 'alt', title: 'Texto alternativo', type: 'string' }],
      }],
    },
    {
      name: 'featured', title: 'Destaque (cartão grande)', type: 'boolean',
      description: 'Ocupa duas colunas na grelha.',
      initialValue: false,
    },
    {
      name: 'order', title: 'Ordem', type: 'number',
      description: 'Número mais baixo aparece primeiro.',
      initialValue: 100,
    },
  ],
  orderings: [
    { title: 'Ordem manual', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
    { title: 'Ano (recente primeiro)', name: 'yearDesc', by: [{ field: 'year', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'title', subtitle: 'year', media: 'cover' },
  },
}
