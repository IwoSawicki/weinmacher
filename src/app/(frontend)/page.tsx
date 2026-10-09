import React from 'react'

import { Bild } from '@/components/Bild'
import { ScrollReveal } from '@/components/ScrollReveal'
import {
  formatEventDatum,
  formatEventDatumOnly,
  formatPreis,
  mapsHref,
  parseOeffnungszeiten,
  WEINART_LABELS,
  weinartIstBronze,
} from '@/lib/format'
import { BILDER, GELEE, kommendeEvents, KONTAKT, WEINE } from '@/lib/inhalte'

import { CountUp } from './CountUp'
import { EventsCountdown } from './EventsCountdown'
import { Interactions } from './Interactions'
import { Nav2 } from './home-2/Nav2'
import './home-2/home2.css'
import './home-3/home3.css'

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

export default function HomePage() {
  const weine = WEINE
  const events = kommendeEvents()

  const name = KONTAKT.name
  const email = KONTAKT.email
  const telefon = KONTAKT.telefon
  const adresse = KONTAKT.adresse

  const heroBild = BILDER.hero
  const heroVideo = BILDER.heroVideo
  const heroVideoMobile = BILDER.heroVideoMobile
  const heroPoster = BILDER.heroPoster
  const heroPosterMobile = BILDER.heroPosterMobile
  const ueberBild = BILDER.ueber
  const logoUrl = BILDER.logo || undefined

  return (
    <>
      {/* ===================== HERO (Design Seite 2) ===================== */}
      <div className="v2">
        <Nav2 logoUrl={logoUrl} logoAlt={name} />
        <header id="start" className="v2-hero">
          <div className="v2-hero-frame">
            <div className="v2-hero-img">
              {heroVideo ? (
                <>
                  <video
                    className="v2-hero-video v2-hero-video-desktop"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="none"
                    poster={heroPoster || undefined}
                    aria-hidden="true"
                  >
                    <source src={heroVideo} type="video/mp4" />
                  </video>
                  <video
                    className="v2-hero-video v2-hero-video-mobile"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="none"
                    poster={heroPosterMobile || heroPoster || undefined}
                    aria-hidden="true"
                  >
                    <source src={heroVideoMobile || heroVideo} type="video/mp4" />
                  </video>
                </>
              ) : heroBild ? (
                <Bild src={heroBild} alt="Weinberg im Frankensteiner Land" sizes="100vw" priority />
              ) : (
                <div className="v2-hero-fallback" aria-hidden="true" />
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
                      src={ueberBild}
                      alt="Tim und Frank Köth"
                      sizes="(max-width: 960px) 100vw, 45vw"
                    />
                  ) : (
                    <div className="v3-ueber-fallback" aria-hidden="true" />
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
        <section id="weine" className="v3-section kompakt v3-weine-dunkel">
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
                      key={wein.name}
                      data-reveal=""
                      className={`v3-wein${wein.ausverkauft ? ' ist-ausverkauft' : ''}`}
                    >
                      {wein.ausverkauft && <span className="v3-badge">Ausverkauft</span>}
                      <div className="v3-wein-bild">
                        {wein.bild ? (
                          <Bild
                            src={wein.bild}
                            alt={wein.name}
                            sizes="(max-width: 960px) 100vw, 25vw"
                          />
                        ) : (
                          <div className="ph" aria-hidden="true">
                            {wein.name}
                          </div>
                        )}
                      </div>
                      <div className="v3-wein-body">
                        {wein.kicker && <p className="v3-wein-kicker">{wein.kicker}</p>}
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

        {/* WEINGELEE */}
        <section id="gelee" className="v3-section kompakt">
          <div className="v3-inner">
            <div data-reveal="" className="v3-eyebrow spaced">
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 18 }}>
                <span className="v3-eyebrow-num">(03)</span>
                <span className="v3-eyebrow-label">Weingelee</span>
              </div>
              <span className="v3-eyebrow-label">Bio-Qualität · hausgemacht</span>
            </div>
            <h2 data-reveal="" className="v3-h2 v3-h2-block">
              Mehr Genuss – <em className="lila">aus unseren Trauben</em>.
            </h2>
            <div className="v3-grid-gelee">
              {GELEE.map((produkt) => (
                <article key={produkt.name} data-reveal="" className="v3-gelee-karte">
                  <div className="v3-gelee-bild">
                    {produkt.bild ? (
                      <Bild
                        src={produkt.bild}
                        alt={produkt.name}
                        sizes="(max-width: 860px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="ph" aria-hidden="true">
                        {produkt.name}
                      </div>
                    )}
                    {produkt.badge && <span className="v3-gelee-badge">{produkt.badge}</span>}
                  </div>
                  <div className="v3-gelee-body">
                    {produkt.variante && <p className="v3-gelee-variante">{produkt.variante}</p>}
                    <h3 className="v3-gelee-name">{produkt.name}</h3>
                    <p className="v3-gelee-besch">{produkt.beschreibung}</p>
                    {typeof produkt.preis === 'number' && (
                      <p className="v3-gelee-preiszeile">
                        <span className="v3-gelee-preis">{formatPreis(produkt.preis)}</span>
                        <span className="v3-gelee-einheit">pro Glas</span>
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
            <p data-reveal="" className="v3-gelee-hinweis">
              Erhältlich ab Hof oder bei unseren Events. Anfragen gern an{' '}
              <a href={`mailto:${email}`}>{email}</a>.
            </p>
          </div>
        </section>

        {/* EVENTS – Countdown + gestapelte Events */}
        {events.length > 0 && (
          <section id="events" className="v3-section kompakt">
            <div className="v3-inner">
              <div data-reveal="" className="v3-eyebrow">
                <span className="v3-eyebrow-num">(04)</span>
                <span className="v3-eyebrow-label">Events</span>
              </div>
              <h2 data-reveal="" className="v3-h2 v3-h2-block" style={{ maxWidth: 760 }}>
                Kommende <em>Veranstaltungen</em>
              </h2>

              <EventsCountdown targetIso={events[0].datum} titel={events[0].titel} />

              <div className="evt3-liste">
                {events.map((event) => {
                  const maps = mapsHref(event.kartenLink, event.ort)
                  return (
                    <article
                      key={`${event.titel}-${event.datum}`}
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
                          <p>{event.beschreibung}</p>
                        </div>
                      )}
                      <div className="evt2-foot">
                        {event.preis && <p className="evt2-preis">{event.preis}</p>}
                        <div className="evt2-btns">
                          <a href={`mailto:${email}`} className="v3-btn-anmelden">
                            Anfrage <span style={{ fontSize: 15, lineHeight: 1 }}>→</span>
                          </a>
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
                <span className="v3-eyebrow-num">(05)</span>
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
              <span className="v3-eyebrow-num">(06)</span>
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
                {(KONTAKT.instagram || KONTAKT.facebook) && (
                  <div className="v3-social">
                    {KONTAKT.instagram && (
                      <a href={KONTAKT.instagram} target="_blank" rel="noopener noreferrer">
                        Instagram
                      </a>
                    )}
                    {KONTAKT.facebook && (
                      <a href={KONTAKT.facebook} target="_blank" rel="noopener noreferrer">
                        Facebook
                      </a>
                    )}
                  </div>
                )}
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
