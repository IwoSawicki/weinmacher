'use client'

import React, { useEffect, useState } from 'react'

const LINKS = [
  { href: '#ueber', label: 'Über uns' },
  { href: '#weine', label: 'Weine' },
  { href: '#events', label: 'Events' },
  { href: '#verleih', label: 'Verleih' },
]

export function Nav2() {
  const [offen, setOffen] = useState(false)

  // Scrollen sperren, solange das Menü offen ist
  useEffect(() => {
    document.body.style.overflow = offen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [offen])

  return (
    <>
      <nav className="v2-nav">
        <a href="#start" className="v2-nav-logo">
          Weinmacher <span>Mühltal</span>
        </a>
        <div className="v2-nav-links">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} className="v2-nav-link">
              {link.label}
            </a>
          ))}
          <a href="#kontakt" className="v2-nav-cta">
            Kontakt
          </a>
        </div>
        <button
          className="v2-burger"
          aria-label="Menü öffnen"
          aria-expanded={offen}
          onClick={() => setOffen(true)}
        >
          <span />
          <span />
        </button>
      </nav>

      <div className={`v2-menu${offen ? ' offen' : ''}`} role="dialog" aria-modal="true" aria-hidden={!offen}>
        <button className="v2-menu-close" aria-label="Menü schließen" onClick={() => setOffen(false)}>
          ×
        </button>
        <p className="v2-menu-hallo">Hallo, schön, dass Sie hier sind.</p>
        <nav className="v2-menu-links">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOffen(false)}>
              {link.label}
            </a>
          ))}
          <a href="#kontakt" className="ist-kontakt" onClick={() => setOffen(false)}>
            Kontakt
          </a>
        </nav>
      </div>
    </>
  )
}
