'use client'

import React, { useEffect, useRef, useState } from 'react'

// Zählt beim Scrollen ins Bild von "from" auf "to" hoch (ease-out).
// Respektiert prefers-reduced-motion.
export function CountUp({
  to,
  from = 0,
  suffix = '',
  duration = 1600,
}: {
  to: number
  from?: number
  suffix?: string
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const [val, setVal] = useState(from)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVal(to)
      return
    }

    let started = false
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            started = true
            const start = performance.now()
            const tick = (now: number) => {
              const p = Math.min(1, (now - start) / duration)
              const eased = 1 - Math.pow(1 - p, 3)
              setVal(Math.round(from + (to - from) * eased))
              if (p < 1) requestAnimationFrame(tick)
            }
            requestAnimationFrame(tick)
            io.disconnect()
          }
        })
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [to, from, duration])

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  )
}
