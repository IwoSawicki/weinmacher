import { RichText } from '@payloadcms/richtext-lexical/react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import React from 'react'

import { Bild } from '@/components/Bild'
import { Footer } from '@/components/sections/Footer'
import { VorschauNav } from '@/components/VorschauNav'
import {
  formatEventDatumOnly,
  formatEventZeit,
  normalisiereLink,
} from '@/lib/format'
import config from '@/payload.config'
import type { Event } from '@/payload-types'

import '../detail.css'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Event – Vorschau | Weinmacher Mühltal',
  robots: { index: false, follow: false },
}

// Demo-Event, falls im CMS noch keins gepflegt ist.
const DEMO_EVENT = {
  titel: 'Weinprobe im Gewölbekeller',
  datum: '2026-09-11T19:00:00+02:00',
  ort: 'Gewölbekeller, Mühlweg 12, 64367 Mühltal',
  beschreibungText:
    'Sechs Weine des Jahrgangs, begleitet von regionaler Brotzeit. Jakob Stolz führt persönlich durch den Abend und erzählt, wie aus Handlese und Geduld die Weine des Mühltals entstehen.',
  preis: '39 € pro Person',
  ausgebucht: false,
}

export default async function EventVorschauPage() {
  const payload = await getPayload({ config: await config })

  const heute = new Date()
  heute.setHours(0, 0, 0, 0)

  const [eventResult, kontakt] = await Promise.all([
    payload.find({
      collection: 'events',
      where: { datum: { greater_than_equal: heute.toISOString() } },
      sort: 'datum',
      limit: 1,
    }),
    payload.findGlobal({ slug: 'kontakt' }),
  ])

  const event = eventResult.docs[0] as Event | undefined
  const email = kontakt.email || 'hallo@weinmacher-muehltal.de'

  // Werte aus CMS oder Demo
  const titel = event?.titel ?? DEMO_EVENT.titel
  const datum = event?.datum ?? DEMO_EVENT.datum
  const ort = event?.ort ?? DEMO_EVENT.ort
  const preis = event?.preis ?? DEMO_EVENT.preis
  const ausgebucht = event?.ausgebucht ?? DEMO_EVENT.ausgebucht
  const bild = event?.bild ?? null
  const pdf = event?.pdf && typeof event.pdf === 'object' && event.pdf.url ? event.pdf.url : null
  const anmeldeLink = event?.anmeldeLink ?? `mailto:${email}`

  const fakten: Array<[string, string]> = [
    ['Datum', formatEventDatumOnly(datum)],
    ['Uhrzeit', formatEventZeit(datum)],
    ort ? ['Ort', ort] : null,
    preis ? ['Preis', preis] : null,
  ].filter(Boolean) as Array<[string, string]>

  const anmeldeBetreff = encodeURIComponent(`Anmeldung: ${titel}`)

  return (
    <div className="det">
      <VorschauNav />

      <div className="det-wrap">
        <a href="/#events" className="det-back">
          ← Alle Events
        </a>

        <div className="det-split">
          {/* Bild */}
          <div className="det-media quer">
            {bild ? (
              <Bild media={bild} alt={titel} size="hero" sizes="(max-width: 860px) 100vw, 45vw" priority />
            ) : (
              <div className="ph" aria-hidden="true">
                Bild: {titel}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="det-info">
            <div className="det-eyebrow">
              <span className="det-eyebrow-num">(Event)</span>
              <span className="det-eyebrow-label">Kommende Veranstaltung</span>
            </div>
            <p className="det-art">{formatEventDatumOnly(datum)}</p>
            <h1 className="det-titel">
              <span className="det-titel-zeile">
                {titel}
                {ausgebucht && <span className="det-badge">Ausgebucht</span>}
              </span>
            </h1>
            {ort && <p className="det-rebsorte">{ort}</p>}

            {preis && (
              <p className="det-preiszeile">
                <span className="det-preis">{preis}</span>
              </p>
            )}

            {/* Beschreibung: RichText aus CMS oder Demo-Text */}
            <div className="det-lead">
              {event?.beschreibung ? (
                <RichText data={event.beschreibung} />
              ) : (
                <p>{DEMO_EVENT.beschreibungText}</p>
              )}
            </div>

            <div className="det-cta-row">
              {pdf && (
                <a href={pdf} target="_blank" rel="noopener noreferrer" className="det-btn-ghost">
                  Programm (PDF)
                </a>
              )}
              {ausgebucht ? (
                <span className="det-warteliste">Ausgebucht – Warteliste</span>
              ) : (
                <a
                  href={
                    anmeldeLink.startsWith('mailto:')
                      ? `${anmeldeLink}?subject=${anmeldeBetreff}`
                      : normalisiereLink(anmeldeLink)
                  }
                  className="det-btn-primary"
                >
                  Jetzt anmelden <span style={{ fontSize: 15, lineHeight: 1 }}>→</span>
                </a>
              )}
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

      {/* Details / Ablauf */}
      <section className="det-section">
        <div className="det-section-inner">
          <h2 className="det-h2">
            Der <em>Abend</em>
          </h2>
          <div className="det-fliess">
            {event?.beschreibung ? (
              <RichText data={event.beschreibung} />
            ) : (
              <p>{DEMO_EVENT.beschreibungText}</p>
            )}
            <p>
              Treffpunkt ist direkt am Hof; von dort geht es gemeinsam in den Gewölbekeller. Bitte
              melden Sie sich vorab an, die Plätze sind begrenzt.
            </p>
          </div>

          <div className="det-hinweis">
            <p>
              <strong>Anmeldung erforderlich.</strong> Schreiben Sie uns mit Ihrem Wunschtermin und
              der Personenzahl – wir bestätigen Ihren Platz kurzfristig.
            </p>
            {ausgebucht ? (
              <span className="det-warteliste">Warteliste anfragen</span>
            ) : (
              <a
                href={
                  anmeldeLink.startsWith('mailto:')
                    ? `${anmeldeLink}?subject=${anmeldeBetreff}`
                    : normalisiereLink(anmeldeLink)
                }
                className="det-btn-primary"
              >
                Zur Anmeldung
              </a>
            )}
          </div>
        </div>
      </section>

      <Footer kontakt={kontakt} />
    </div>
  )
}
