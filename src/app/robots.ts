import type { MetadataRoute } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'https://weinmacher-muehltal.de'

// Erzeugt /robots.txt – Suchmaschinen dürfen die öffentlichen Seiten indexieren,
// interne Bereiche (Admin, API, Vorschau, Seed) bleiben ausgeschlossen.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api/', '/seed', '/wein-vorschau', '/event-vorschau'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
