import React from 'react'

import { Bild } from '@/components/Bild'
import { VERLEIH_KATEGORIE_LABELS } from '@/lib/format'
import type { Verleih } from '@/payload-types'

export function VerleihSection({ artikel, email }: { artikel: Verleih[]; email: string }) {
  return (
    <section id="verleih" className="verleih">
      <div className="verleih-inner">
        <div data-reveal="" className="verleih-kopf">
          <p className="kicker">Verleih</p>
          <h2 className="section-titel">Ausschankwagen &amp; Technik mieten</h2>
          <p className="section-sub">
            Für Vereinsfeste, Hochzeiten und Firmenfeiern: unsere Ausschankwagen und
            Veranstaltungstechnik – gepflegt, geprüft und auf Wunsch mit Lieferung.
          </p>
          {artikel.length === 0 && (
            <p className="leer-hinweis" style={{ marginTop: '24px' }}>
              Unser Verleih-Angebot wird gerade eingepflegt – Anfragen gerne jederzeit per E-Mail.
            </p>
          )}
        </div>
        {artikel.length > 0 && (
          <div className="verleih-grid">
            {artikel.map((item) => {
              const bild = Array.isArray(item.bilder) && item.bilder.length > 0 ? item.bilder[0] : null
              const verfuegbar = item.verfuegbar !== false
              return (
                <article key={item.id} data-reveal="" className="verleih-karte">
                  <div className="verleih-bild bild-rahmen">
                    <Bild media={bild} alt={item.name} sizes="(max-width: 860px) 100vw, 25vw" />
                  </div>
                  <div className="verleih-body">
                    {item.kategorie && (
                      <p className="verleih-kategorie">
                        {VERLEIH_KATEGORIE_LABELS[item.kategorie] ?? item.kategorie}
                      </p>
                    )}
                    <h3 className="verleih-name">{item.name}</h3>
                    {item.beschreibung && (
                      <p className="verleih-beschreibung">{item.beschreibung}</p>
                    )}
                    {item.preisInfo && <p className="verleih-preis">{item.preisInfo}</p>}
                    <p className={`verleih-status${verfuegbar ? '' : ' ist-anfrage'}`}>
                      <span className="punkt" />
                      {verfuegbar ? 'Verfügbar' : 'Auf Anfrage'}
                    </p>
                  </div>
                </article>
              )
            })}
          </div>
        )}
        <p data-reveal="" className="verleih-hinweis">
          Anfragen mit Wunschtermin an <a href={`mailto:${email}`}>{email}</a> – Abholung oder
          Lieferung nach Absprache.
        </p>
      </div>
    </section>
  )
}
