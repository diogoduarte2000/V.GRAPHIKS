import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

const root = document.documentElement
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches

let lenis = null

/* ──────────────────────────────────────────────────────────
   PRELOADER
   Antes: o progresso era Math.random() num setInterval, não
   esperava por nada, e se o JS rebentasse o ecrã preto ficava
   para sempre. Agora segue o carregamento real das imagens e
   tem um teto de segurança de 4s.
   ────────────────────────────────────────────────────────── */
function runPreloader(onDone) {
  const preloader = document.getElementById('preloader')
  const barFill = document.querySelector('.preloader-bar-fill')
  if (!preloader || reduceMotion) {
    root.classList.remove('js-loading')
    if (preloader) preloader.remove()
    onDone()
    return
  }

  const images = Array.from(document.images)
  const total = images.length || 1
  let loaded = 0
  let finished = false

  const paint = () => {
    if (barFill) barFill.style.width = `${Math.round((loaded / total) * 100)}%`
  }

  const finish = () => {
    if (finished) return
    finished = true
    clearTimeout(safety)
    if (barFill) barFill.style.width = '100%'
    setTimeout(() => {
      preloader.classList.add('hidden')
      root.classList.remove('js-loading')
      preloader.addEventListener('transitionend', () => preloader.remove(), { once: true })
      onDone()
    }, 250)
  }

  const tick = () => {
    loaded += 1
    paint()
    if (loaded >= total) finish()
  }

  images.forEach((img) => {
    if (img.complete) tick()
    else {
      img.addEventListener('load', tick, { once: true })
      // uma imagem partida não pode prender o site
      img.addEventListener('error', tick, { once: true })
    }
  })
  paint()
  if (!images.length) finish()

  // Teto absoluto: aconteça o que acontecer, o site aparece.
  const safety = setTimeout(finish, 4000)
}

/* ──────────────────────────────────────────────────────────
   SMOOTH SCROLL
   Antes: Lenis e ScrollTrigger corriam em dois loops de
   requestAnimationFrame separados e não se falavam, o que dava
   jitter nos triggers. Agora o Lenis alimenta o ticker do GSAP.
   ────────────────────────────────────────────────────────── */
function initScroll() {
  if (reduceMotion) return

  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 2,
  })

  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => lenis.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)
}

