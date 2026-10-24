import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/sanity/schemas'

export default defineConfig({
  name: 'vgraphiks',
  title: 'V.GRAPHIKS',
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Conteúdo')
          .items([
            // Documento único das definições, sem lista
            S.listItem()
              .title('Definições do site')
              .id('siteSettings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.divider(),
            S.documentTypeListItem('project').title('Projetos'),
            S.documentTypeListItem('service').title('Serviços'),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
})
