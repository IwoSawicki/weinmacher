import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Seite nicht gefunden – Weinmacher Mühltal',
}

// Globale 404-Seite. Da die App mit Route-Groups ohne Root-Layout arbeitet,
// rendert diese Seite bewusst eigenes <html>/<body>.
export default function NotFound() {
  return (
    <html lang="de">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#ffffff',
          color: '#241d22',
          fontFamily: "'Karla', 'Helvetica Neue', Arial, sans-serif",
          padding: '24px',
        }}
      >
        <main style={{ textAlign: 'center', maxWidth: 560 }}>
          <p
            style={{
              margin: '0 0 18px',
              fontSize: 13,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: '#a5793f',
            }}
          >
            Fehler 404
          </p>
          <h1
            style={{
              margin: '0 0 20px',
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 500,
              fontSize: 'clamp(40px, 8vw, 72px)',
              lineHeight: 1.05,
              letterSpacing: '-0.01em',
            }}
          >
            Diese Seite ist wohl im Keller geblieben.
          </h1>
          <p
            style={{
              margin: '0 0 34px',
              fontSize: 17,
              lineHeight: 1.7,
              color: '#7b7076',
            }}
          >
            Die aufgerufene Seite gibt es nicht (mehr). Kehren Sie zurück zur Startseite – dort
            warten Weine, Events und der Verleih.
          </p>
          <a
            href="/"
            style={{
              display: 'inline-block',
              background: '#6d4a7e',
              color: '#ffffff',
              padding: '15px 30px',
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: '0.02em',
              borderRadius: 999,
              textDecoration: 'none',
            }}
          >
            Zur Startseite
          </a>
        </main>
      </body>
    </html>
  )
}
