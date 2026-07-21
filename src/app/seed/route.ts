import { NextResponse, type NextRequest } from 'next/server'
import { getPayload } from 'payload'

import config from '@/payload.config'

export const dynamic = 'force-dynamic'

// Minimaler gültiger Lexical-RichText für Event-Beschreibungen
function lexical(text: string) {
  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr' as const,
      children: [
        {
          type: 'paragraph',
          format: '',
          indent: 0,
          version: 1,
          direction: 'ltr' as const,
          textFormat: 0,
          children: [
            { type: 'text', format: 0, style: '', mode: 'normal', detail: 0, text, version: 1 },
          ],
        },
      ],
    },
  }
}

function inTagen(tage: number, stunde = 19): string {
  const d = new Date()
  d.setDate(d.getDate() + tage)
  d.setHours(stunde, 0, 0, 0)
  return d.toISOString()
}

// Befüllen der Datenbank.
// Aufruf: /seed?secret=<PAYLOAD_SECRET>              (idempotent – nur leere Bereiche)
//         /seed?secret=...&reset=events              (Events loeschen + echte Termine laden)
//         /seed?secret=...&reset=kontakt             (Adresse aktualisieren)
//         /seed?secret=...&reset=all                 (beides)
export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  if (!secret || secret !== process.env.PAYLOAD_SECRET) {
    return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 })
  }

  const reset = (req.nextUrl.searchParams.get('reset') || '').toLowerCase()
  const resetEvents = reset === 'events' || reset === 'all'
  const resetKontakt = reset === 'kontakt' || reset === 'all'

  const payload = await getPayload({ config: await config })
  const ergebnis: Record<string, string> = {}

  // --- WEINE ---
  const weineCount = await payload.count({ collection: 'weine' })
  if (weineCount.totalDocs === 0) {
    const weine = [
      {
        name: 'Mühltaler Riesling',
        weinart: 'weisswein',
        jahrgang: 2024,
        rebsorte: 'Riesling',
        beschreibung:
          'Knackige Säure, grüner Apfel und feiner Feuerstein – unser Klassiker von der Steillage.',
        preis: 12.5,
        flaschengroesse: '0,75 l',
        ausverkauft: false,
      },
      {
        name: 'Steinmühle',
        weinart: 'weisswein',
        jahrgang: 2023,
        rebsorte: 'Grauburgunder',
        beschreibung:
          'Reife Birne, ein Hauch Nuss und cremiger Schmelz – ausgebaut im großen Holzfass.',
        preis: 11.9,
        flaschengroesse: '0,75 l',
        ausverkauft: true,
      },
      {
        name: 'Rosé vom Hang',
        weinart: 'rose',
        jahrgang: 2024,
        rebsorte: 'Portugieser',
        beschreibung:
          'Zartes Lachsrosa, saftige Erdbeere, herrlich unkompliziert – der Sommer im Glas.',
        preis: 9.8,
        flaschengroesse: '0,75 l',
        ausverkauft: false,
      },
      {
        name: 'Alte Rebe',
        weinart: 'rotwein',
        jahrgang: 2022,
        rebsorte: 'Spätburgunder',
        beschreibung:
          'Von über 40 Jahre alten Stöcken: Sauerkirsche, Waldboden und seidiges Tannin.',
        preis: 18.9,
        flaschengroesse: '0,75 l',
        ausverkauft: false,
      },
      {
        name: 'Cuvée Bronze',
        weinart: 'rotwein',
        jahrgang: 2021,
        rebsorte: 'Merlot & Dornfelder',
        beschreibung:
          'Unser Flaggschiff: 18 Monate Barrique, dunkle Beeren, Kakao und langer Abgang.',
        preis: 21.5,
        flaschengroesse: '0,75 l',
        ausverkauft: false,
      },
    ]
    for (const w of weine) {
      await payload.create({ collection: 'weine', data: w as never })
    }
    ergebnis.weine = `${weine.length} angelegt`
  } else {
    ergebnis.weine = `übersprungen (${weineCount.totalDocs} vorhanden)`
  }

  // --- EVENTS (echte WeinZeit-Ausschanktermine im Weinberg) ---
  const eventsCount = await payload.count({ collection: 'events' })
  if (resetEvents && eventsCount.totalDocs > 0) {
    await payload.delete({ collection: 'events', where: { id: { exists: true } } })
  }
  if (resetEvents || eventsCount.totalDocs === 0) {
    const beschr = lexical(
      'WeinZeit – offener Ausschank im Weinberg auf der Schmallert in Nieder-Ramstadt. Samstag ab 17 Uhr, Sonntag ab 14 Uhr. Kommen Sie vorbei – wir freuen uns auf Sie.',
    )
    const events = [
      { datum: '2026-07-25T17:00:00+02:00' },
      { datum: '2026-08-29T17:00:00+02:00' },
      { datum: '2026-09-26T17:00:00+02:00' },
      { datum: '2026-10-24T17:00:00+02:00' },
    ].map((e) => ({
      titel: 'WeinZeit – Ausschank im Weinberg',
      datum: e.datum,
      ort: 'Weinberg auf der Schmallert, Nieder-Ramstadt',
      beschreibung: beschr,
      preis: 'Eintritt frei',
      ausgebucht: false,
    }))
    for (const e of events) {
      await payload.create({ collection: 'events', data: e as never })
    }
    ergebnis.events = resetEvents ? `${events.length} neu geladen (Reset)` : `${events.length} angelegt`
  } else {
    ergebnis.events = `übersprungen (${eventsCount.totalDocs} vorhanden) – echte Termine per ?reset=events`
  }

  // --- VERLEIH ---
  const verleihCount = await payload.count({ collection: 'verleih' })
  if (verleihCount.totalDocs === 0) {
    const verleih = [
      {
        name: 'Ausschankwagen „Klara“',
        kategorie: 'ausschank',
        beschreibung:
          'Holzverkleideter Anhänger mit 4 Zapfhähnen, Kühlung und Beleuchtung – für bis zu 300 Gäste.',
        preisInfo: '180 € / Tag',
        verfuegbar: true,
      },
      {
        name: 'Kühlanhänger',
        kategorie: 'technik',
        beschreibung:
          'Begehbarer Kühlanhänger (2–8 °C) für Getränke und Lebensmittel, inkl. Einweisung.',
        preisInfo: '90 € / Tag',
        verfuegbar: true,
      },
      {
        name: 'Zapfanlage & Schanktechnik',
        kategorie: 'technik',
        beschreibung:
          'Mobile Durchlaufkühler, CO₂, Gläserspüle und Theken-Elemente – einzeln oder im Set.',
        preisInfo: 'ab 50 € / Tag',
        verfuegbar: false,
      },
      {
        name: 'Licht- & Tontechnik',
        kategorie: 'technik',
        beschreibung:
          'PA-Anlage bis 200 Personen, Funkmikrofone und stimmungsvolle Außenbeleuchtung.',
        preisInfo: 'ab 120 € / Tag',
        verfuegbar: false,
      },
    ]
    for (const v of verleih) {
      await payload.create({ collection: 'verleih', data: v as never })
    }
    ergebnis.verleih = `${verleih.length} angelegt`
  } else {
    ergebnis.verleih = `übersprungen (${verleihCount.totalDocs} vorhanden)`
  }

  // --- KONTAKT (Global) ---
  const kontakt = await payload.findGlobal({ slug: 'kontakt' })
  const ADRESSE = 'Griesbachweg 16\n64367 Mühltal'
  if (!kontakt.name && !kontakt.adresse) {
    await payload.updateGlobal({
      slug: 'kontakt',
      data: {
        name: 'Weinmacher Mühltal',
        adresse: ADRESSE,
        email: 'hallo@weinmacher-muehltal.de',
        oeffnungszeiten:
          'Mi – Fr | 15 – 19 Uhr\nSamstag | 10 – 18 Uhr\nSonntag | 11 – 17 Uhr\nMo & Di | geschlossen',
      } as never,
    })
    ergebnis.kontakt = 'befüllt'
  } else if (resetKontakt) {
    // Nur die Adresse aktualisieren, restliche gepflegte Felder unangetastet lassen
    await payload.updateGlobal({ slug: 'kontakt', data: { adresse: ADRESSE } as never })
    ergebnis.kontakt = 'Adresse aktualisiert (Reset)'
  } else {
    ergebnis.kontakt = 'übersprungen (bereits gepflegt) – Adresse per ?reset=kontakt'
  }

  return NextResponse.json({ ok: true, ergebnis })
}
