import type { Metadata } from 'next'
import localFont from 'next/font/local'
import Script from 'next/script'
import React from 'react'

import { BILDER } from '@/lib/inhalte'
import './styles.css'

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'https://weinmacher-muehltal.de'
const TITEL = 'Nieder-Ramstädter Weinmacher – Wein aus dem Frankensteiner Land'
const BESCHREIBUNG =
  'Junges Familienweingut im Mühltal: naturbelassen ausgebaute, handgelesene Weine, Events im Weinberg und Verleih rund ums Feiern – aus dem Frankensteiner Land.'

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

const ogBild = BILDER.og || BILDER.hero || undefined

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITEL,
  description: BESCHREIBUNG,
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    siteName: 'Nieder-Ramstädter Weinmacher',
    title: TITEL,
    description: BESCHREIBUNG,
    url: SITE_URL,
    images: ogBild ? [{ url: ogBild, alt: 'Nieder-Ramstädter Weinmacher' }] : undefined,
  },
  twitter: {
    card: 'summary_large_image',
    title: TITEL,
    description: BESCHREIBUNG,
    images: ogBild ? [ogBild] : undefined,
  },
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
