import type { CollectionConfig } from 'payload'

export const Weine: CollectionConfig = {
  slug: 'weine',
  labels: {
    singular: 'Wein',
    plural: 'Weine',
  },
  orderable: true,
  admin: {
    group: 'Inhalte',
    useAsTitle: 'name',
    defaultColumns: ['name', 'weinart', 'jahrgang', 'preis', 'ausverkauft'],
    description:
      'Alle Weine, die auf der Website erscheinen. Die Reihenfolge lässt sich per Ziehen ändern.',
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
        description: 'z. B. „Riesling trocken“',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'weinart',
          label: 'Weinart',
          type: 'select',
          required: true,
          options: [
            { label: 'Weißwein', value: 'weisswein' },
            { label: 'Rotwein', value: 'rotwein' },
            { label: 'Rosé', value: 'rose' },
            { label: 'Sekt / Schaumwein', value: 'sekt' },
            { label: 'Sonstiges', value: 'sonstiges' },
          ],
        },
        {
          name: 'jahrgang',
          label: 'Jahrgang',
          type: 'number',
          min: 1950,
          max: 2100,
        },
        {
          name: 'rebsorte',
          label: 'Rebsorte',
          type: 'text',
        },
      ],
    },
    {
      name: 'beschreibung',
      label: 'Beschreibung',
      type: 'textarea',
      admin: {
        description: 'Geschmack, Charakter, passende Anlässe – der Text erscheint auf der Website.',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'preis',
          label: 'Preis (€)',
          type: 'number',
          min: 0,
          admin: {
            step: 0.01,
            description: 'z. B. 9.50',
          },
        },
        {
          name: 'flaschengroesse',
          label: 'Flaschengröße',
          type: 'text',
          defaultValue: '0,75 l',
        },
      ],
    },
    {
      name: 'bild',
      label: 'Flaschenbild',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Foto der Weinflasche. Kann jederzeit ausgetauscht werden.',
      },
    },
    {
      name: 'ausverkauft',
      label: 'Ausverkauft',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Wenn aktiviert, wird der Wein auf der Website als ausverkauft angezeigt.',
      },
    },
  ],
}
