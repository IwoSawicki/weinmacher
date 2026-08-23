import type { Metadata } from 'next'
import { getPayload } from 'payload'
import React from 'react'

import { Bild } from '@/components/Bild'
import { Footer } from '@/components/sections/Footer'
import { VorschauNav } from '@/components/VorschauNav'
import { formatPreis, WEINART_LABELS, weinartIstBronze } from '@/lib/format'
import config from '@/payload.config'
import type { Weine } from '@/payload-types'

import '../detail.css'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Wein – Vorschau | Nieder-Ramstädter Weinmacher',
  robots: { index: false, follow: false },
}

// Demo-Wein, falls im CMS noch keiner gepflegt ist – damit die Vorschau
// immer etwas zeigt.
const DEMO_WEIN: Partial<Weine> = {
  name: 'Bartholomäus',
  weinart: 'weisswein',
  rebsorte: 'Cabernet Blanc',
  beschreibung:
    'Unser Weißwein aus der Rebsorte Cabernet Blanc – frisch, klar und angenehm unkompliziert. Ein Wein, der das Frankensteiner Land im Glas erzählt.',
  flaschengroesse: '0,75 l',
  ausverkauft: false,
}

export default async function WeinVorschauPage() {
  const payload = await getPayload({ config: await config })

  const [weinResult, kontakt] = await Promise.all([
    payload.find({ collection: 'weine', sort: '_order', limit: 1 }),
    payload.findGlobal({ slug: 'kontakt' }),
  ])

  const wein = (weinResult.docs[0] as Weine | undefined) ?? (DEMO_WEIN as Weine)
  const email = kontakt.email || 'koeth.weinbau@gmx.de'

  const artLabel = WEINART_LABELS[wein.weinart] ?? ''
  const artZeile = artLabel
  const istBronze = weinartIstBronze(wein.weinart)

  const fakten: Array<[string, string]> = [
    artLabel ? ['Weinart', artLabel] : null,
    wein.rebsorte ? ['Rebsorte', wein.rebsorte] : null,
    ['Flaschengröße', wein.flaschengroesse || '0,75 l'],
  ].filter(Boolean) as Array<[string, string]>

  const bestellBetreff = encodeURIComponent(`Weinanfrage: ${wein.name}`)

  return (
    <div className="det">
      <VorschauNav />

      <div className="det-wrap">
        <a href="/#weine" className="det-back">
          ← Alle Weine
        </a>

        <div className="det-split">
          {/* Flaschenbild */}
          <div className="det-media hoch">
            {wein.bild ? (
              <Bild media={wein.bild} alt={wein.name} size="hero" sizes="(max-width: 860px) 100vw, 45vw" priority />
            ) : (
              <div className="ph" aria-hidden="true">
                Flasche: {wein.name}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="det-info">
            <div className="det-eyebrow">
              <span className="det-eyebrow-num">(Wein)</span>
              <span className="det-eyebrow-label">Aus dem Keller ins Glas</span>
            </div>
            {artZeile && (
              <p className={`det-art${istBronze ? ' ist-bronze' : ''}`}>{artZeile}</p>
            )}
            <h1 className="det-titel">
              <span className="det-titel-zeile">
                {wein.name}
                {wein.ausverkauft && <span className="det-badge">Ausverkauft</span>}
              </span>
            </h1>
            {wein.rebsorte && <p className="det-rebsorte">{wein.rebsorte}</p>}

            {typeof wein.preis === 'number' && (
              <p className="det-preiszeile">
                <span className="det-preis">{formatPreis(wein.preis)}</span>
                <span className="det-einheit">
                  {wein.flaschengroesse || '0,75 l'} · inkl. MwSt. zzgl. Versand
                </span>
              </p>
            )}

            {wein.beschreibung && (
              <div className="det-lead">
                <p>{wein.beschreibung}</p>
              </div>
            )}

            <div className="det-cta-row">
              {wein.ausverkauft ? (
                <span className="det-warteliste">Derzeit ausverkauft</span>
              ) : (
                <a
                  href={`mailto:${email}?subject=${bestellBetreff}`}
                  className="det-btn-primary"
                >
                  Ab Hof bestellen <span style={{ fontSize: 15, lineHeight: 1 }}>→</span>
                </a>
              )}
              <a href="/#weine" className="det-btn-ghost">
                Alle Weine ansehen
              </a>
            </div>

            <div className="det-fakten">
              {fakten.map(([label, wert]) => (
                <div key={label}>
                  <p className="det-fakt-label">{label}</p>
                  <p className="det-fakt-wert">{wert}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Charakter */}
      <section className="det-section">
        <div className="det-section-inner">
          <h2 className="det-h2">
            Charakter &amp; <em>Genuss</em>
          </h2>
          <div className="det-fliess">
            {wein.beschreibung && <p>{wein.beschreibung}</p>}
            <p>
              Wir lesen von Hand, pressen schonend und lassen dem Wein im Gewölbekeller die Zeit, die
              er braucht. So entsteht ein Tropfen mit klarer Frucht und feiner Mineralität – typisch
              für die Steillagen des Mühltals.
            </p>
          </div>

          <div className="det-hinweis">
            <p>
              <strong>Ab Hof erhältlich</strong> oder per Versand innerhalb Deutschlands. Für
              größere Mengen und offene Fragen schreib uns einfach.
            </p>
            <a href={`mailto:${email}?subject=${bestellBetreff}`} className="det-btn-primary">
              Anfrage per E-Mail
            </a>
          </div>
        </div>
      </section>

      <Footer kontakt={kontakt} />
    </div>
  )
}
