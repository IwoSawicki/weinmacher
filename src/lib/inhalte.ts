// =====================================================================
//  Zentrale Inhalte der Website – ALLES hart im Code, kein Backend / keine DB.
//  Zum Pflegen einfach hier die Werte anpassen (Texte, Preise, Termine, Bilder).
// =====================================================================

export type Weinart =
  | 'weisswein'
  | 'rotwein'
  | 'rose'
  | 'sekt'
  | 'traubensaft'
  | 'alkoholfrei'

export type Wein = {
  name: string
  kicker?: string // kleiner Zusatz über dem Namen, z. B. „1494"
  weinart: Weinart
  rebsorte?: string
  beschreibung: string
  preis?: number // in Euro; weglassen = kein Preis anzeigen
  flaschengroesse?: string
  bild?: string // Pfad unter /public, z. B. '/bilder/weine/xyz.webp'
  ausverkauft?: boolean
}

export const WEINE: Wein[] = [
  {
    name: 'Bartholomäus',
    kicker: '1494',
    weinart: 'weisswein',
    rebsorte: 'Rivaner & Cabernet Blanc',
    beschreibung:
      'Unser heimischer Weißwein – eine Cuvée aus Rivaner und Cabernet Blanc. Frisch, saftig und angenehm unkompliziert: Wein, der nach Zuhause schmeckt.',
    preis: 8.5,
    flaschengroesse: '0,75 l',
    bild: '/bilder/weine/bartholomaeus.webp',
    ausverkauft: false,
  },
  {
    name: 'außerHALB',
    weinart: 'weisswein',
    rebsorte: 'Cabernet Blanc',
    beschreibung:
      'Unser trockener Weißwein für jeden Tag – klar, animierend und mit feiner Frucht. Der perfekte Begleiter für laue Abende im Grünen.',
    preis: 8.5,
    flaschengroesse: '0,75 l',
    bild: '/bilder/weine/ausserhalb-weiss.webp',
    ausverkauft: false,
  },
  {
    name: 'außerHALB Rosé',
    weinart: 'rose',
    rebsorte: 'Regent & Cabernet Cortis',
    beschreibung:
      'Unser Rosé: zartrosa, fruchtig und herrlich leicht. Sommer im Glas – am besten gut gekühlt im Weinberg oder auf der Terrasse.',
    preis: 8.5,
    flaschengroesse: '0,75 l',
    bild: '/bilder/weine/ausserhalb-rose.webp',
    ausverkauft: false,
  },
  {
    name: '0,nix',
    weinart: 'alkoholfrei',
    rebsorte: 'Riesling · alkoholfrei',
    beschreibung:
      'Unser alkoholfreier Riesling: der volle Riesling-Genuss – aber ganz ohne Alkohol. Null Promille, null Kompromisse.',
    preis: 8.5,
    flaschengroesse: '0,75 l',
    bild: '/bilder/weine/0-nix.webp',
    ausverkauft: false,
  },
]

// --- Weingelee / weitere Produkte ---
export type Produkt = {
  name: string
  variante?: string // z. B. „Passierte Cuvée"
  preis?: number // in Euro
  beschreibung: string
  badge?: string // z. B. „Bio-Qualität"
  bild?: string
}

export const GELEE: Produkt[] = [
  {
    name: 'Trauben-Gelee Weiß',
    variante: 'Passierte Cuvée',
    preis: 4.3,
    beschreibung:
      'Feines Weingelee aus unseren weißen Trauben – hell, fruchtig und zart. Ohne künstliche Farb- und Konservierungsstoffe, hausgemacht.',
    badge: 'Bio-Qualität',
    bild: '/bilder/produkte/gelee-weiss.webp',
  },
  {
    name: 'Trauben-Gelee Rot',
    variante: 'Passierte Cuvée',
    preis: 4.3,
    beschreibung:
      'Kräftiges Weingelee aus unseren roten Trauben – tief, aromatisch und vollmundig. Ohne künstliche Farb- und Konservierungsstoffe, hausgemacht.',
    badge: 'Bio-Qualität',
    bild: '/bilder/produkte/gelee-rot.webp',
  },
]

export type Event = {
  titel: string
  datum: string // ISO-Datum, z. B. '2026-10-24T17:00:00+02:00'
  ort?: string
  kartenLink?: string // optionaler Google-Maps-Link; leer = Suche nach Ort
  zeiten?: string // mehrtägig: Zeilen „Tag | Uhrzeit"
  beschreibung?: string
  preis?: string
  ausgebucht?: boolean
}

// WeinZeit – offener Ausschank im Weinberg. Termine hier pflegen.
export const EVENTS: Event[] = [
  {
    titel: 'WeinZeit – Ausschank im Weinberg',
    datum: '2026-10-24T17:00:00+02:00',
    ort: 'Weinberg auf der Schmallert, Nieder-Ramstadt',
    zeiten: 'Samstag | ab 17 Uhr\nSonntag | ab 14 Uhr',
    beschreibung:
      'WeinZeit – offener Ausschank im Weinberg auf der Schmallert in Nieder-Ramstadt. Ein ganzes Wochenende bei Wein und guter Aussicht. Komm vorbei – wir freuen uns auf dich.',
    preis: 'Eintritt frei',
    ausgebucht: false,
  },
]

// Nur kommende Events (heute oder später), chronologisch sortiert.
export function kommendeEvents(): Event[] {
  const heute = new Date()
  heute.setHours(0, 0, 0, 0)
  return EVENTS.filter((e) => new Date(e.datum) >= heute).sort((a, b) =>
    a.datum.localeCompare(b.datum),
  )
}

export const KONTAKT = {
  name: 'Nieder-Ramstädter Weinmacher',
  firmierung: 'Weinbau Köth & Raffold KG',
  adresse: 'Griesbachweg 16\n64367 Mühltal',
  telefon: '06151 6795 768',
  email: 'koeth.weinbau@gmx.de',
  instagram: '', // vollständigen Link eintragen, um das Icon anzuzeigen
  facebook: '',
  // Impressum
  handelsregister: 'Amtsgericht Darmstadt, HRA 86678',
  ustId: 'DE336356081',
  inhaber: 'Frank Köth',
}

// Bild-Pfade unter /public. Leer lassen = schöner Verlauf/Platzhalter statt Bild.
export const BILDER = {
  heroVideo: '/bilder/hero.mp4', // Drohnen-Reel über Nieder-Ramstadt (Querformat, ohne Ton)
  heroVideoMobile: '/bilder/hero-mobile.mp4', // kleinere Version für Mobil (spart Daten)
  heroPoster: '/bilder/hero-poster.jpg', // Standbild, bis das Video lädt
  heroPosterMobile: '/bilder/hero-poster-mobile.jpg', // Hochkant-Standbild für Mobil
  hero: '', // optionales Standbild statt Video (z. B. '/bilder/hero.jpg')
  ueber: '/bilder/ueber.webp', // Tim & Frank im Weinberg
  logo: '', // z. B. '/bilder/logo.png' (Header/Favicon)
  // Social-/Link-Vorschau (Open Graph). Vorerst das Bartholomäus-Bild.
  og: '/bilder/weine/bartholomaeus.webp',
}
