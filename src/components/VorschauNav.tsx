'use client'

import React, { useState } from 'react'

const LINKS = [
  { href: '/#ueber', label: 'Über uns' },
  { href: '/#weine', label: 'Weine' },
  { href: '/#events', label: 'Events' },
  { href: '/#verleih', label: 'Verleih' },
]

// Navigation für die Detailseiten (Wein/Event). Links führen zurück zur
// Startseite und ihren Abschnitten.
export function VorschauNav() {
  const [offen, setOffen] = useState(false)

  return (
    <>
      <nav className="det-nav">
        <a href="/" className="det-nav-logo">
          Weinmacher <span>Mühltal</span>
        </a>
        <div className="det-nav-links">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} className="det-nav-link">
              {link.label}
            </a>
          ))}
          <a href="/#kontakt" className="det-nav-cta">
            Kontakt
          </a>
        </div>
        <button className="det-burger" aria-label="Menü" onClick={() => setOffen(true)}>
          <span />
          <span />
        </button>
      </nav>
      {offen && (
        <div className="det-overlay">
          <button
            className="det-overlay-close"
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
          <a href="/#kontakt" className="ist-kontakt" onClick={() => setOffen(false)}>
            Kontakt
          </a>
        </div>
      )}
    </>
  )
}
