'use client'

import { useEffect } from 'react'

// Bündelt performante Scroll-Interaktionen in EINEM rAF-Listener:
//  - dünner Fortschrittsbalken oben
//  - dezenter Parallax-Effekt auf dem Hero-Bild
export function Interactions() {
  useEffect(() => {
    const bar = document.getElementById('scroll-progress')
    const heroImg = document.querySelector<HTMLElement>('.v2-hero-img img')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let ticking = false

    const update = () => {
      ticking = false
      const st = window.scrollY
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (bar) bar.style.transform = `scaleX(${max > 0 ? Math.min(1, st / max) : 0})`
      if (heroImg && !reduce) {
        const y = Math.min(st, window.innerHeight) * 0.14
        heroImg.style.transform = `translate3d(0, ${y}px, 0) scale(1.08)`
      }
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return <div id="scroll-progress" aria-hidden="true" />
}
