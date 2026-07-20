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

// Einmaliges Befüllen der Datenbank mit Platzhalter-Inhalten.
// Aufruf: /seed?secret=<PAYLOAD_SECRET>  (idempotent – füllt nur leere Bereiche)
export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  if (!secret || secret !== process.env.PAYLOAD_SECRET) {
    return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 })
  }

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

  // --- EVENTS ---
  const eventsCount = await payload.count({ collection: 'events' })
  if (eventsCount.totalDocs === 0) {
    const events = [
      {
        titel: 'Weinprobe im Gewölbekeller',
        datum: inTagen(21, 19),
        ort: 'Gewölbekeller, Mühlweg 12',
        beschreibung: lexical(
          'Sechs Weine des Jahrgangs, begleitet von regionaler Brotzeit. Frank Köth führt persönlich durch den Abend.',
        ),
        preis: '39 € pro Person',
        anmeldeLink: 'events@weinmacher-muehltal.de',
        ausgebucht: false,
      },
      {
        titel: 'Sommerfest zwischen den Reben',
        datum: inTagen(45, 15),
        ort: 'Weinberg „Am Steinbruch“',
        beschreibung: lexical(
          'Offene Weinstände, Flammkuchen aus dem Holzofen und Livemusik bis in die Nacht – mitten im Weinberg.',
        ),
        preis: 'Eintritt 8 €, Kinder frei',
        ausgebucht: true,
      },
      {
        titel: 'Federweißer & Zwiebelkuchen',
        datum: inTagen(80, 12),
        ort: 'Hof & Vinothek',
        beschreibung: lexical(
          'Frisch gepresster Federweißer, warmer Zwiebelkuchen und Kellerführungen zur vollen Stunde.',
        ),
        preis: 'Eintritt frei',
        anmeldeLink: 'events@weinmacher-muehltal.de',
        ausgebucht: false,
      },
    ]
    for (const e of events) {
      await payload.create({ collection: 'events', data: e as never })
    }
    ergebnis.events = `${events.length} angelegt`
  } else {
    ergebnis.events = `übersprungen (${eventsCount.totalDocs} vorhanden)`
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
  if (!kontakt.name && !kontakt.adresse) {
    await payload.updateGlobal({
      slug: 'kontakt',
      data: {
        name: 'Weinmacher Mühltal',
        adresse: 'Frank Köth\nMühlweg 12\n64367 Mühltal',
        telefon: '06151 / 928 73 40',
        email: 'hallo@weinmacher-muehltal.de',
        oeffnungszeiten:
          'Mi – Fr | 15 – 19 Uhr\nSamstag | 10 – 18 Uhr\nSonntag | 11 – 17 Uhr\nMo & Di | geschlossen',
      } as never,
    })
    ergebnis.kontakt = 'befüllt'
  } else {
    ergebnis.kontakt = 'übersprungen (bereits gepflegt)'
  }

  return NextResponse.json({ ok: true, ergebnis })
}
