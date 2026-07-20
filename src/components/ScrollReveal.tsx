'use client'

import { useEffect } from 'react'

// Scroll-Reveal exakt wie in der Designvorlage: Elemente mit [data-reveal]
// unterhalb des Folds starten unsichtbar/verschoben und blenden beim
// Erscheinen im Viewport ein. Sichtbare Elemente bleiben unangetastet.
export function ScrollReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            el.style.opacity = ''
            el.style.transform = 'none'
            io.unobserve(el)
          }
        })
      },
      { threshold: 0.12 },
    )
    els.forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return
      el.style.opacity = '0'
      el.style.transform = 'translateY(28px)'
      el.style.transition =
        'opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1)'
      io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  return null
}
