# O que mudou nesta migração

## Arquitetura
- Vite vanilla → **Astro 7** (output estático)
- Conteúdo hardcoded no HTML → **Sanity CMS**, lido no build
- Adicionadas **páginas individuais de projeto** (`/projetos/<slug>`) — antes os
  cartões não eram clicáveis e não havia forma de ver um projeto
- Adicionada página **404**
- `sitemap-index.xml` e `robots.txt` gerados

## Performance
- Imagens PNG → **WebP**: 6,14 MB → 0,42 MB (**−93%**)
- Apagada a pasta `img/` (9,8 MB) — não era referenciada em lado nenhum
- Apagadas `f2`, `f3`, `f4` (não usadas) e o boilerplate em `src/assets/`
- Fontes passam a carregar no `<head>` com `preconnect` em vez de `@import` no CSS
- Site completo: **18 MB → 768 KB**

## Bugs corrigidos
| Era | Agora |
|---|---|
| Preloader com progresso `Math.random()` que não esperava por nada | Segue o carregamento real das imagens, com teto de segurança de 4s |
| Se o JS falhasse, o preloader tapava o site para sempre | Está escondido por omissão; só aparece se o JS arrancar |
| `document.body.style.overflow = ''` sem nunca ter sido `hidden` | Scroll bloqueado via classe `html.js-loading` |
| `cursor: none` global — sem JS ficavas sem cursor | Só com `html.js-ready` e em ponteiro fino |
| Lenis e ScrollTrigger em loops `rAF` separados | Lenis alimenta o ticker do GSAP (`lenis.on('scroll', ScrollTrigger.update)`) |
| `splitText()` criava um `wrapper` e ignorava-o (dead code); `<br>` só no índice 0 | Reescrita, percorre linhas e nós genericamente |
| `initServiceHover()` sem guard → crash se o HTML mudasse | Guards em `container` e `img` |
| `data-cursor-text="Ver"` no HTML que o JS nunca lia | Removido; os cartões são links a sério |
| Reveals com `.from()` → flash de conteúdo antes de animar | `.fromTo()` |
| Cursor animado com `left`/`top` → layout a cada frame | `transform: translate3d()` |
| Contador fazia parse do próprio `textContent` | Interpola um objeto e escreve o resultado |

## Acessibilidade
- `prefers-reduced-motion` respeitado (não existia): desliga parallax, marquee,
  magnetic buttons, cursor custom e reveals
- `html { font-size: 90% }` removido — anulava a preferência de tamanho de letra
- `100vh` → `100svh` (no mobile o 100vh contava a barra do browser)
- Skip link, `:focus-visible` em tudo, `aria-expanded`/`aria-controls` no menu,
  Escape fecha o menu
- Decorações marcadas `aria-hidden`
- `alt` obrigatório nas capas (validação no schema do Sanity)

## SEO
- **`og:image`** — faltava; as partilhas saíam sem imagem (ver `public/og-image.jpg`)
- Twitter card, `og:url`, `og:locale`, `og:site_name`
- `<link rel="canonical">`
- **JSON-LD `ProfessionalService`** com morada em Lisboa (não existia)
- `lang="pt-PT"` (era `pt`)
- Email montado em runtime em vez de estar em texto plano

## Por decidir (não mexi)
- Os números do Sobre (50+ projetos, 30+ clientes, 3 anos) ficaram como estavam
- O copy continua no plural ("Construímos", "a nossa equipa")
- Os anos dos projetos continuam 2023/2024
