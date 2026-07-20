import type { GlobalConfig } from 'payload'

export const Kontakt: GlobalConfig = {
  slug: 'kontakt',
  label: 'Kontakt & Adresse',
  admin: {
    group: 'Inhalte',
    description: 'Kontaktdaten, die auf der Website angezeigt werden (z. B. im Footer).',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      label: 'Name / Firmierung',
      type: 'text',
      admin: {
        description: 'z. B. „Weinmacher Mühltal“',
      },
    },
    {
      name: 'adresse',
      label: 'Adresse',
      type: 'textarea',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'telefon',
          label: 'Telefon',
          type: 'text',
        },
        {
          name: 'email',
          label: 'E-Mail',
          type: 'email',
        },
      ],
    },
    {
      name: 'oeffnungszeiten',
      label: 'Öffnungszeiten',
      type: 'textarea',
      admin: {
        description:
          'Eine Zeile pro Eintrag im Format „Tage | Zeiten“, z. B. „Mi – Fr | 15 – 19 Uhr“. Zeilen mit „geschlossen“ werden abgedunkelt dargestellt.',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'instagram',
          label: 'Instagram-Link',
          type: 'text',
        },
        {
          name: 'facebook',
          label: 'Facebook-Link',
          type: 'text',
        },
      ],
    },
  ],
}
