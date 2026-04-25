// Render Markdown blocks (requires marked.js loaded via CDN)
if (typeof marked !== 'undefined') {
  document.querySelectorAll('[data-markdown]').forEach(el => {
    // get raw text, trim leading/trailing blank lines
    const raw = el.textContent.replace(/^\n+|\n+$/g, '')
    // dedent: find minimum indentation and strip it
    const lines = raw.split('\n')
    const indent = Math.min(...lines.filter(l => l.trim()).map(l => l.match(/^\s*/)[0].length))
    const dedented = lines.map(l => l.slice(indent)).join('\n')
    el.innerHTML = marked.parse(dedented)
  })
}

// Sidebar toggle
const sidebar = document.getElementById('sidebar')
const menuBtn = document.getElementById('menuBtn')
const sidebarClose = document.getElementById('sidebarClose')

if (menuBtn) menuBtn.addEventListener('click', () => sidebar.classList.toggle('open'))
if (sidebarClose) sidebarClose.addEventListener('click', () => sidebar.classList.remove('open'))

// Active nav link — multi-page: highlight by current page filename
const navLinks = document.querySelectorAll('.nav-link')
const currentPage = location.pathname.split('/').pop() || 'index.html'

navLinks.forEach(link => {
  const href = link.getAttribute('href')
  // Extract filename from href (handles paths like "pages/about.html", "../index.html", "about.html")
  const linkPage = href.split('/').pop()
  if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
    link.classList.add('active')
  } else {
    link.classList.remove('active')
  }
})

// Close sidebar on nav click (mobile)
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) sidebar.classList.remove('open')
  })
})

// Tab switching
document.querySelectorAll('.tab-header').forEach(header => {
  const tabs = header.closest('.example-tabs')
  const buttons = header.querySelectorAll('.tab-btn')
  const contents = tabs.querySelectorAll('.tab-content')

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab
      buttons.forEach(b => b.classList.remove('active'))
      contents.forEach(c => c.classList.remove('active'))
      btn.classList.add('active')
      const targetEl = document.getElementById(target)
      if (targetEl) targetEl.classList.add('active')
    })
  })
})

// Smooth reveal animation
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1'
      entry.target.style.transform = 'translateY(0)'
    }
  })
}, { threshold: 0.1 })

document.querySelectorAll('.feature-card, .mode-card, .advanced-item, .coding-step, .example-case, .resource-card, .faq-item, .rule-type-card, .bp-item, .recommend-card').forEach(el => {
  el.style.opacity = '0'
  el.style.transform = 'translateY(20px)'
  el.style.transition = 'opacity .5s ease, transform .5s ease'
  observer.observe(el)
})

// Lightbox — click thumbnail to view full-size image
function openLightbox(img) {
  if (!img || !img.src) return
  const overlay = document.createElement('div')
  overlay.className = 'lightbox-overlay'
  const fullImg = document.createElement('img')
  fullImg.src = img.src
  fullImg.alt = img.alt || ''
  overlay.appendChild(fullImg)
  document.body.appendChild(overlay)
  // trigger reflow then animate in
  requestAnimationFrame(() => overlay.classList.add('active'))
  overlay.addEventListener('click', () => {
    overlay.classList.remove('active')
    setTimeout(() => overlay.remove(), 300)
  })
  // close on Esc
  const onKey = (e) => { if (e.key === 'Escape') { overlay.click(); document.removeEventListener('keydown', onKey) } }
  document.addEventListener('keydown', onKey)
}

// Auto-bind all .screenshot images to open Lightbox on click
document.querySelectorAll('.screenshot').forEach(img => {
  img.style.cursor = 'zoom-in'
  img.addEventListener('click', () => openLightbox(img))
})
