'use client'

import React, { useState } from 'react'

const LINKS = [
  { href: '#ueber', label: 'Über uns' },
  { href: '#weine', label: 'Weine' },
  { href: '#events', label: 'Events' },
  { href: '#verleih', label: 'Verleih' },
]

export function Nav() {
  const [offen, setOffen] = useState(false)

  return (
    <>
      <nav className="nav">
        <a href="#start" className="nav-logo">
          Weinmacher <span>Mühltal</span>
        </a>
        <div className="nav-links">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
          <a href="#kontakt" className="nav-cta">
            Kontakt
          </a>
        </div>
        <button
          className="nav-burger"
          aria-label="Menü"
          onClick={() => setOffen(true)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>
      {offen && (
        <div className="nav-overlay">
          <button
            className="nav-overlay-close"
            aria-label="Schließen"
            onClick={() => setOffen(false)}
          >
            ×
          </button>
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-overlay-link"
              onClick={() => setOffen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#kontakt"
            className="nav-overlay-link ist-kontakt"
            onClick={() => setOffen(false)}
          >
            Kontakt
          </a>
        </div>
      )}
    </>
  )
}
