import { RichText } from '@payloadcms/richtext-lexical/react'
import type { Metadata } from 'next'
import React from 'react'

import { ScrollReveal } from '@/components/ScrollReveal'
import { ladeStartseitenDaten } from '@/lib/homepageData'
import {
  formatEventDatum,
  formatPreis,
  normalisiereLink,
  OEFFNUNGSZEITEN_FALLBACK,
  parseOeffnungszeiten,
  VERLEIH_KATEGORIE_LABELS,
  WEINART_LABELS,
  weinartIstBronze,
} from '@/lib/format'

import { Nav3 } from './Nav3'
import './home3.css'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Weinmacher Mühltal – Design-Variante 3',
  robots: { index: false, follow: false },
}

const MARQUEE =
  'Riesling  ✳  Spätburgunder  ✳  Grauburgunder  ✳  Portugieser  ✳  Handlese  ✳  Gewölbekeller  ✳  Steillage  ✳  Seit 1962  ✳  '

export default async function Home3Page() {
  const { weine, events, verleih, kontakt } = await ladeStartseitenDaten()

  const name = kontakt.name || 'Weinmacher Mühltal'
  const email = kontakt.email || 'hallo@weinmacher-muehltal.de'
  const telefon = kontakt.telefon || '06151 / 928 73 40'
  const adresse = kontakt.adresse || 'Mühlweg 12\n64367 Mühltal'
  const zeiten = kontakt.oeffnungszeiten
    ? parseOeffnungszeiten(kontakt.oeffnungszeiten)
    : OEFFNUNGSZEITEN_FALLBACK

  return (
    <div className="v3">
      <Nav3 />

      {/* HERO */}
      <header id="start" className="v3-hero">
        <div className="v3-hero-inner">
          <div className="v3-hero-meta">
            <p>Familienweingut · Est. 1962</p>
            <p>Mühltal, Hessen · 8 ha</p>
          </div>
          <h1 className="v3-hero-titel">
            Wein, der nach <em>Zuhause</em> schmeckt.
          </h1>
          <div className="v3-hero-unten">
            <p className="v3-hero-text">
              Handgelesen, langsam ausgebaut, in kleinen Mengen gefüllt – seit drei Generationen an
              den Hängen des Mühltals.
            </p>
            <a href="#weine" className="v3-hero-cta">
              Unsere Weine <span style={{ fontSize: 17, lineHeight: 1 }}>↓</span>
            </a>
          </div>
          <div className="v3-hero-bild">
            <div className="ph" aria-hidden="true">
              Hero: Weinberg im Abendlicht
            </div>
          </div>
        </div>
      </header>

      {/* MARQUEE */}
      <div className="v3-marquee">
        <div className="v3-marquee-track">
          <span>{MARQUEE}</span>
          <span>{MARQUEE}</span>
        </div>
      </div>

      {/* ÜBER UNS */}
      <section id="ueber" className="v3-section">
        <div className="v3-inner">
          <div data-reveal="" className="v3-eyebrow">
            <span className="v3-eyebrow-num">(01)</span>
            <span className="v3-eyebrow-label">Über uns</span>
          </div>
          <div className="v3-ueber-grid">
            <div data-reveal="">
              <h2 className="v3-h2">
                Drei Generationen, ein Tal, <em>ehrlicher</em> Wein.
              </h2>
              <p className="v3-fliess">
                Was 1962 mit zwei Hektar Steillage begann, führt Jakob Stolz heute in dritter
                Generation weiter: acht Hektar Riesling, Burgunder und alte rote Sorten, von Hand
                gepflegt und schonend im Gewölbekeller ausgebaut.
              </p>
              <p className="v3-fliess">
                Wir arbeiten naturnah, verzichten auf Herbizide und lassen jedem Jahrgang die Zeit,
                die er braucht. Das Ergebnis sind Weine mit klarer Frucht, feiner Mineralität – und
                der Handschrift des Mühltals.
              </p>
              <div className="v3-stats">
                <div>
                  <p className="v3-stat-zahl">1962</p>
                  <p className="v3-stat-label">Gegründet</p>
                </div>
                <div>
                  <p className="v3-stat-zahl">8 ha</p>
                  <p className="v3-stat-label">Rebfläche</p>
                </div>
                <div>
                  <p className="v3-stat-zahl">100 %</p>
                  <p className="v3-stat-label">Handlese</p>
                </div>
              </div>
            </div>
            <div data-reveal="" className="v3-ueber-media">
              <div className="v3-ueber-bild">
                <div className="ph" aria-hidden="true">
                  Porträt: Winzer im Keller
                </div>
              </div>
              <p className="v3-zitat">
                „Guter Wein entsteht im Weinberg. Im Keller darf man ihn nur nicht stören.“
                <cite>— Jakob Stolz, Winzer</cite>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WEINE */}
      <section id="weine" className="v3-section kompakt">
        <div className="v3-inner">
          <div data-reveal="" className="v3-eyebrow spaced">
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 18 }}>
              <span className="v3-eyebrow-num">(02)</span>
              <span className="v3-eyebrow-label">Unsere Weine</span>
            </div>
            <span className="v3-eyebrow-label">Ab Hof &amp; Versand</span>
          </div>
          <h2 data-reveal="" className="v3-h2 v3-h2-block">
            Aus dem Keller <em className="lila">ins Glas</em>.
          </h2>
          {weine.length === 0 ? (
            <p className="v3-fliess">
              Unsere Weine werden gerade eingepflegt – schauen Sie bald wieder vorbei.
            </p>
          ) : (
            <div className="v3-grid-weine">
              {weine.map((wein) => {
                const artLabel = WEINART_LABELS[wein.weinart] ?? ''
                const artZeile = [artLabel, wein.jahrgang].filter(Boolean).join(' · ')
                return (
                  <article
                    key={wein.id}
                    data-reveal=""
                    className={`v3-wein${wein.ausverkauft ? ' ist-ausverkauft' : ''}`}
                  >
                    {wein.ausverkauft && <span className="v3-badge">Ausverkauft</span>}
                    <div className="v3-wein-bild">
                      <div className="ph" aria-hidden="true">
                        {wein.name}
                      </div>
                    </div>
                    <div className="v3-wein-body">
                      {artZeile && (
                        <p
                          className={`v3-wein-art${weinartIstBronze(wein.weinart) ? ' ist-bronze' : ''}`}
                        >
                          {artZeile}
                        </p>
                      )}
                      <h3 className="v3-wein-name">{wein.name}</h3>
                      {wein.rebsorte && <p className="v3-wein-rebsorte">{wein.rebsorte}</p>}
                      {wein.beschreibung && <p className="v3-wein-besch">{wein.beschreibung}</p>}
                      {typeof wein.preis === 'number' && (
                        <p className="v3-wein-preiszeile">
                          <span className="v3-wein-preis">{formatPreis(wein.preis)}</span>
                          <span className="v3-wein-einheit">
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

      {/* EVENTS */}
      <section id="events" className="v3-section kompakt">
        <div className="v3-inner">
          <div data-reveal="" className="v3-eyebrow">
            <span className="v3-eyebrow-num">(03)</span>
            <span className="v3-eyebrow-label">Events</span>
          </div>
          <h2 data-reveal="" className="v3-h2 v3-h2-block" style={{ maxWidth: 760 }}>
            Kommende <em>Veranstaltungen</em>
          </h2>
          {events.length === 0 ? (
            <p className="v3-fliess">
              Aktuell sind keine Veranstaltungen geplant – schauen Sie bald wieder vorbei.
            </p>
          ) : (
            <div className="v3-events-liste">
              {events.map((event) => {
                const pdf =
                  event.pdf && typeof event.pdf === 'object' && event.pdf.url ? event.pdf.url : null
                return (
                  <article
                    key={event.id}
                    data-reveal=""
                    className={`v3-event${event.ausgebucht ? ' ist-ausgebucht' : ''}`}
                  >
                    <div>
                      <p className="v3-event-datum">{formatEventDatum(event.datum)}</p>
                      <h3 className="v3-event-titel">
                        {event.titel}
                        {event.ausgebucht && <span className="v3-event-badge">Ausgebucht</span>}
                      </h3>
                      {event.ort && <p className="v3-event-ort">{event.ort}</p>}
                    </div>
                    <div>
                      {event.beschreibung && (
                        <div className="v3-event-besch">
                          <RichText data={event.beschreibung} />
                        </div>
                      )}
                      {event.preis && <p className="v3-event-preis">{event.preis}</p>}
                    </div>
                    <div className="v3-event-btns">
                      {pdf && (
                        <a
                          href={pdf}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="v3-btn-pdf"
                        >
                          Details (PDF)
                        </a>
                      )}
                      {!event.ausgebucht && event.anmeldeLink && (
                        <a href={normalisiereLink(event.anmeldeLink)} className="v3-btn-anmelden">
                          Anmelden <span style={{ fontSize: 15, lineHeight: 1 }}>→</span>
                        </a>
                      )}
                      {event.ausgebucht && <span className="v3-warteliste">Warteliste</span>}
                    </div>
                  </article>
                )
              })}
              <div className="v3-event-ende" />
            </div>
          )}
        </div>
      </section>

      {/* VERLEIH */}
      <section id="verleih" className="v3-verleih">
        <div className="v3-verleih-box">
          <div className="v3-verleih-inner">
            <div data-reveal="" className="v3-verleih-eyebrow">
              <span className="v3-eyebrow-num">(04)</span>
              <span className="v3-eyebrow-label">Verleih</span>
            </div>
            <div data-reveal="" className="v3-verleih-kopf">
              <h2 className="v3-h2">
                Ausschankwagen &amp; <em>Technik</em> mieten
              </h2>
              <p>
                Für Vereinsfeste, Hochzeiten und Firmenfeiern – gepflegt, geprüft und auf Wunsch mit
                Lieferung.
              </p>
            </div>
            {verleih.length > 0 && (
              <div className="v3-grid-verleih">
                {verleih.map((item) => {
                  const verfuegbar = item.verfuegbar !== false
                  return (
                    <article key={item.id} data-reveal="" className="v3-verleih-karte">
                      <div className="v3-verleih-bild">
                        <div className="ph ph-dark" aria-hidden="true">
                          {item.name}
                        </div>
                      </div>
                      <div className="v3-verleih-body">
                        {item.kategorie && (
                          <p className="v3-verleih-kat">
                            {VERLEIH_KATEGORIE_LABELS[item.kategorie] ?? item.kategorie}
                          </p>
                        )}
                        <h3 className="v3-verleih-name">{item.name}</h3>
                        {item.beschreibung && (
                          <p className="v3-verleih-besch">{item.beschreibung}</p>
                        )}
                        <div className="v3-verleih-preiszeile">
                          {item.preisInfo && (
                            <span className="v3-verleih-preis">{item.preisInfo}</span>
                          )}
                        </div>
                        <p className={`v3-verleih-status${verfuegbar ? '' : ' ist-anfrage'}`}>
                          <span className="punkt" />
                          {verfuegbar ? 'Verfügbar' : 'Auf Anfrage'}
                        </p>
                      </div>
                    </article>
                  )
                })}
              </div>
            )}
            <p data-reveal="" className="v3-verleih-hinweis">
              Anfragen mit Wunschtermin an <a href={`mailto:${email}`}>{email}</a> – Abholung in
              64367 Mühltal oder Lieferung nach Absprache.
            </p>
          </div>
        </div>
      </section>

      {/* KONTAKT + FOOTER */}
      <footer id="kontakt" className="v3-footer">
        <div className="v3-footer-inner">
          <div data-reveal="" className="v3-eyebrow">
            <span className="v3-eyebrow-num">(05)</span>
            <span className="v3-eyebrow-label">Kontakt</span>
          </div>
          <div data-reveal="" className="v3-footer-claim">
            <h2>
              Lust auf ein Glas? <a href={`mailto:${email}`}>Sagen Sie Hallo.</a>
            </h2>
          </div>
          <div className="v3-footer-grid">
            <div data-reveal="">
              <p className="v3-footer-label">Adresse</p>
              <p className="adr">
                {name}
                <br />
                {adresse.split('\n').map((zeile, i) => (
                  <React.Fragment key={i}>
                    {zeile}
                    <br />
                  </React.Fragment>
                ))}
              </p>
            </div>
            <div data-reveal="">
              <p className="v3-footer-label">Erreichbarkeit</p>
              <p className="adr" style={{ marginBottom: 18 }}>
                <a href={`tel:${telefon.replace(/[^\d+]/g, '')}`}>{telefon}</a>
                <br />
                <a href={`mailto:${email}`}>{email}</a>
              </p>
              <div className="v3-social">
                <a href={kontakt.instagram || 'https://instagram.com'}>Instagram</a>
                <a href={kontakt.facebook || 'https://facebook.com'}>Facebook</a>
              </div>
            </div>
            <div data-reveal="">
              <p className="v3-footer-label">Hofverkauf &amp; Vinothek</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 15, maxWidth: 260 }}>
                {zeiten.map((eintrag, i) =>
                  eintrag.length === 2 ? (
                    <p
                      key={i}
                      className={`v3-oeff-row${eintrag[1].toLowerCase().includes('geschlossen') ? ' zu' : ''}`}
                    >
                      <span>{eintrag[0]}</span>
                      <span>{eintrag[1]}</span>
                    </p>
                  ) : (
                    <p key={i} className="v3-oeff-row">
                      {eintrag[0]}
                    </p>
                  ),
                )}
              </div>
            </div>
          </div>
          <p data-reveal="" className="v3-watermark">
            {name}
          </p>
          <div className="v3-footer-bottom">
            <p>
              © {new Date().getFullYear()} {name} · Genuss mit Verantwortung – ab 18 Jahren.
            </p>
            <div className="v3-footer-legal">
              <a href="#">Impressum</a>
              <a href="#">Datenschutz</a>
              <a href="#">AGB Verleih</a>
            </div>
          </div>
        </div>
      </footer>

      <ScrollReveal distance={32} duration={1} threshold={0.1} />
    </div>
  )
}
