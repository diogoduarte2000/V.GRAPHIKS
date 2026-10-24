# V.GRAPHIKS

Portefólio do estúdio v.graphiks — Astro + Sanity CMS.

Site: https://v-graphiks.vercel.app

---

## Arrancar

```bash
npm install
npm run dev
```

Abre em http://localhost:4321.

**Funciona sem Sanity.** Enquanto não houver `.env`, o site usa o conteúdo de
`src/data/fallback.js` (o mesmo que estava escrito à mão no HTML antigo).
Dá para desenvolver e fazer deploy desde já.

---

## Ligar o Sanity

### 1. Criar o projeto

```bash
npx sanity@latest login
npx sanity@latest projects create
```

Guarda o **Project ID** que aparece no fim.

### 2. Configurar

```bash
cp .env.example .env
```

Preenche:

```
PUBLIC_SANITY_PROJECT_ID=o-teu-id
PUBLIC_SANITY_DATASET=production
```

### 3. Autorizar o domínio (CORS)

Em https://sanity.io/manage → o teu projeto → **API** → **CORS origins**, adiciona:

- `http://localhost:4321`
- `https://v-graphiks.vercel.app`

### 4. Abrir o Studio

```bash
npm run dev
```

O Studio fica em **http://localhost:4321/studio** (só aparece se houver `PUBLIC_SANITY_PROJECT_ID`).

### 5. Meter o conteúdo

No Studio tens três coisas:

| Documento | O que é | Quantos |
|---|---|---|
| **Definições do site** | Hero, textos do Sobre, estatísticas, contactos, SEO | 1, único |
| **Projetos** | Cada trabalho do portefólio | vários |
| **Serviços** | A lista do "O Que Fazemos" | vários |

Começa pelas **Definições do site**, depois os 4 serviços, depois os projetos.
Os textos exatos que estão hoje no site estão em `src/data/fallback.js` — é
copiar de lá.

Assim que o Sanity devolver conteúdo, o fallback deixa de ser usado. Quando
tiveres tudo migrado, podes apagar `src/data/fallback.js` e as imagens de
`public/images/`.

### 6. Deploy

Na Vercel, em **Settings → Environment Variables**, adiciona as duas variáveis
do `.env`. Sem isto o build em produção usa o fallback.

> **Nota:** o conteúdo é lido no **build**. Depois de editares no Studio, tens de
> fazer um novo deploy para as alterações aparecerem. Se quiseres que seja
> automático, cria um **webhook** no Sanity a apontar para um Deploy Hook da Vercel.

---

## Estrutura

```
src/
├── components/      secções da homepage (.astro)
├── layouts/
│   └── Base.astro   <head>, meta tags, JSON-LD
├── pages/
│   ├── index.astro
│   ├── 404.astro
│   └── projetos/[slug].astro   uma página por projeto
├── sanity/
│   ├── content.js   queries + fallback  ← a camada de dados
│   └── schemas/     project, service, siteSettings
├── scripts/main.js  GSAP, Lenis, cursor, preloader
├── styles/global.css
└── data/fallback.js conteúdo de arranque
```

## Comandos

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build estático para `dist/` |
| `npm run preview` | Pré-visualizar o build |
| `npm run studio` | Dev server + abre o Studio |
