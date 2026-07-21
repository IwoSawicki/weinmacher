import type { Metadata } from 'next'
import { getPayload } from 'payload'
import React from 'react'

import { Footer } from '@/components/sections/Footer'
import { VorschauNav } from '@/components/VorschauNav'
import config from '@/payload.config'

import '../detail.css'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Datenschutzerklärung | Weinmacher Mühltal',
}

export default async function DatenschutzPage() {
  const payload = await getPayload({ config: await config })
  const kontakt = await payload.findGlobal({ slug: 'kontakt' })

  const name = kontakt.name || 'Weinmacher Mühltal'
  const adresse = kontakt.adresse || 'Frank Köth\nMühlweg 12\n64367 Mühltal'
  const email = kontakt.email || 'hallo@weinmacher-muehltal.de'

  return (
    <div className="det">
      <VorschauNav />
      <div className="det-legal">
        <a href="/" className="det-back">
          ← Zur Startseite
        </a>
        <h1>Datenschutzerklärung</h1>

        <h2>1. Datenschutz auf einen Blick</h2>
        <p>
          Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
          personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten
          sind alle Daten, mit denen Sie persönlich identifiziert werden können.
        </p>

        <h2>2. Verantwortliche Stelle</h2>
        <address>
          {name}
          <br />
          {adresse.split('\n').map((z, i) => (
            <React.Fragment key={i}>
              {z}
              <br />
            </React.Fragment>
          ))}
          E-Mail: <a href={`mailto:${email}`}>{email}</a>
        </address>
        <p>
          Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder
          gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen
          Daten entscheidet.
        </p>

        <h2>3. Hosting</h2>
        <p>
          Diese Website wird auf eigener Infrastruktur bei der Hetzner Online GmbH, Industriestr. 25,
          91710 Gunzenhausen, gehostet. Die Server stehen in Deutschland. Beim Besuch der Website
          werden technisch notwendige Daten (siehe Server-Logfiles) verarbeitet. Rechtsgrundlage ist
          unser berechtigtes Interesse an einem sicheren und effizienten Betrieb (Art. 6 Abs. 1 lit.
          f DSGVO).
        </p>

        <h2>4. Server-Logfiles</h2>
        <p>
          Der Provider bzw. Server erhebt und speichert automatisch Informationen in sogenannten
          Server-Logfiles, die Ihr Browser automatisch übermittelt. Dies sind: Browsertyp und
          -version, verwendetes Betriebssystem, Referrer-URL, Hostname des zugreifenden Rechners,
          Uhrzeit der Serveranfrage und die IP-Adresse. Eine Zusammenführung dieser Daten mit anderen
          Datenquellen wird nicht vorgenommen. Die Erfassung erfolgt auf Grundlage von Art. 6 Abs. 1
          lit. f DSGVO.
        </p>

        <h2>5. Kontaktaufnahme</h2>
        <p>
          Wenn Sie uns per E-Mail oder Telefon kontaktieren, werden Ihre Angaben zur Bearbeitung der
          Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir
          nicht ohne Ihre Einwilligung weiter. Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs.
          1 lit. b DSGVO (Anbahnung/Erfüllung eines Vertrags) bzw. lit. f DSGVO.
        </p>

        <h2>6. Reichweitenmessung (Analytics)</h2>
        <p>
          Zur Verbesserung unseres Angebots setzen wir eine selbst gehostete, datensparsame
          Web-Analyse ein. Dabei werden anonymisierte Nutzungsdaten ohne Cookies erhoben; eine
          Identifizierung einzelner Besucher ist nicht möglich. Rechtsgrundlage ist Art. 6 Abs. 1
          lit. f DSGVO.{' '}
          <span className="platzhalter">
            Bitte prüfen, ob das eingesetzte Tool cookielos/anonym arbeitet und ggf. anpassen.
          </span>
        </p>

        <h2>7. Ihre Rechte</h2>
        <p>Sie haben jederzeit das Recht auf:</p>
        <ul>
          <li>Auskunft über Ihre gespeicherten Daten (Art. 15 DSGVO)</li>
          <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
          <li>Löschung (Art. 17 DSGVO) und Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
          <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
          <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
          <li>Beschwerde bei einer Aufsichtsbehörde (Art. 77 DSGVO)</li>
        </ul>

        <h2>8. SSL-/TLS-Verschlüsselung</h2>
        <p>
          Diese Seite nutzt aus Sicherheitsgründen eine SSL- bzw. TLS-Verschlüsselung. Eine
          verschlüsselte Verbindung erkennen Sie am „https://" in der Adresszeile Ihres Browsers.
        </p>

        <p style={{ marginTop: 40, fontSize: 14 }}>
          <span className="platzhalter">Hinweis</span> Diese Datenschutzerklärung ist eine Vorlage
          und ersetzt keine Rechtsberatung. Bitte vor dem Livegang rechtlich prüfen und an die
          tatsächlich eingesetzten Dienste anpassen.
        </p>
      </div>
      <Footer kontakt={kontakt} />
    </div>
  )
}
