'use client'

import { useEffect } from 'react'

type ScrollRevealProps = {
  distance?: number
  duration?: number
  threshold?: number
}

// Scroll-Reveal exakt wie in der Designvorlage: Elemente mit [data-reveal]
// unterhalb des Folds starten unsichtbar/verschoben und blenden beim
// Erscheinen im Viewport ein. Sichtbare Elemente bleiben unangetastet.
// Die Parameter sind per Variante einstellbar (Default = home-1).
export function ScrollReveal({
  distance = 28,
  duration = 0.9,
  threshold = 0.12,
}: ScrollRevealProps = {}) {
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
      { threshold },
    )
    els.forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return
      el.style.opacity = '0'
      el.style.transform = `translateY(${distance}px)`
      el.style.transition = `opacity ${duration}s cubic-bezier(0.22,1,0.36,1), transform ${duration}s cubic-bezier(0.22,1,0.36,1)`
      io.observe(el)
    })
    return () => io.disconnect()
  }, [distance, duration, threshold])

  return null
}
