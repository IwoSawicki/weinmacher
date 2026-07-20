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
        description: 'z. B. „Weingut Multeau“',
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
        description: 'Freier Text, z. B. „Fr 15–18 Uhr, Sa 10–16 Uhr und nach Vereinbarung“.',
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
