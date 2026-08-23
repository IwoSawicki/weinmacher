const preisFormatter = new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR',
})

export function formatPreis(preis: number): string {
  return preisFormatter.format(preis)
}

const datumFormatter = new Intl.DateTimeFormat('de-DE', {
  weekday: 'short',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'Europe/Berlin',
})

const zeitFormatter = new Intl.DateTimeFormat('de-DE', {
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'Europe/Berlin',
})

// "Fr, 11. September 2026 · 19:00 Uhr" – wie in der Designvorlage
export function formatEventDatum(iso: string): string {
  const d = new Date(iso)
  const datum = datumFormatter.format(d).replace('.,', ',')
  return `${datum} · ${zeitFormatter.format(d)} Uhr`
}

// Nur das Datum, ohne Uhrzeit: "Fr, 11. September 2026"
export function formatEventDatumOnly(iso: string): string {
  return datumFormatter.format(new Date(iso)).replace('.,', ',')
}

// Nur die Uhrzeit: "19:00 Uhr"
export function formatEventZeit(iso: string): string {
  return `${zeitFormatter.format(new Date(iso))} Uhr`
}

export const WEINART_LABELS: Record<string, string> = {
  weisswein: 'Weißwein',
  rotwein: 'Rotwein',
  rose: 'Rosé',
  sekt: 'Sekt',
  traubensaft: 'Traubensaft',
  alkoholfrei: 'Alkoholfrei',
  sonstiges: '',
}

// Akzentfarbe der Art-Zeile wie im Design: Rosé/Sekt/Saft/alkoholfrei bronze, sonst lila
export function weinartIstBronze(weinart: string): boolean {
  return (
    weinart === 'rose' ||
    weinart === 'sekt' ||
    weinart === 'traubensaft' ||
    weinart === 'alkoholfrei' ||
    weinart === 'sonstiges'
  )
}

export const VERLEIH_KATEGORIE_LABELS: Record<string, string> = {
  ausschank: 'Ausschank',
  technik: 'Technik',
  mobiliar: 'Mobiliar',
  sonstiges: 'Sonstiges',
}

// Anmelde-Link darf E-Mail-Adresse oder URL sein
export function normalisiereLink(link: string): string {
  if (link.includes('@') && !link.includes(':') && !link.includes('/')) {
    return `mailto:${link}`
  }
  return link
}

// Google-Maps-Link für ein Event: entweder der gepflegte Karten-Link,
// sonst eine Kartensuche nach dem Ort. Gibt null zurück, wenn beides fehlt.
export function mapsHref(
  kartenLink: string | null | undefined,
  ort: string | null | undefined,
): string | null {
  if (kartenLink && kartenLink.trim()) {
    const l = kartenLink.trim()
    return l.startsWith('http') ? l : `https://${l}`
  }
  if (ort && ort.trim()) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ort.trim())}`
  }
  return null
}

export const OEFFNUNGSZEITEN_FALLBACK: Array<[string, string]> = [
  ['Mi – Fr', '15 – 19 Uhr'],
  ['Samstag', '10 – 18 Uhr'],
  ['Sonntag', '11 – 17 Uhr'],
  ['Mo & Di', 'geschlossen'],
]

// Öffnungszeiten aus dem Textarea-Feld: eine Zeile pro Eintrag, optional „links | rechts“
export function parseOeffnungszeiten(text?: string | null): Array<[string, string] | [string]> {
  if (!text) return OEFFNUNGSZEITEN_FALLBACK
  return text
    .split('\n')
    .map((zeile) => zeile.trim())
    .filter(Boolean)
    .map((zeile) => {
      const teile = zeile.split('|').map((t) => t.trim())
      return teile.length >= 2 ? [teile[0], teile.slice(1).join(' ')] : [zeile]
    })
}
