import type { Metadata } from 'next'
import localFont from 'next/font/local'
import Script from 'next/script'
import React from 'react'
import './styles.css'

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

export const metadata: Metadata = {
  title: 'Weinmacher Mühltal – Weingut, Events & Verleih',
  description:
    'Familienweingut im Mühltal: handgelesene Weine, Weinproben und Feste sowie Verleih von Ausschankwagen und Veranstaltungstechnik.',
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
