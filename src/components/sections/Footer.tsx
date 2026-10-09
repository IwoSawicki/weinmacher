import React from 'react'

import { KONTAKT } from '@/lib/inhalte'

export function Footer() {
  const { name, adresse, telefon, email, instagram, facebook } = KONTAKT

  return (
    <footer id="kontakt" className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div data-reveal="">
            <p className="kicker">Kontakt</p>
            <h2 className="footer-titel">Besuch uns im Mühltal.</h2>
            <p className="footer-adresse">{[name, adresse].join('\n')}</p>
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
            {(instagram || facebook) && (
              <div className="footer-social">
                {instagram && (
                  <a href={instagram} target="_blank" rel="noopener noreferrer">
                    Instagram
                  </a>
                )}
                {facebook && (
                  <a href={facebook} target="_blank" rel="noopener noreferrer">
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
