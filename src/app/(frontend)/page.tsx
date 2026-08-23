import { RichText } from '@payloadcms/richtext-lexical/react'
import React from 'react'

import { Bild } from '@/components/Bild'
import { ScrollReveal } from '@/components/ScrollReveal'
import { ladeStartseitenDaten } from '@/lib/homepageData'
import {
  formatEventDatum,
  formatEventDatumOnly,
  formatPreis,
  mapsHref,
  normalisiereLink,
  parseOeffnungszeiten,
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

const MARQUEE_WORDS = [
  'Riesling',
  'Cabernet Blanc',
  'Regent',
  'Cabernet Cortis',
  'Handlese',
  'Frankensteiner Land',
  'Naturbelassen',
  'Nieder-Ramstadt',
]

// Stern-Trenner als SVG (statt Emoji – rendert auf allen Geräten gleich)
function MarqueeStar() {
  return (
    <svg className="v3-marquee-star" viewBox="0 0 24 24" width="12" height="12" aria-hidden="true">
      <path
        d="M12 0c0 6.6-5.4 12-12 12 6.6 0 12 5.4 12 12 0-6.6 5.4-12 12-12-6.6 0-12-5.4-12-12Z"
        fill="currentColor"
      />
    </svg>
  )
}

function MarqueeSequence() {
  return (
    <span className="v3-marquee-seq" aria-hidden="true">
      {MARQUEE_WORDS.map((wort) => (
        <React.Fragment key={wort}>
          <span className="v3-marquee-wort">{wort}</span>
          <MarqueeStar />
        </React.Fragment>
      ))}
    </span>
  )
}

export default async function HomePage() {
  const { weine, events, kontakt, website } = await ladeStartseitenDaten()

  const name = kontakt.name || 'Nieder-Ramstädter Weinmacher'
  const email = kontakt.email || 'koeth.weinbau@gmx.de'
  const telefon = kontakt.telefon || '06151 6795 768'
  const adresse = kontakt.adresse || 'Griesbachweg 16\n64367 Mühltal'

  const heroBild = website?.heroBild
  const ueberBild = website?.ueberBild
  const logo = website?.logo
  const logoUrl =
    logo && typeof logo === 'object' ? logo.sizes?.favicon?.url || logo.url || undefined : undefined

  return (
    <>
      {/* ===================== HERO (Design Seite 2) ===================== */}
      <div className="v2">
        <Nav2 logoUrl={logoUrl} logoAlt={name} />
        <header id="start" className="v2-hero">
          <div className="v2-hero-frame">
            <div className="v2-hero-img">
              {heroBild ? (
                <Bild
                  media={heroBild}
                  alt="Weinberg im Frankensteiner Land"
                  size="hero"
                  sizes="100vw"
                  priority
                />
              ) : (
                <div className="ph" aria-hidden="true">
                  Hero: Weinberg im Abendlicht
                </div>
              )}
            </div>
            <div className="v2-hero-verlauf" />
            <div className="v2-hero-inhalt">
              <div style={{ maxWidth: 820 }}>
                <p className="v2-hero-kicker">Wein aus dem Frankensteiner Land</p>
                <h1 className="v2-hero-titel">Wein, der nach Zuhause schmeckt.</h1>
                <p className="v2-hero-text">
                  Willkommen bei den Nieder-Ramstädter Weinmachern – naturbelassen ausgebaut,
                  handgelesen und in kleinen Mengen gefüllt.
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
            <MarqueeSequence />
            <MarqueeSequence />
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
                  Naturnaher Anbau, <em>mitten</em> in der Heimat.
                </h2>
                <p className="v3-fliess">
                  Kein altes Traditionshaus, sondern ein junges Familienweingut: 2010 hat Frank Köth
                  den Grundstein gelegt, seine Weinberge im Frankensteiner Land bewirtschaftet und
                  angefangen, seinen eigenen Wein zu machen. Bis heute wächst das Weingut Jahr für
                  Jahr – Rebe für Rebe, von Hand.
                </p>
                <p className="v3-fliess">
                  Wir setzen auf naturnahen, naturbelassenen Anbau: gesunder Boden, kurze Wege und
                  viel Handarbeit. In einem kleinen, familiären Team kümmern wir uns um jede Traube –
                  für Wein, der ehrlich gemacht ist und nach Zuhause schmeckt.
                </p>
                <div className="v3-stats">
                  <div>
                    <p className="v3-stat-zahl">
                      <CountUp to={2010} from={1950} />
                    </p>
                    <p className="v3-stat-label">Gegründet</p>
                  </div>
                  <div>
                    <p className="v3-stat-zahl">
                      <CountUp to={3} suffix=" ha" />
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
                      alt="Tim und Frank Köth"
                      size="hero"
                      sizes="(max-width: 960px) 100vw, 45vw"
                    />
                  ) : (
                    <div className="ph" aria-hidden="true">
                      Porträt: Tim &amp; Frank
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
                Unsere Weine werden gerade eingepflegt – schau bald wieder vorbei.
              </p>
            ) : (
              <div className="v3-grid-weine">
                {weine.map((wein) => {
                  const artZeile = WEINART_LABELS[wein.weinart] ?? ''
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

        {/* EVENTS – Countdown + gestapelte Events */}
        {events.length > 0 && (
          <section id="events" className="v3-section kompakt">
            <div className="v3-inner">
              <div data-reveal="" className="v3-eyebrow">
                <span className="v3-eyebrow-num">(03)</span>
                <span className="v3-eyebrow-label">Events</span>
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
                  const maps = mapsHref(event.kartenLink, event.ort)
                  return (
                    <article
                      key={event.id}
                      data-reveal=""
                      className={`evt2-card${event.ausgebucht ? ' ist-ausgebucht' : ''}`}
                    >
                      <div className="evt2-head">
                        <p className="evt2-datum">
                          {event.zeiten
                            ? formatEventDatumOnly(event.datum)
                            : formatEventDatum(event.datum)}
                        </p>
                        {event.ausgebucht && <span className="evt2-badge">Ausgebucht</span>}
                      </div>
                      <h3 className="evt2-titel">{event.titel}</h3>
                      {event.ort && (
                        <p className="evt2-ort">
                          {event.ort}
                          {maps && (
                            <>
                              {' · '}
                              <a
                                href={maps}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="evt2-maps"
                              >
                                Google Maps ↗
                              </a>
                            </>
                          )}
                        </p>
                      )}
                      {event.zeiten && (
                        <ul className="evt2-zeiten">
                          {parseOeffnungszeiten(event.zeiten).map((z, i) => (
                            <li key={i}>
                              {z.length === 2 ? (
                                <>
                                  <span className="evt2-zeit-tag">{z[0]}</span>
                                  <span className="evt2-zeit-wert">{z[1]}</span>
                                </>
                              ) : (
                                <span className="evt2-zeit-tag">{z[0]}</span>
                              )}
                            </li>
                          ))}
                        </ul>
                      )}
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

        {/* VERLEIH – einfacher Teaser (keine konkreten Produkte) */}
        <section id="verleih" className="v3-verleih">
          <div className="v3-verleih-box">
            <div className="v3-verleih-inner v3-verleih-simpel">
              <div data-reveal="" className="v3-verleih-eyebrow">
                <span className="v3-eyebrow-num">(04)</span>
                <span className="v3-eyebrow-label">Verleih</span>
              </div>
              <h2 data-reveal="" className="v3-verleih-simpel-titel">
                Du kannst bei uns auch <em>leihen</em>.
              </h2>
              <p data-reveal="" className="v3-verleih-simpel-text">
                Ob Ausschankwagen, Zelte, Beleuchtung oder Stromaggregat – wenn du auf unserem
                Eventberg oder anderswo feiern willst, helfen wir dir gern mit der passenden
                Ausstattung aus. Melde dich einfach, dann finden wir gemeinsam die beste Lösung.
              </p>
              <div data-reveal="" className="v3-verleih-simpel-cta">
                <a href={`tel:${telefon.replace(/[^\d+]/g, '')}`} className="v3-verleih-btn">
                  <span className="v3-verleih-btn-label">Anrufen</span>
                  {telefon}
                </a>
                <a href={`mailto:${email}`} className="v3-verleih-btn ist-sekundaer">
                  <span className="v3-verleih-btn-label">E-Mail</span>
                  {email}
                </a>
              </div>
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
                Lust auf ein Glas? <a href={`mailto:${email}`}>Sag Hallo.</a>
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
            <p className="v3-footer-credit">
              Mit <span aria-hidden="true">❤️</span> erstellt von{' '}
              <a href="https://stolz-marketing.de" target="_blank" rel="noopener noreferrer">
                Stolz Marketing
              </a>
            </p>
          </div>
        </footer>

        <ScrollReveal distance={32} duration={1} threshold={0.1} />
      </div>
      <Interactions />
    </>
  )
}
