import React from 'react'

import type { Kontakt } from '@/payload-types'

// Fallback-Inhalte aus der Designvorlage, bis das Kontakt-Global gepflegt ist
const FALLBACK = {
  name: 'Weinmacher Mühltal',
  adresse: 'Mühltal',
  telefon: '',
  email: 'hallo@weinmacher-muehltal.de',
  zeiten: [
    ['Mi – Fr', '15 – 19 Uhr'],
    ['Samstag', '10 – 18 Uhr'],
    ['Sonntag', '11 – 17 Uhr'],
    ['Mo & Di', 'geschlossen'],
  ] as Array<[string, string]>,
}

export function Footer({ kontakt }: { kontakt: Kontakt }) {
  const name = kontakt.name || FALLBACK.name
  const adresse = [name, kontakt.adresse || FALLBACK.adresse].join('\n')
  const telefon = kontakt.telefon || FALLBACK.telefon
  const email = kontakt.email || FALLBACK.email

  // Öffnungszeiten: eine Zeile pro Eintrag, optional „links | rechts“
  const zeiten: Array<[string, string] | [string]> = kontakt.oeffnungszeiten
    ? kontakt.oeffnungszeiten
        .split('\n')
        .map((zeile) => zeile.trim())
        .filter(Boolean)
        .map((zeile) => {
          const teile = zeile.split('|').map((t) => t.trim())
          return teile.length >= 2 ? [teile[0], teile.slice(1).join(' ')] : [zeile]
        })
    : FALLBACK.zeiten

  return (
    <footer id="kontakt" className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div data-reveal="">
            <p className="kicker">Kontakt</p>
            <h2 className="footer-titel">Besuchen Sie uns im Mühltal.</h2>
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
          <div data-reveal="">
            <p className="footer-label">Hofverkauf &amp; Vinothek</p>
            <div className="footer-zeiten">
              {zeiten.map((eintrag, i) =>
                eintrag.length === 2 ? (
                  <p
                    key={i}
                    className="zeile"
                    style={
                      eintrag[1].toLowerCase().includes('geschlossen')
                        ? { color: 'rgba(250, 248, 245, 0.45)' }
                        : undefined
                    }
                  >
                    <span>{eintrag[0]}</span>
                    <span>{eintrag[1]}</span>
                  </p>
                ) : (
                  <p key={i}>{eintrag[0]}</p>
                ),
              )}
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} {name} · Genuss mit Verantwortung – ab 18 Jahren.
          </p>
          <div className="footer-rechtliches">
            <a href="/impressum">Impressum</a>
            <a href="/datenschutz">Datenschutz</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
