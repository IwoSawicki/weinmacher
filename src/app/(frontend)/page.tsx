import { RichText } from '@payloadcms/richtext-lexical/react'
import React from 'react'

import { Bild } from '@/components/Bild'
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

import { CountUp } from './CountUp'
import { EventsCountdown } from './EventsCountdown'
import { Interactions } from './Interactions'
import { Nav2 } from './home-2/Nav2'
import './home-2/home2.css'
import './home-3/home3.css'

// Inhalte kommen aus dem CMS – immer zur Laufzeit rendern, damit Änderungen
// sofort live sind (und der Docker-Build keine Datenbank braucht)
export const dynamic = 'force-dynamic'

const MARQUEE =
  'Riesling  ✳  Spätburgunder  ✳  Grauburgunder  ✳  Portugieser  ✳  Handlese  ✳  Gewölbekeller  ✳  Steillage  ✳  Seit 1962  ✳  '

// Passendes Platzhalter-SVG je Verleih-Kategorie (solange kein echtes Foto da ist)
function verleihPlatzhalter(kategorie?: string | null): string {
  if (kategorie === 'ausschank' || kategorie === 'technik' || kategorie === 'mobiliar') {
    return kategorie
  }
  return 'sonstiges'
}

export default async function HomePage() {
  const { weine, events, verleih, kontakt, website } = await ladeStartseitenDaten()

  const name = kontakt.name || 'Weinmacher Mühltal'
  const email = kontakt.email || 'hallo@weinmacher-muehltal.de'
  const telefon = kontakt.telefon || '06151 / 928 73 40'
  const adresse = kontakt.adresse || 'Mühlweg 12\n64367 Mühltal'
  const zeiten = kontakt.oeffnungszeiten
    ? parseOeffnungszeiten(kontakt.oeffnungszeiten)
    : OEFFNUNGSZEITEN_FALLBACK

  const heroBild = website?.heroBild
  const ueberBild = website?.ueberBild

  return (
    <>
      {/* ===================== HERO (Design Seite 2) ===================== */}
      <div className="v2">
        <Nav2 />
        <header id="start" className="v2-hero">
          <div className="v2-hero-frame">
            <div className="v2-hero-img">
              {heroBild ? (
                <Bild media={heroBild} alt="Weinberg im Mühltal" size="hero" sizes="100vw" priority />
              ) : (
                <div className="ph" aria-hidden="true">
                  Hero: Weinberg im Abendlicht
                </div>
              )}
            </div>
            <div className="v2-hero-verlauf" />
            <div className="v2-hero-inhalt">
              <div style={{ maxWidth: 760 }}>
                <p className="v2-hero-kicker">Familienweingut im Mühltal</p>
                <h1 className="v2-hero-titel">Wein, der nach Zuhause schmeckt.</h1>
                <p className="v2-hero-text">
                  Handgelesen, langsam ausgebaut, in kleinen Mengen gefüllt – seit drei Generationen
                  an den Hängen des Mühltals.
                </p>
              </div>
              <a href="#weine" className="v2-hero-cta">
                Unsere Weine entdecken <span style={{ fontSize: 17, lineHeight: 1 }}>↓</span>
              </a>
            </div>
            <div className="v2-hero-scroll" aria-hidden="true">
              <span />
            </div>
          </div>
        </header>
      </div>

      {/* ===================== REST (Design Seite 3) ===================== */}
      <div className="v3">
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
                  Was 1962 mit zwei Hektar Steillage begann, führt Frank Köth heute in dritter
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
                    <p className="v3-stat-zahl">
                      <CountUp to={1962} from={1900} />
                    </p>
                    <p className="v3-stat-label">Gegründet</p>
                  </div>
                  <div>
                    <p className="v3-stat-zahl">
                      <CountUp to={8} suffix=" ha" />
                    </p>
                    <p className="v3-stat-label">Rebfläche</p>
                  </div>
                  <div>
                    <p className="v3-stat-zahl">
                      <CountUp to={100} suffix=" %" />
                    </p>
                    <p className="v3-stat-label">Handlese</p>
                  </div>
                </div>
              </div>
              <div data-reveal="" className="v3-ueber-media">
                <div className="v3-ueber-bild">
                  {ueberBild ? (
                    <Bild
                      media={ueberBild}
                      alt="Frank Köth, Winzer"
                      size="hero"
                      sizes="(max-width: 960px) 100vw, 45vw"
                    />
                  ) : (
                    <div className="ph" aria-hidden="true">
                      Porträt: Frank Köth
                    </div>
                  )}
                </div>
                <p className="v3-zitat">
                  „Guter Wein entsteht im Weinberg. Im Keller darf man ihn nur nicht stören.“
                  <cite>— Frank Köth, Winzer</cite>
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
                        {wein.bild ? (
                          <Bild
                            media={wein.bild}
                            alt={wein.name}
                            size="card"
                            sizes="(max-width: 960px) 100vw, 25vw"
                          />
                        ) : (
                          <div className="ph" aria-hidden="true">
                            {wein.name}
                          </div>
                        )}
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
                    event.pdf && typeof event.pdf === 'object' && event.pdf.url
                      ? event.pdf.url
                      : null
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

        {/* EVENTS – Variante 2 (prominentere Kacheln) */}
        {events.length > 0 && (
          <section className="v3-section kompakt">
            <div className="v3-inner">
              <div data-reveal="" className="v3-eyebrow">
                <span className="v3-eyebrow-num">(03·b)</span>
                <span className="v3-eyebrow-label">Events – Variante 2</span>
              </div>
              <h2 data-reveal="" className="v3-h2 v3-h2-block" style={{ maxWidth: 760 }}>
                Kommende <em>Veranstaltungen</em>
              </h2>
              <div className="evt2-liste">
                {events.map((event) => {
                  const pdf =
                    event.pdf && typeof event.pdf === 'object' && event.pdf.url
                      ? event.pdf.url
                      : null
                  return (
                    <article
                      key={event.id}
                      data-reveal=""
                      className={`evt2-card${event.ausgebucht ? ' ist-ausgebucht' : ''}`}
                    >
                      <div className="evt2-head">
                        <p className="evt2-datum">{formatEventDatum(event.datum)}</p>
                        {event.ausgebucht && <span className="evt2-badge">Ausgebucht</span>}
                      </div>
                      <h3 className="evt2-titel">{event.titel}</h3>
                      {event.ort && <p className="evt2-ort">{event.ort}</p>}
                      {event.beschreibung && (
                        <div className="evt2-besch">
                          <RichText data={event.beschreibung} />
                        </div>
                      )}
                      <div className="evt2-foot">
                        {event.preis && <p className="evt2-preis">{event.preis}</p>}
                        <div className="evt2-btns">
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
                            <a
                              href={normalisiereLink(event.anmeldeLink)}
                              className="v3-btn-anmelden"
                            >
                              Anmelden <span style={{ fontSize: 15, lineHeight: 1 }}>→</span>
                            </a>
                          )}
                          {event.ausgebucht && <span className="v3-warteliste">Warteliste</span>}
                        </div>
                      </div>
                    </article>
                  )
                })}
              </div>
            </div>
          </section>
        )}

        {/* EVENTS – Variante 3 (großer Countdown + gestapelte Events) */}
        {events.length > 0 && (
          <section className="v3-section kompakt">
            <div className="v3-inner">
              <div data-reveal="" className="v3-eyebrow">
                <span className="v3-eyebrow-num">(03·c)</span>
                <span className="v3-eyebrow-label">Events – Variante 3</span>
              </div>
              <h2 data-reveal="" className="v3-h2 v3-h2-block" style={{ maxWidth: 760 }}>
                Kommende <em>Veranstaltungen</em>
              </h2>

              <EventsCountdown targetIso={events[0].datum} titel={events[0].titel} />

              <div className="evt3-liste">
                {events.map((event) => {
                  const pdf =
                    event.pdf && typeof event.pdf === 'object' && event.pdf.url
                      ? event.pdf.url
                      : null
                  return (
                    <article
                      key={event.id}
                      data-reveal=""
                      className={`evt2-card${event.ausgebucht ? ' ist-ausgebucht' : ''}`}
                    >
                      <div className="evt2-head">
                        <p className="evt2-datum">{formatEventDatum(event.datum)}</p>
                        {event.ausgebucht && <span className="evt2-badge">Ausgebucht</span>}
                      </div>
                      <h3 className="evt2-titel">{event.titel}</h3>
                      {event.ort && <p className="evt2-ort">{event.ort}</p>}
                      {event.beschreibung && (
                        <div className="evt2-besch">
                          <RichText data={event.beschreibung} />
                        </div>
                      )}
                      <div className="evt2-foot">
                        {event.preis && <p className="evt2-preis">{event.preis}</p>}
                        <div className="evt2-btns">
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
                            <a
                              href={normalisiereLink(event.anmeldeLink)}
                              className="v3-btn-anmelden"
                            >
                              Anmelden <span style={{ fontSize: 15, lineHeight: 1 }}>→</span>
                            </a>
                          )}
                          {event.ausgebucht && <span className="v3-warteliste">Warteliste</span>}
                        </div>
                      </div>
                    </article>
                  )
                })}
              </div>
            </div>
          </section>
        )}

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
                  Für Vereinsfeste, Hochzeiten und Firmenfeiern – gepflegt, geprüft und auf Wunsch
                  mit Lieferung.
                </p>
              </div>
              {verleih.length > 0 && (
                <div className="v3-grid-verleih">
                  {verleih.map((item) => {
                    const bild =
                      Array.isArray(item.bilder) && item.bilder.length > 0 ? item.bilder[0] : null
                    const verfuegbar = item.verfuegbar !== false
                    return (
                      <article key={item.id} data-reveal="" className="v3-verleih-karte">
                        <div className="v3-verleih-bild">
                          {bild ? (
                            <Bild
                              media={bild}
                              alt={item.name}
                              size="card"
                              sizes="(max-width: 960px) 100vw, 25vw"
                            />
                          ) : (
                            <img
                              src={`/placeholders/verleih-${verleihPlatzhalter(item.kategorie)}.svg`}
                              alt=""
                              aria-hidden="true"
                              style={{
                                position: 'absolute',
                                inset: 0,
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                              }}
                            />
                          )}
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
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 6,
                    fontSize: 15,
                    maxWidth: 260,
                  }}
                >
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
                <a href="/impressum">Impressum</a>
                <a href="/datenschutz">Datenschutz</a>
              </div>
            </div>
          </div>
        </footer>

        <ScrollReveal distance={32} duration={1} threshold={0.1} />
      </div>
      <Interactions />
    </>
  )
}
