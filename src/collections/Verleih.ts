import type { CollectionConfig } from 'payload'

export const Verleih: CollectionConfig = {
  slug: 'verleih',
  labels: {
    singular: 'Verleih-Artikel',
    plural: 'Verleih',
  },
  orderable: true,
  admin: {
    group: 'Inhalte',
    useAsTitle: 'name',
    defaultColumns: ['name', 'kategorie', 'preisInfo', 'verfuegbar'],
    description:
      'Ausschankwagen, Technik und weitere Artikel zum Ausleihen. Die Reihenfolge lässt sich per Ziehen ändern.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
      admin: {
        description: 'z. B. „Ausschankwagen“',
      },
    },
    {
      name: 'kategorie',
      label: 'Kategorie',
      type: 'select',
      options: [
        { label: 'Ausschank', value: 'ausschank' },
        { label: 'Technik', value: 'technik' },
        { label: 'Mobiliar', value: 'mobiliar' },
        { label: 'Sonstiges', value: 'sonstiges' },
      ],
    },
    {
      name: 'beschreibung',
      label: 'Beschreibung',
      type: 'textarea',
      admin: {
        description: 'Was ist es, was ist enthalten, wofür eignet es sich?',
      },
    },
    {
      name: 'preisInfo',
      label: 'Preis-Info',
      type: 'text',
      admin: {
        description: 'Freier Text, z. B. „50 € pro Tag“ oder „Preis auf Anfrage“.',
      },
    },
    {
      name: 'bilder',
      label: 'Bilder',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      admin: {
        description: 'Ein oder mehrere Fotos des Artikels.',
      },
    },
    {
      name: 'verfuegbar',
      label: 'Verfügbar',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Wenn deaktiviert, wird der Artikel als derzeit nicht verfügbar angezeigt.',
      },
    },
  ],
}
