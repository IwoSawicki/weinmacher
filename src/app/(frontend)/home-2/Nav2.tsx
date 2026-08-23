'use client'

import React, { useEffect, useState } from 'react'

const LINKS = [
  { href: '#ueber', label: 'Über uns' },
  { href: '#weine', label: 'Weine' },
  { href: '#events', label: 'Events' },
  { href: '#verleih', label: 'Verleih' },
]

export function Nav2({ logoUrl, logoAlt }: { logoUrl?: string; logoAlt?: string }) {
  const [offen, setOffen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = offen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [offen])

  const marke = logoUrl ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={logoUrl} alt={logoAlt || 'Nieder-Ramstädter Weinmacher'} className="v2-logo-img" />
  ) : (
    <>
      Nieder-Ramstädter <span>Weinmacher</span>
    </>
  )

  return (
    <>
      <nav className={`v2-nav${offen ? ' ist-offen' : ''}`}>
        <a href="#start" className="v2-nav-logo">
          {marke}
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

      <div
        className={`v2-menu${offen ? ' offen' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!offen}
      >
        <div className="v2-menu-top">
          <span className="v2-menu-logo">{marke}</span>
          <button className="v2-menu-close" aria-label="Menü schließen" onClick={() => setOffen(false)}>
            ×
          </button>
        </div>
        <div className="v2-menu-body">
          <p className="v2-menu-hallo">Schön, dass du da bist</p>
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
          <a href="#kontakt" className="v2-menu-cta" onClick={() => setOffen(false)}>
            Kontakt aufnehmen <span>↗</span>
          </a>
        </div>
      </div>
    </>
  )
}
