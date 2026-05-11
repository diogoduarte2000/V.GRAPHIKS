import './style.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'

gsap.registerPlugin(ScrollTrigger)

// ── Preloader ──
const preloader = document.getElementById('preloader')
const barFill = document.querySelector('.preloader-bar-fill')
let progress = 0

const preloadInterval = setInterval(() => {
  progress += Math.random() * 15 + 5
  if (progress >= 100) {
    progress = 100
    clearInterval(preloadInterval)
    setTimeout(() => {
      preloader.classList.add('hidden')
      document.body.style.overflow = ''
      initAll()
    }, 400)
  }
  barFill.style.width = `${progress}%`
}, 150)

// ── Custom Cursor ──
const cursor = document.getElementById('cursor')
const follower = document.getElementById('cursor-follower')
let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0, followerX = 0, followerY = 0

if (cursor && follower) {
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
  })

  const animateCursor = () => {
    cursorX += (mouseX - cursorX) * 0.35
    cursorY += (mouseY - cursorY) * 0.35
    followerX += (mouseX - followerX) * 0.15
    followerY += (mouseY - followerY) * 0.15

    cursor.style.left = `${cursorX}px`
    cursor.style.top = `${cursorY}px`
    follower.style.left = `${followerX}px`
    follower.style.top = `${followerY}px`

    requestAnimationFrame(animateCursor)
  }
  animateCursor()

  // Hover effects for interactive elements
  const hoverTargets = document.querySelectorAll('a, button, .project-card, .service-item')
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'))
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'))
  })
}

// ── Smooth Scroll (Lenis) ──
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

// ── Hamburger Menu ──
const hamburger = document.getElementById('hamburger')
const mobileMenu = document.getElementById('mobile-menu')

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active')
    mobileMenu.classList.toggle('active')
    if (mobileMenu.classList.contains('active')) {
      lenis.stop()
    } else {
      lenis.start()
    }
  })

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active')
      mobileMenu.classList.remove('active')
      lenis.start()
    })
  })
}

// ── Main Init ──
function initAll() {
  splitText()
  initAnimations()
  initCounters()
  initMagnetic()
  initServiceHover()
}

// ── Text Splitting ──
function splitText() {
  const heroTitle = document.querySelector('.hero h1')
  if (heroTitle) {
    const text = heroTitle.innerHTML
    // Split by <br> and spaces, but keep structure
    // This is a simplified version for this specific H1
    const parts = text.split('<br>')
    let newHTML = ''
    
    parts.forEach((part, index) => {
      const wrapper = document.createElement('div')
      wrapper.className = 'line-wrapper'
      
      // Handle the spans inside the second part
      const temp = document.createElement('div')
      temp.innerHTML = part
      
      const nodes = Array.from(temp.childNodes)
      nodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) {
          const chars = node.textContent.split('')
          chars.forEach(char => {
            if (char === ' ') {
              newHTML += ' '
            } else {
              newHTML += `<span class="char">${char}</span>`
            }
          })
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          const char = node.textContent
          const className = node.className
          newHTML += `<span class="char ${className}">${char}</span>`
        }
      })
      
      if (index === 0) newHTML += '<br>'
    })
    
    heroTitle.innerHTML = newHTML
  }
}

function initAnimations() {
  // Hero entrance
  const tl = gsap.timeline()
  
  // Animate characters
  tl.from('.char', {
    y: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.02,
    ease: 'power4.out',
    delay: 0.2
  })
  .from('.hero-sub p', { y: 30, opacity: 0, duration: 1, ease: 'power3.out' }, '-=0.7')
  .from('.hero-meta', { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
  .from('.shape', { scale: 0, opacity: 0, duration: 1.5, stagger: 0.2, ease: 'elastic.out(1, 0.5)' }, '-=1.2')
  .from('.hero-scroll-indicator', { opacity: 0, y: 20, duration: 0.8 }, '-=0.5')

  // Scroll reveals
  document.querySelectorAll('[data-reveal]').forEach(el => {
    if (el.closest('.hero')) return
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' },
      y: 50, opacity: 0, duration: 1, ease: 'power3.out'
    })
  })

  // Parallax shapes
  gsap.to('.circle', {
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
    y: 120, x: -60
  })
  gsap.to('.square', {
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
    y: -160, rotation: 45
  })
  gsap.to('.triangle', {
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
    y: 80, x: 40, rotation: 20
  })
}

// ── Service Hover Image ──
function initServiceHover() {
  const serviceItems = document.querySelectorAll('.service-item')
  const hoverContainer = document.getElementById('service-hover-img')
  const hoverImg = hoverContainer.querySelector('img')
  
  serviceItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      const imgSrc = item.getAttribute('data-service-img')
      hoverImg.src = imgSrc
      hoverContainer.classList.add('active')
    })
    
    item.addEventListener('mouseleave', () => {
      hoverContainer.classList.remove('active')
    })
    
    item.addEventListener('mousemove', (e) => {
      // Offset to follow cursor nicely
      gsap.to(hoverContainer, {
        x: e.clientX + 20,
        y: e.clientY - 200,
        duration: 0.6,
        ease: 'power3.out'
      })
    })
  })
}

// ── Magnetic Effect ──
function initMagnetic() {
  const magnets = document.querySelectorAll('.hamburger, .scroll-cta, .action-btn')
  
  magnets.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      
      gsap.to(btn, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: 'power2.out'
      })
    })
    
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)'
      })
    })
  })
}

// ── Counter Animation ──
function initCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.getAttribute('data-count'))
    gsap.to(el, {
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      duration: 2, ease: 'power2.out',
      textContent: target,
      snap: { textContent: 1 },
      onUpdate: function() {
        el.textContent = Math.round(parseFloat(el.textContent))
      }
    })
  })
}

// ── Digital Clock ──
const updateClock = () => {
  const clockEl = document.getElementById('clock')
  if (clockEl) {
    const now = new Date()
    clockEl.textContent = [now.getHours(), now.getMinutes(), now.getSeconds()]
      .map(n => String(n).padStart(2, '0')).join(':')
  }
}
setInterval(updateClock, 1000)
updateClock()

// ── Email Template ──
const emailBtn = document.getElementById('email-btn')
if (emailBtn) {
  emailBtn.addEventListener('click', () => {
    const email = 'v.graphikscorp@gmail.com'
    const subject = encodeURIComponent('Consulta de Projeto - V.GRAPHIKS')
    const body = encodeURIComponent(
`Olá V.GRAPHIKS,

Gostaria de solicitar informações para um novo projeto.

Serviço pretendido: 
[ Branding / Web Design / Social Media / Outro ]

Descrição do projeto:
[ Breve descrição do que necessita ]

Prazo pretendido:
[ Data ou tempo estimado ]

Obrigado!`
    )
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`
  })
}

// ── Smooth Scroll Links ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute('href'))
    if (target) lenis.scrollTo(target)
  })
})
