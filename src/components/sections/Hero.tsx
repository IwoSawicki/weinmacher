import React from 'react'

export function Hero() {
  return (
    <header id="start" className="hero">
      {/* Hero-Foto folgt in Phase 3 – bis dahin stimmungsvoller Farbverlauf */}
      <div className="hero-bild" />
      <div className="hero-verlauf" />
      <div className="hero-inhalt">
        <p className="hero-kicker">Familienweingut im Mühltal</p>
        <h1 className="hero-titel">Wein, der nach Zuhause schmeckt.</h1>
        <p className="hero-text">
          Handgelesen, langsam ausgebaut, in kleinen Mengen gefüllt – seit drei Generationen an den
          Hängen des Mühltals.
        </p>
        <a href="#weine" className="hero-cta">
          Unsere Weine entdecken
        </a>
      </div>
    </header>
  )
}
