import React from 'react'

import { Bild } from '@/components/Bild'
import { formatPreis, WEINART_LABELS, weinartIstBronze } from '@/lib/format'
import type { Weine } from '@/payload-types'

export function WeineSection({ weine }: { weine: Weine[] }) {
  return (
    <section id="weine" className="weine">
      <div className="weine-inner">
        <div data-reveal="" className="weine-kopf">
          <p className="kicker">Unsere Weine</p>
          <h2 className="section-titel">Aus dem Keller ins Glas</h2>
          <p className="section-sub">
            Weine, die zeigen, was das Mühltal kann. Abholung ab Hof oder Versand innerhalb
            Deutschlands.
          </p>
        </div>
        {weine.length === 0 ? (
          <p className="leer-hinweis" style={{ textAlign: 'center' }}>
            Unsere Weine werden gerade eingepflegt – schauen Sie bald wieder vorbei.
          </p>
        ) : (
          <div className="weine-grid">
            {weine.map((wein) => {
              const artLabel = WEINART_LABELS[wein.weinart] ?? ''
              const artZeile = [artLabel, wein.jahrgang].filter(Boolean).join(' · ')
              return (
                <article
                  key={wein.id}
                  data-reveal=""
                  className={`wein-karte${wein.ausverkauft ? ' ist-ausverkauft' : ''}`}
                >
                  {wein.ausverkauft && <span className="badge wein-badge">Ausverkauft</span>}
                  <div className="wein-bild bild-rahmen">
                    <Bild
                      media={wein.bild}
                      alt={wein.name}
                      sizes="(max-width: 860px) 100vw, 25vw"
                      contain
                    />
                  </div>
                  <div className="wein-body">
                    {artZeile && (
                      <p className={`wein-art${weinartIstBronze(wein.weinart) ? ' ist-bronze' : ''}`}>
                        {artZeile}
                      </p>
                    )}
                    <h3 className="wein-name">{wein.name}</h3>
                    {wein.rebsorte && <p className="wein-rebsorte">{wein.rebsorte}</p>}
                    {wein.beschreibung && <p className="wein-beschreibung">{wein.beschreibung}</p>}
                    {typeof wein.preis === 'number' && (
                      <p className="wein-preiszeile">
                        <span className="wein-preis">{formatPreis(wein.preis)}</span>
                        <span className="wein-einheit">
                          {wein.flaschengroesse || '0,75 l'} · inkl. MwSt.
                        </span>
                      </p>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