/* ── Cursor custom ── */
function initCursor() {
  if (!finePointer || reduceMotion) return
  const cursor = document.getElementById('cursor')
  const follower = document.getElementById('cursor-follower')
  if (!cursor || !follower) return

  let mouseX = 0, mouseY = 0, cx = 0, cy = 0, fx = 0, fy = 0

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
  }, { passive: true })

  const loop = () => {
    cx += (mouseX - cx) * 0.35
    cy += (mouseY - cy) * 0.35
    fx += (mouseX - fx) * 0.15
    fy += (mouseY - fy) * 0.15
    // transform em vez de left/top: não força layout a cada frame
    cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`
    follower.style.transform = `translate3d(${fx}px, ${fy}px, 0) translate(-50%, -50%)`
    requestAnimationFrame(loop)
  }
  loop()

  document.querySelectorAll('a, button, .project-card, .service-item').forEach((el) => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'))
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'))
  })
}

/* ── Menu mobile ── */
function initMenu() {
  const hamburger = document.getElementById('hamburger')
  const mobileMenu = document.getElementById('mobile-menu')
  if (!hamburger || !mobileMenu) return

  const setOpen = (open) => {
    hamburger.classList.toggle('active', open)
    mobileMenu.classList.toggle('active', open)
    hamburger.setAttribute('aria-expanded', String(open))
    mobileMenu.setAttribute('aria-hidden', String(!open))
    if (lenis) open ? lenis.stop() : lenis.start()
    document.body.style.overflow = open ? 'hidden' : ''
  }

  hamburger.addEventListener('click', () =>
    setOpen(!hamburger.classList.contains('active'))
  )
  mobileMenu.querySelectorAll('a').forEach((link) =>
    link.addEventListener('click', () => setOpen(false))
  )
  // Escape fecha o menu — faltava
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && hamburger.classList.contains('active')) setOpen(false)
  })
}

/* ──────────────────────────────────────────────────────────
   SPLIT DE TEXTO
   Antes: a função criava um `wrapper` e um `temp`, usava o temp
   e deitava o wrapper fora (dead code), e o <br> só entrava no
   índice 0 — funcionava por acaso só para aquele H1.
   Agora percorre linhas e nós de forma genérica.
   ────────────────────────────────────────────────────────── */
function splitHeroTitle() {
  const title = document.querySelector('.hero h1')
  if (!title) return

  const lines = title.innerHTML.split(/<br\s*\/?>/i)
  const out = []

  lines.forEach((line) => {
    const holder = document.createElement('div')
    holder.innerHTML = line
    let html = ''

    Array.from(holder.childNodes).forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        html += node.textContent
          .split('')
          .map((ch) => (ch === ' ' ? ' ' : `<span class="char">${ch}</span>`))
          .join('')
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        // mantém a cor (highlight-yellow / highlight-red) char a char
        const cls = node.className ? ` ${node.className}` : ''
        html += node.textContent
          .split('')
          .map((ch) => (ch === ' ' ? ' ' : `<span class="char${cls}">${ch}</span>`))
          .join('')
      }
    })
    out.push(html)
  })

  title.innerHTML = out.join('<br>')
}

/* ── Animações ── */
function initAnimations() {
  if (reduceMotion) return

  const tl = gsap.timeline()
  tl.from('.char', { yPercent: 120, opacity: 0, duration: 1, stagger: 0.02, ease: 'power4.out', delay: 0.1 })
    .from('.hero-sub p', { y: 30, opacity: 0, duration: 1, ease: 'power3.out' }, '-=0.7')
    .from('.hero-meta', { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
    .from('.shape', { scale: 0, opacity: 0, duration: 1.5, stagger: 0.2, ease: 'elastic.out(1, 0.5)' }, '-=1.2')
    .from('.hero-scroll-indicator', { opacity: 0, y: 20, duration: 0.8 }, '-=0.5')

  // Reveals: fromTo em vez de from, para não haver flash do conteúdo
  // já visível antes de a animação arrancar.
  document.querySelectorAll('[data-reveal]').forEach((el) => {
    if (el.closest('.hero')) return
    gsap.fromTo(el,
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' },
      }
    )
  })

  const parallax = (sel, vars) => {
    if (!document.querySelector(sel)) return
    gsap.to(sel, {
      ...vars,
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
    })
  }
  parallax('.circle', { y: 120, x: -60 })
  parallax('.square', { y: -160, rotation: 45 })
  parallax('.triangle', { y: 80, x: 40, rotation: 20 })
}

/* ── Imagem flutuante nos serviços ── */
function initServiceHover() {
  if (!finePointer || reduceMotion) return
  const container = document.getElementById('service-hover-img')
  // guard que faltava: sem isto, mudar o HTML rebentava o script todo
  if (!container) return
  const image = container.querySelector('img')
  if (!image) return

  const setX = gsap.quickTo(container, 'x', { duration: 0.6, ease: 'power3.out' })
  const setY = gsap.quickTo(container, 'y', { duration: 0.6, ease: 'power3.out' })

  document.querySelectorAll('.service-item').forEach((item) => {
    const src = item.getAttribute('data-service-img')
    if (!src) return
    item.addEventListener('mouseenter', () => {
      image.src = src
      container.classList.add('active')
    })
    item.addEventListener('mouseleave', () => container.classList.remove('active'))
    item.addEventListener('mousemove', (e) => {
      setX(e.clientX + 20)
      setY(e.clientY - 200)
    }, { passive: true })
  })
}

/* ── Botões magnéticos ── */
function initMagnetic() {
  if (!finePointer || reduceMotion) return
  document.querySelectorAll('.scroll-cta, .action-btn').forEach((btn) => {
    const setX = gsap.quickTo(btn, 'x', { duration: 0.3, ease: 'power2.out' })
    const setY = gsap.quickTo(btn, 'y', { duration: 0.3, ease: 'power2.out' })
    btn.addEventListener('mousemove', (e) => {
      const r = btn.getBoundingClientRect()
      setX((e.clientX - r.left - r.width / 2) * 0.3)
      setY((e.clientY - r.top - r.height / 2) * 0.3)
    }, { passive: true })
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' })
    })
  })
}

/* ── Contadores ── */
function initCounters() {
  document.querySelectorAll('[data-count]').forEach((el) => {
    const target = parseInt(el.getAttribute('data-count'), 10)
    if (Number.isNaN(target)) return
    if (reduceMotion) { el.textContent = String(target); return }
    const obj = { v: 0 }
    gsap.to(obj, {
      v: target, duration: 2, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      onUpdate: () => { el.textContent = String(Math.round(obj.v)) },
    })
  })
}

/* ── Relógio ── */
function initClock() {
  const el = document.getElementById('clock')
  if (!el) return
  const tick = () => {
    const now = new Date()
    el.textContent = [now.getHours(), now.getMinutes(), now.getSeconds()]
      .map((n) => String(n).padStart(2, '0')).join(':')
  }
  tick()
  setInterval(tick, 1000)
}

/* ── Botão de email ── */
function initEmail() {
  const btn = document.getElementById('email-btn')
  if (!btn) return
  btn.addEventListener('click', () => {
    // email montado em runtime para não ficar em texto plano no HTML
    const email = btn.dataset.user + '@' + btn.dataset.domain
    const subject = encodeURIComponent('Consulta de Projeto — V.GRAPHIKS')
    const body = encodeURIComponent(
`Olá V.GRAPHIKS,

Gostaria de solicitar informações para um novo projeto.

Serviço pretendido:
[ Branding / Web Design / Social Media / Outro ]

Descrição do projeto:
[ Breve descrição do que necessita ]

Prazo pretendido:
[ Data ou tempo estimado ]

Obrigado!`)
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`
  })
}

/* ── Âncoras ── */
function initAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href')
      if (!id || id === '#') return
      const target = document.querySelector(id)
      if (!target) return
      e.preventDefault()
      if (lenis) lenis.scrollTo(target)
      else target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' })
    })
  })
}

/* ── Arranque ── */
root.classList.add('js-ready')
initScroll()
initCursor()
initMenu()
initClock()
initEmail()
initAnchors()
splitHeroTitle()

runPreloader(() => {
  initAnimations()
  initCounters()
  initMagnetic()
  initServiceHover()
  ScrollTrigger.refresh()
})
