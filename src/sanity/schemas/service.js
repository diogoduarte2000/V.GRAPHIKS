export default {
  name: 'service',
  title: 'Serviço',
  type: 'document',
  fields: [
    { name: 'title', title: 'Título', type: 'string', validation: (R) => R.required() },
    {
      name: 'description', title: 'Descrição', type: 'text', rows: 3,
      validation: (R) => R.required().max(300),
    },
    {
      name: 'hoverImage', title: 'Imagem de hover', type: 'image',
      description: 'Aparece a seguir ao cursor quando se passa por cima do serviço.',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Texto alternativo', type: 'string' }],
    },
    {
      name: 'order', title: 'Ordem', type: 'number',
      description: 'Define a numeração (01, 02, 03...) e a ordem na lista.',
      initialValue: 100,
      validation: (R) => R.required(),
    },
  ],
  orderings: [{ title: 'Ordem', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'title', subtitle: 'description', media: 'hoverImage' } },
}
