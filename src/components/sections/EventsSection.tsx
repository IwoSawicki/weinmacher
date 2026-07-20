import { RichText } from '@payloadcms/richtext-lexical/react'
import React from 'react'

import { formatEventDatum, normalisiereLink } from '@/lib/format'
import type { Event } from '@/payload-types'

export function EventsSection({ events }: { events: Event[] }) {
  return (
    <section id="events" className="events">
      <div data-reveal="" className="events-kopf">
        <p className="kicker">Events</p>
        <h2 className="section-titel">Kommende Veranstaltungen</h2>
        <p className="section-sub">
          Weinproben, Feste und Genussabende – direkt bei uns am Hof und im Gewölbekeller.
        </p>
      </div>
      {events.length === 0 ? (
        <p className="leer-hinweis">
          Aktuell sind keine Veranstaltungen geplant – schauen Sie bald wieder vorbei.
        </p>
      ) : (
        <div className="events-liste">
          {events.map((event) => {
            const pdf =
              event.pdf && typeof event.pdf === 'object' && event.pdf.url ? event.pdf.url : null
            return (
              <article
                key={event.id}
                data-reveal=""
                className={`event-karte${event.ausgebucht ? ' ist-ausgebucht' : ''}`}
              >
                <div>
                  <p className="event-datum">{formatEventDatum(event.datum)}</p>
                  <h3 className="event-titel">
                    {event.titel}
                    {event.ausgebucht && <span className="badge event-badge">Ausgebucht</span>}
                  </h3>
                  {event.ort && <p className="event-ort">{event.ort}</p>}
                </div>
                <div>
                  {event.beschreibung && (
                    <div className="event-beschreibung">
                      <RichText data={event.beschreibung} />
                    </div>
                  )}
                  {event.preis && <p className="event-preis">{event.preis}</p>}
                </div>
                <div className="event-buttons">
                  {pdf && (
                    <a href={pdf} target="_blank" rel="noopener noreferrer" className="event-btn-pdf">
                      Details (PDF)
                    </a>
                  )}
                  {!event.ausgebucht && event.anmeldeLink && (
                    <a href={normalisiereLink(event.anmeldeLink)} className="event-btn-anmelden">
                      Anmelden
                    </a>
                  )}
                  {event.ausgebucht && <span className="event-warteliste">Warteliste</span>}
                </div>
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}
