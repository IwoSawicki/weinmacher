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

import { Nav2 } from './Nav2'
import './home2.css'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Weinmacher Mühltal – Design-Variante 2',
  robots: { index: false, follow: false },
}

export default async function Home2Page() {
  const { weine, events, verleih, kontakt } = await ladeStartseitenDaten()

  const name = kontakt.name || 'Weinmacher Mühltal'
  const email = kontakt.email || 'hallo@weinmacher-muehltal.de'
  const telefon = kontakt.telefon || '06151 / 928 73 40'
  const adresse = kontakt.adresse || 'Mühlweg 12\n64367 Mühltal'
  const zeiten = kontakt.oeffnungszeiten
    ? parseOeffnungszeiten(kontakt.oeffnungszeiten)
    : OEFFNUNGSZEITEN_FALLBACK

  return (
    <div className="v2">
      <Nav2 />

      {/* HERO */}
      <header id="start" className="v2-hero">
        <div className="v2-hero-frame">
          <div className="v2-hero-img">
            <div className="ph" aria-hidden="true">
              Hero: Weinberg im Abendlicht
            </div>
          </div>
          <div className="v2-hero-verlauf" />
          <div className="v2-hero-inhalt">
            <div style={{ maxWidth: 760 }}>
              <p className="v2-hero-kicker">Familienweingut im Mühltal</p>
              <h1 className="v2-hero-titel">Wein, der nach Zuhause schmeckt.</h1>
              <p className="v2-hero-text">
                Handgelesen, langsam ausgebaut, in kleinen Mengen gefüllt – seit drei Generationen an
                den Hängen des Mühltals.
              </p>
            </div>
            <a href="#weine" className="v2-hero-cta">
              Unsere Weine entdecken <span style={{ fontSize: 17, lineHeight: 1 }}>↓</span>
            </a>
          </div>
        </div>
      </header>

      {/* ÜBER UNS */}
      <section id="ueber" className="v2-ueber">
        <div className="v2-ueber-grid">
          <div data-reveal="" className="v2-ueber-bild">
            <div className="ph" aria-hidden="true">
              Porträt: Winzer im Keller
            </div>
          </div>
          <div data-reveal="">
            <p className="v2-chip v2-chip-bronze">Über uns</p>
            <h2 className="v2-h2">Drei Generationen, ein Tal, ehrlicher Wein.</h2>
            <p className="fliess">
              Was 1962 mit zwei Hektar Steillage begann, führt Jakob Stolz heute in dritter
              Generation weiter: acht Hektar Riesling, Burgunder und alte rote Sorten, von Hand
              gepflegt und schonend im Gewölbekeller ausgebaut.
            </p>
            <p className="fliess">
              Wir arbeiten naturnah, verzichten auf Herbizide und lassen jedem Jahrgang die Zeit, die
              er braucht. Das Ergebnis sind Weine mit klarer Frucht, feiner Mineralität – und der
              Handschrift des Mühltals.
            </p>
            <div className="v2-zitat">
              <p>„Guter Wein entsteht im Weinberg. Im Keller darf man ihn nur nicht stören.“</p>
              <cite>— Jakob Stolz, Winzer</cite>
            </div>
          </div>
        </div>
      </section>

      {/* WEINE */}
      <section id="weine" className="v2-weine">
        <div className="v2-weine-box">
          <div className="v2-weine-inner">
            <div data-reveal="" className="v2-weine-kopf">
              <p className="v2-chip v2-chip-bronze">Unsere Weine</p>
              <h2 className="v2-h2">Aus dem Keller ins Glas</h2>
              <p className="v2-sub">
                Weine, die zeigen, was das Mühltal kann. Abholung ab Hof oder Versand innerhalb
                Deutschlands.
              </p>
            </div>
            {weine.length === 0 ? (
              <p className="v2-leer">
                Unsere Weine werden gerade eingepflegt – schauen Sie bald wieder vorbei.
              </p>
            ) : (
              <div className="v2-grid-weine">
                {weine.map((wein) => {
                  const artLabel = WEINART_LABELS[wein.weinart] ?? ''
                  const artZeile = [artLabel, wein.jahrgang].filter(Boolean).join(' · ')
                  return (
                    <article
                      key={wein.id}
                      data-reveal=""
                      className={`v2-wein${wein.ausverkauft ? ' ist-ausverkauft' : ''}`}
                    >
                      {wein.ausverkauft && <span className="v2-badge">Ausverkauft</span>}
                      <div className="v2-wein-bild">
                        <div className="ph" aria-hidden="true">
                          {wein.name}
                        </div>
                      </div>
                      <div className="v2-wein-body">
                        {artZeile && (
                          <p
                            className={`v2-wein-art${weinartIstBronze(wein.weinart) ? ' ist-bronze' : ''}`}
                          >
                            {artZeile}
                          </p>
                        )}
                        <h3 className="v2-wein-name">{wein.name}</h3>
                        {wein.rebsorte && <p className="v2-wein-rebsorte">{wein.rebsorte}</p>}
                        {wein.beschreibung && <p className="v2-wein-besch">{wein.beschreibung}</p>}
                        {typeof wein.preis === 'number' && (
                          <p className="v2-wein-preiszeile">
                            <span className="v2-wein-preis">{formatPreis(wein.preis)}</span>
                            <span className="v2-wein-einheit">
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
        </div>
      </section>

      {/* EVENTS */}
      <section id="events" className="v2-events">
        <div data-reveal="" className="v2-events-kopf">
          <p className="v2-chip v2-chip-lila">Events</p>
          <h2 className="v2-h2">Kommende Veranstaltungen</h2>
          <p className="v2-sub">
            Weinproben, Feste und Genussabende – direkt bei uns am Hof und im Gewölbekeller.
          </p>
        </div>
        {events.length === 0 ? (
          <p className="v2-leer" style={{ textAlign: 'left' }}>
            Aktuell sind keine Veranstaltungen geplant – schauen Sie bald wieder vorbei.
          </p>
        ) : (
          <div className="v2-events-liste">
            {events.map((event) => {
              const pdf =
                event.pdf && typeof event.pdf === 'object' && event.pdf.url ? event.pdf.url : null
              return (
                <article
                  key={event.id}
                  data-reveal=""
                  className={`v2-event${event.ausgebucht ? ' ist-ausgebucht' : ''}`}
                >
                  <div>
                    <p className="v2-event-datum">{formatEventDatum(event.datum)}</p>
                    <h3 className="v2-event-titel">
                      {event.titel}
                      {event.ausgebucht && <span className="v2-event-badge">Ausgebucht</span>}
                    </h3>
                    {event.ort && <p className="v2-event-ort">{event.ort}</p>}
                  </div>
                  <div>
                    {event.beschreibung && (
                      <div className="v2-event-besch">
                        <RichText data={event.beschreibung} />
                      </div>
                    )}
                    {event.preis && <p className="v2-event-preis">{event.preis}</p>}
                  </div>
                  <div className="v2-event-btns">
                    {pdf && (
                      <a href={pdf} target="_blank" rel="noopener noreferrer" className="v2-btn-pdf">
                        Details (PDF)
                      </a>
                    )}
                    {!event.ausgebucht && event.anmeldeLink && (
                      <a href={normalisiereLink(event.anmeldeLink)} className="v2-btn-anmelden">
                        Anmelden
                      </a>
                    )}
                    {event.ausgebucht && <span className="v2-warteliste">Warteliste</span>}
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </section>

      {/* VERLEIH */}
      <section id="verleih" className="v2-verleih">
        <div className="v2-verleih-box">
          <div className="v2-verleih-inner">
            <div data-reveal="" className="v2-verleih-kopf">
              <p className="v2-chip v2-chip-amber">Verleih</p>
              <h2 className="v2-h2">Ausschankwagen &amp; Technik mieten</h2>
              <p className="v2-sub">
                Für Vereinsfeste, Hochzeiten und Firmenfeiern: unsere Ausschankwagen und
                Veranstaltungstechnik – gepflegt, geprüft und auf Wunsch mit Lieferung.
              </p>
            </div>
            {verleih.length > 0 && (
              <div className="v2-grid-verleih">
                {verleih.map((item) => {
                  const verfuegbar = item.verfuegbar !== false
                  return (
                    <article key={item.id} data-reveal="" className="v2-verleih-karte">
                      <div className="v2-verleih-bild">
                        <div className="ph ph-dark" aria-hidden="true">
                          {item.name}
                        </div>
                      </div>
                      <div className="v2-verleih-body">
                        {item.kategorie && (
                          <p className="v2-verleih-kat">
                            {VERLEIH_KATEGORIE_LABELS[item.kategorie] ?? item.kategorie}
                          </p>
                        )}
                        <h3 className="v2-verleih-name">{item.name}</h3>
                        {item.beschreibung && (
                          <p className="v2-verleih-besch">{item.beschreibung}</p>
                        )}
                        {item.preisInfo && <p className="v2-verleih-preis">{item.preisInfo}</p>}
                        <p className={`v2-verleih-status${verfuegbar ? '' : ' ist-anfrage'}`}>
                          <span className="punkt" />
                          {verfuegbar ? 'Verfügbar' : 'Auf Anfrage'}
                        </p>
                      </div>
                    </article>
                  )
                })}
              </div>
            )}
            <p data-reveal="" className="v2-verleih-hinweis">
              Anfragen mit Wunschtermin an <a href={`mailto:${email}`}>{email}</a> – Abholung in
              64367 Mühltal oder Lieferung nach Absprache.
            </p>
          </div>
        </div>
      </section>

      {/* KONTAKT + FOOTER */}
      <footer id="kontakt" className="v2-footer">
        <div className="v2-footer-inner">
          <div className="v2-footer-grid">
            <div data-reveal="">
              <p className="v2-chip v2-chip-bronze">Kontakt</p>
              <h2 className="v2-h2">Besuchen Sie uns im Mühltal.</h2>
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
              <p className="v2-footer-label">Erreichbarkeit</p>
              <p className="adr" style={{ marginBottom: 18 }}>
                <a className="mail" href={`tel:${telefon.replace(/[^\d+]/g, '')}`}>
                  {telefon}
                </a>
                <br />
                <a className="mail" href={`mailto:${email}`}>
                  {email}
                </a>
              </p>
              <div className="v2-social">
                <a href={kontakt.instagram || 'https://instagram.com'}>Instagram</a>
                <a href={kontakt.facebook || 'https://facebook.com'}>Facebook</a>
              </div>
            </div>
            <div data-reveal="">
              <p className="v2-footer-label">Hofverkauf &amp; Vinothek</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 15 }}>
                {zeiten.map((eintrag, i) =>
                  eintrag.length === 2 ? (
                    <p
                      key={i}
                      className={`v2-oeff-row${eintrag[1].toLowerCase().includes('geschlossen') ? ' zu' : ''}`}
                    >
                      <span>{eintrag[0]}</span>
                      <span>{eintrag[1]}</span>
                    </p>
                  ) : (
                    <p key={i} className="v2-oeff-row">
                      {eintrag[0]}
                    </p>
                  ),
                )}
              </div>
            </div>
          </div>
          <p data-reveal="" className="v2-watermark">
            {name}
          </p>
          <div className="v2-footer-bottom">
            <p>
              © {new Date().getFullYear()} {name} · Genuss mit Verantwortung – ab 18 Jahren.
            </p>
            <div className="v2-footer-legal">
              <a href="#">Impressum</a>
              <a href="#">Datenschutz</a>
              <a href="#">AGB Verleih</a>
            </div>
          </div>
        </div>
      </footer>

      <ScrollReveal distance={28} duration={0.9} threshold={0.12} />
    </div>
  )
}
