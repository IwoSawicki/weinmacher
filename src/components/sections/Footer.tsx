import React from 'react'

import type { Kontakt } from '@/payload-types'

// Fallback-Inhalte, bis das Kontakt-Global gepflegt ist
const FALLBACK = {
  name: 'Nieder-Ramstädter Weinmacher',
  adresse: 'Griesbachweg 16\n64367 Mühltal',
  telefon: '06151 6795 768',
  email: 'koeth.weinbau@gmx.de',
}

export function Footer({ kontakt }: { kontakt: Kontakt }) {
  const name = kontakt.name || FALLBACK.name
  const adresse = [name, kontakt.adresse || FALLBACK.adresse].join('\n')
  const telefon = kontakt.telefon || FALLBACK.telefon
  const email = kontakt.email || FALLBACK.email

  return (
    <footer id="kontakt" className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div data-reveal="">
            <p className="kicker">Kontakt</p>
            <h2 className="footer-titel">Besuch uns im Mühltal.</h2>
            <p className="footer-adresse">{adresse}</p>
          </div>
          <div data-reveal="">
            <p className="footer-label">Erreichbarkeit</p>
            <p className="footer-kontaktdaten">
              {telefon && (
                <>
                  <a href={`tel:${telefon.replace(/[^\d+]/g, '')}`}>{telefon}</a>
                  <br />
                </>
              )}
              <a href={`mailto:${email}`}>{email}</a>
            </p>
            {(kontakt.instagram || kontakt.facebook) && (
              <div className="footer-social">
                {kontakt.instagram && (
                  <a href={kontakt.instagram} target="_blank" rel="noopener noreferrer">
                    Instagram
                  </a>
                )}
                {kontakt.facebook && (
                  <a href={kontakt.facebook} target="_blank" rel="noopener noreferrer">
                    Facebook
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} {name} · Genuss mit Verantwortung – ab 18 Jahren.
          </p>
          <div className="footer-rechtliches">
            <a href="/impressum">Impressum</a>
            <a href="/datenschutz">Datenschutz</a>
            <a href="https://stolz-marketing.de" target="_blank" rel="noopener noreferrer">
              Mit ❤️ von Stolz Marketing
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
