'use client'

import React, { useState } from 'react'

const LINKS = [
  { href: '#ueber', label: 'Über uns' },
  { href: '#weine', label: 'Weine' },
  { href: '#events', label: 'Events' },
  { href: '#verleih', label: 'Verleih' },
]

export function Nav2() {
  const [offen, setOffen] = useState(false)

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
        <button className="v2-burger" aria-label="Menü" onClick={() => setOffen(true)}>
          <span />
          <span />
        </button>
      </nav>
      {offen && (
        <div className="v2-overlay">
          <button
            className="v2-overlay-close"
            aria-label="Schließen"
            onClick={() => setOffen(false)}
          >
            ×
          </button>
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOffen(false)}>
              {link.label}
            </a>
          ))}
          <a href="#kontakt" className="ist-kontakt" onClick={() => setOffen(false)}>
            Kontakt
          </a>
        </div>
      )}
    </>
  )
}
