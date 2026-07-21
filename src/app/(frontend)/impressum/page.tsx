import type { Metadata } from 'next'
import { getPayload } from 'payload'
import React from 'react'

import { Footer } from '@/components/sections/Footer'
import { VorschauNav } from '@/components/VorschauNav'
import config from '@/payload.config'

import '../detail.css'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Impressum | Weinmacher Mühltal',
}

export default async function ImpressumPage() {
  const payload = await getPayload({ config: await config })
  const kontakt = await payload.findGlobal({ slug: 'kontakt' })

  const name = kontakt.name || 'Weinmacher Mühltal'
  const adresse = kontakt.adresse || 'Frank Köth\nMühlweg 12\n64367 Mühltal'
  const telefon = kontakt.telefon || '06151 / 928 73 40'
  const email = kontakt.email || 'hallo@weinmacher-muehltal.de'

  return (
    <div className="det">
      <VorschauNav />
      <div className="det-legal">
        <a href="/" className="det-back">
          ← Zur Startseite
        </a>
        <h1>Impressum</h1>

        <h2>Angaben gemäß § 5 DDG</h2>
        <address>
          {name}
          <br />
          {adresse.split('\n').map((z, i) => (
            <React.Fragment key={i}>
              {z}
              <br />
            </React.Fragment>
          ))}
        </address>

        <h2>Kontakt</h2>
        <p>
          Telefon: <a href={`tel:${telefon.replace(/[^\d+]/g, '')}`}>{telefon}</a>
          <br />
          E-Mail: <a href={`mailto:${email}`}>{email}</a>
        </p>

        <h2>Umsatzsteuer-ID</h2>
        <p>
          Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:{' '}
          <span className="platzhalter">[bitte ergänzen]</span>
        </p>

        <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
        <p>
          Frank Köth
          <br />
          Anschrift wie oben
        </p>

        <h2>EU-Streitschlichtung</h2>
        <p>
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
          <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">
            https://ec.europa.eu/consumers/odr/
          </a>
          . Unsere E-Mail-Adresse finden Sie oben im Impressum.
        </p>

        <h2>Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
        <p>
          Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
          Verbraucherschlichtungsstelle teilzunehmen.
        </p>

        <h2>Haftung für Inhalte</h2>
        <p>
          Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach
          den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter
          jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu
          überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
        </p>

        <h2>Haftung für Links</h2>
        <p>
          Unser Angebot enthält ggf. Links zu externen Websites Dritter, auf deren Inhalte wir keinen
          Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
          Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der
          Seiten verantwortlich.
        </p>

        <h2>Urheberrecht</h2>
        <p>
          Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
          dem deutschen Urheberrecht. Beiträge Dritter sind als solche gekennzeichnet.
        </p>

        <p style={{ marginTop: 40, fontSize: 14 }}>
          <span className="platzhalter">Hinweis</span> Diese Angaben sind eine Vorlage. Bitte prüfen
          Sie sie vor dem Livegang rechtlich und ergänzen Sie die markierten Platzhalter.
        </p>
      </div>
      <Footer kontakt={kontakt} />
    </div>
  )
}
