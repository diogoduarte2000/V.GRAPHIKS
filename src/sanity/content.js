/**
 * Camada de conteúdo.
 *
 * Se houver um projeto Sanity configurado no .env, vai buscar lá os dados.
 * Se não houver (ou se a query falhar), cai para src/data/fallback.js,
 * para que o site funcione sempre — em dev e em produção.
 *
 * Tudo isto corre no BUILD, não no browser. O HTML final é estático.
 */
import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { fallbackSettings, fallbackProjects, fallbackServices } from '../data/fallback.js'

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || 'production'

export const sanityEnabled = Boolean(projectId)

const client = sanityEnabled
  ? createClient({ projectId, dataset, apiVersion: '2024-10-01', useCdn: false })
  : null

const builder = client ? imageUrlBuilder(client) : null

/** Constrói um URL de imagem do Sanity com largura/qualidade definidas. */
export function img(source, width = 1200) {
  if (!builder || !source) return null
  return builder.image(source).width(width).auto('format').quality(80).url()
}

/** Corre uma query; se algo falhar, devolve o fallback em vez de rebentar o build. */
async function safeFetch(query, params, fallback, label) {
  if (!client) return fallback
  try {
    const result = await client.fetch(query, params)
    if (!result || (Array.isArray(result) && result.length === 0)) {
      console.warn(`[sanity] "${label}" não devolveu nada — a usar fallback.`)
      return fallback
    }
    return result
  } catch (err) {
    console.warn(`[sanity] falha em "${label}" (${err.message}) — a usar fallback.`)
    return fallback
  }
}

export async function getSettings() {
  const raw = await safeFetch(
    `*[_type == "siteSettings"][0]`, {}, null, 'settings'
  )
  if (!raw) return fallbackSettings
  // Mistura com o fallback para que um campo vazio no Studio não parta a página
  return {
    ...fallbackSettings,
    ...Object.fromEntries(Object.entries(raw).filter(([, v]) => v !== null && v !== undefined && v !== '')),
    ogImage: raw.ogImage ? img(raw.ogImage, 1200) : null,
  }
}

export async function getProjects() {
  const raw = await safeFetch(
    `*[_type == "project"] | order(order asc, year desc) {
      _id, title, "slug": slug.current, year, tags, excerpt, featured, order,
      cover, "coverAlt": cover.alt
    }`,
    {}, null, 'projects'
  )
  if (!raw) return fallbackProjects
  return raw.map((p) => ({
    ...p,
    coverUrl: img(p.cover, 1400),
    coverAlt: p.coverAlt || p.title,
  }))
}

export async function getProject(slug) {
  const raw = await safeFetch(
    `*[_type == "project" && slug.current == $slug][0] {
      _id, title, "slug": slug.current, year, tags, excerpt, client, body,
      cover, "coverAlt": cover.alt,
      gallery[]{ ..., "alt": alt }
    }`,
    { slug }, null, `project:${slug}`
  )
  if (!raw) return fallbackProjects.find((p) => p.slug === slug) || null
  return {
    ...raw,
    coverUrl: img(raw.cover, 1800),
    coverAlt: raw.coverAlt || raw.title,
    gallery: (raw.gallery || []).map((g) => ({ url: img(g, 1600), alt: g.alt || raw.title })),
  }
}

export async function getServices() {
  const raw = await safeFetch(
    `*[_type == "service"] | order(order asc) {
      _id, title, description, order, hoverImage
    }`,
    {}, null, 'services'
  )
  if (!raw) return fallbackServices
  return raw.map((s) => ({ ...s, hoverImageUrl: img(s.hoverImage, 800) }))
}
