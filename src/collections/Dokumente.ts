import path from 'path'
import type { CollectionConfig } from 'payload'

export const Dokumente: CollectionConfig = {
  slug: 'dokumente',
  labels: {
    singular: 'Dokument',
    plural: 'Dokumente',
  },
  admin: {
    group: 'Mediathek',
    useAsTitle: 'titel',
    description: 'PDF-Dateien, z. B. Event-Programme, Weinkarten oder Preislisten.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'titel',
      label: 'Titel',
      type: 'text',
      required: true,
      admin: {
        description: 'Name des Dokuments, z. B. „Programm Weinfest 2026“.',
      },
    },
  ],
  upload: {
    staticDir: path.resolve(process.cwd(), 'uploads/dokumente'),
    mimeTypes: ['application/pdf'],
  },
}
