import type { Metadata } from 'next'
import localFont from 'next/font/local'
import Script from 'next/script'
import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import './styles.css'

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'https://weinmacher-muehltal.de'
const TITEL = 'Nieder-Ramstädter Weinmacher – Wein aus dem Frankensteiner Land'
const BESCHREIBUNG =
  'Junges Familienweingut im Mühltal: naturbelassen ausgebaute, handgelesene Weine, Events im Weinberg und Verleih rund ums Feiern – aus dem Frankensteiner Land.'

// URL einer bestimmten Bildgröße aus einem Payload-Upload-Feld ziehen (null-sicher).
function bildUrl(feld: unknown, groesse: 'hero' | 'favicon'): string | undefined {
  if (!feld || typeof feld !== 'object') return undefined
  const m = feld as { url?: string; sizes?: Record<string, { url?: string }> }
  return m.sizes?.[groesse]?.url || m.url || undefined
}

// Fonts aus der Designvorlage (self-hosted, kein Google-CDN → DSGVO-sauber)
const serif = localFont({
  src: [
    { path: './fonts/cormorant-garamond.woff2', weight: '400 600', style: 'normal' },
    { path: './fonts/cormorant-garamond-italic.woff2', weight: '400', style: 'italic' },
  ],
  variable: '--font-serif',
  display: 'swap',
})

const sans = localFont({
  src: [{ path: './fonts/karla.woff2', weight: '300 600', style: 'normal' }],
  variable: '--font-sans',
  display: 'swap',
})

export async function generateMetadata(): Promise<Metadata> {
  // Logo (Favicon) und Hero-Bild (OG/Social) aus dem CMS ziehen.
  let faviconUrl: string | undefined
  let heroUrl: string | undefined
  try {
    const payload = await getPayload({ config: await config })
    const website = await payload.findGlobal({ slug: 'website' })
    faviconUrl = bildUrl(website?.logo, 'favicon')
    heroUrl = bildUrl(website?.heroBild, 'hero')
  } catch {
    // Beim Build (ohne DB) einfach die Basis-Metadaten ausliefern.
  }

  const ogBilder = heroUrl
    ? [{ url: heroUrl, width: 1200, height: 630, alt: 'Nieder-Ramstädter Weinmacher' }]
    : undefined

  return {
    metadataBase: new URL(SITE_URL),
    title: TITEL,
    description: BESCHREIBUNG,
    icons: faviconUrl ? { icon: [{ url: faviconUrl }], apple: [{ url: faviconUrl }] } : undefined,
    openGraph: {
      type: 'website',
      locale: 'de_DE',
      siteName: 'Nieder-Ramstädter Weinmacher',
      title: TITEL,
      description: BESCHREIBUNG,
      url: SITE_URL,
      images: ogBilder,
    },
    twitter: {
      card: 'summary_large_image',
      title: TITEL,
      description: BESCHREIBUNG,
      images: heroUrl ? [heroUrl] : undefined,
    },
  }
}

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="de" className={`${serif.variable} ${sans.variable}`}>
      <body>
        {children}
        <Script
          src="https://analytics.stolz-marketing.de/script.js"
          data-website-id="d10eb3b6-0877-4dab-b913-a982ed393201"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
