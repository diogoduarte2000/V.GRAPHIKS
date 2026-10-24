import { defineConfig } from 'astro/config'
import { loadEnv } from 'vite'
import sanity from '@sanity/astro'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'

// astro.config corre antes de o Astro carregar o .env, por isso lemos à mão.
const env = loadEnv(process.env.NODE_ENV || 'development', process.cwd(), '')
const projectId = env.PUBLIC_SANITY_PROJECT_ID || ''
const dataset = env.PUBLIC_SANITY_DATASET || 'production'

// A integração do Sanity só entra se houver projectId. Sem isto, o build
// rebenta com "Configuration must contain projectId" e o site não compila
// enquanto não criares o projeto — queremos que compile desde o primeiro dia.
const sanityIntegration = projectId
  ? [sanity({
      projectId,
      dataset,
      apiVersion: '2024-10-01',
      useCdn: false,           // conteúdo fresco em cada build
      studioBasePath: '/studio',
    }), react()]
  : []

if (!projectId) {
  console.warn(
    '\n  [v.graphiks] Sem PUBLIC_SANITY_PROJECT_ID no .env.\n' +
    '  A usar o conteúdo de src/data/fallback.js. O Studio (/studio) está desligado.\n' +
    '  Ver README para ligar o Sanity.\n'
  )
}

export default defineConfig({
  site: 'https://v-graphiks.vercel.app',
  integrations: [...sanityIntegration, sitemap()],
})
