import path from 'path'
import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Bild',
    plural: 'Bilder',
  },
  admin: {
    group: 'Mediathek',
    description: 'Alle Bilder der Website – z. B. Weinflaschen, Event-Fotos und Verleih-Artikel.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      label: 'Alternativtext',
      type: 'text',
      required: true,
      admin: {
        description:
          'Kurze Beschreibung des Bildes, z. B. „Flasche Riesling 2024“. Wichtig für Google und Menschen mit Sehbehinderung.',
      },
    },
  ],
  upload: {
    staticDir: path.resolve(process.cwd(), 'uploads/media'),
    mimeTypes: ['image/*'],
    // Alle erzeugten Größen als WebP ausliefern (deutlich kleiner als PNG/JPEG).
    // Greift für neu hochgeladene Bilder; bereits vorhandene ggf. neu hochladen.
    formatOptions: {
      format: 'webp',
      options: { quality: 78 },
    },
    imageSizes: [
      {
        // Quadratischer Zuschnitt für Favicon / Logo (PNG, damit in allen Browsern nutzbar).
        name: 'favicon',
        width: 256,
        height: 256,
        position: 'centre',
        formatOptions: { format: 'png' },
      },
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
        formatOptions: { format: 'webp', options: { quality: 78 } },
      },
      {
        name: 'card',
        width: 768,
        height: undefined,
        formatOptions: { format: 'webp', options: { quality: 78 } },
      },
      {
        name: 'hero',
        width: 1920,
        height: undefined,
        formatOptions: { format: 'webp', options: { quality: 80 } },
      },
    ],
    adminThumbnail: 'thumbnail',
    focalPoint: true,
  },
}
