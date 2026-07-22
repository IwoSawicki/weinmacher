import type { MetadataRoute } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'https://weinmacher-muehltal.de'

// Erzeugt /sitemap.xml mit den öffentlichen Seiten. Die Startseite bündelt alle
// Sektionen (Über uns, Weine, Events, Verleih, Kontakt) als Anker.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/impressum`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/datenschutz`, changeFrequency: 'yearly', priority: 0.3 },
  ]
}
