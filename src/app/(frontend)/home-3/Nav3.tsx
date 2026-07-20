'use client'

import React, { useState } from 'react'

const LINKS = [
  { href: '#ueber', label: 'Über uns' },
  { href: '#weine', label: 'Weine' },
  { href: '#events', label: 'Events' },
  { href: '#verleih', label: 'Verleih' },
]

export function Nav3() {
  const [offen, setOffen] = useState(false)

  return (
    <>
      <nav className="v3-nav">
        <a href="#start" className="v3-nav-logo">
          Weinmacher Mühltal<span>.</span>
        </a>
        <div className="v3-nav-pill">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} className="v3-nav-link">
              {link.label}
            </a>
          ))}
          <a href="#kontakt" className="v3-nav-cta">
            Kontakt
          </a>
        </div>
        <button className="v3-burger" aria-label="Menü" onClick={() => setOffen(true)}>
          <span />
          <span />
        </button>
      </nav>
      {offen && (
        <div className="v3-overlay">
          <button
            className="v3-overlay-close"
            aria-label="Schließen"
            onClick={() => setOffen(false)}
          >
            ×
          </button>
          <p className="v3-overlay-label">Menü</p>
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOffen(false)}>
              {link.label}
            </a>
          ))}
          <a href="#kontakt" className="ist-kontakt" onClick={() => setOffen(false)}>
            Kontakt →
          </a>
        </div>
      )}
    </>
  )
}
