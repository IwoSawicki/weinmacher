import React from 'react'

export function Ueber() {
  return (
    <section id="ueber" className="ueber">
      <div className="ueber-grid">
        <div data-reveal="" className="ueber-bild bild-rahmen">
          {/* Winzer-Porträt folgt in Phase 3 */}
          <div className="bild-platzhalter" aria-hidden="true" />
        </div>
        <div data-reveal="">
          <p className="kicker">Über uns</p>
          <h2 className="section-titel ueber-titel">Drei Generationen, ein Tal, ehrlicher Wein.</h2>
          <p className="ueber-text">
            Was 1962 mit zwei Hektar Steillage begann, führt Jakob Stolz heute in dritter Generation
            weiter: acht Hektar Riesling, Burgunder und alte rote Sorten, von Hand gepflegt und
            schonend im Gewölbekeller ausgebaut.
          </p>
          <p className="ueber-text">
            Wir arbeiten naturnah, verzichten auf Herbizide und lassen jedem Jahrgang die Zeit, die
            er braucht. Das Ergebnis sind Weine mit klarer Frucht, feiner Mineralität – und der
            Handschrift des Mühltals.
          </p>
          <p className="ueber-zitat">
            „Guter Wein entsteht im Weinberg. Im Keller darf man ihn nur nicht stören.“
          </p>
          <p className="ueber-zitat-autor">— Jakob Stolz, Winzer</p>
        </div>
      </div>
    </section>
  )
}
