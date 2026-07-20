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
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: undefined,
      },
      {
        name: 'hero',
        width: 1920,
        height: undefined,
      },
    ],
    adminThumbnail: 'thumbnail',
    focalPoint: true,
  },
}
