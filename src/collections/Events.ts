import type { CollectionConfig } from 'payload'

export const Events: CollectionConfig = {
  slug: 'events',
  labels: {
    singular: 'Event',
    plural: 'Events',
  },
  admin: {
    group: 'Inhalte',
    useAsTitle: 'titel',
    defaultColumns: ['titel', 'datum', 'ort', 'ausgebucht'],
    description:
      'Veranstaltungen wie Weinproben, Feste oder Führungen. Vergangene Events werden auf der Website automatisch ausgeblendet.',
  },
  defaultSort: '-datum',
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
        description: 'z. B. „Weinprobe im Gewölbekeller“',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'datum',
          label: 'Datum & Uhrzeit',
          type: 'date',
          required: true,
          admin: {
            date: {
              pickerAppearance: 'dayAndTime',
              displayFormat: 'dd.MM.yyyy HH:mm',
              timeFormat: 'HH:mm',
            },
          },
        },
        {
          name: 'ort',
          label: 'Ort',
          type: 'text',
          admin: {
            description: 'z. B. „Weingut, Hauptstraße 1“',
          },
        },
      ],
    },
    {
      name: 'kartenLink',
      label: 'Google-Maps-Link',
      type: 'text',
      admin: {
        description:
          'Optional: Link zu Google Maps (z. B. der geteilte Standort-Link). Wenn leer, wird automatisch nach dem Ort gesucht.',
      },
    },
    {
      name: 'zeiten',
      label: 'Termin-Zeiten (Aufzählung)',
      type: 'textarea',
      admin: {
        description:
          'Für mehrtägige Events: eine Zeile pro Tag im Format „Tag | Uhrzeit“, z. B. „Samstag | ab 17 Uhr“. Wird als übersichtliche Liste angezeigt.',
      },
    },
    {
      name: 'beschreibung',
      label: 'Beschreibung',
      type: 'richText',
      admin: {
        description: 'Alle Details zum Event – Ablauf, was dabei ist, für wen es gedacht ist.',
      },
    },
    {
      name: 'preis',
      label: 'Preis',
      type: 'text',
      admin: {
        description: 'Freier Text, z. B. „25 € pro Person“ oder „Eintritt frei“.',
      },
    },
    {
      name: 'bild',
      label: 'Bild',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'pdf',
      label: 'PDF zum Event',
      type: 'upload',
      relationTo: 'dokumente',
      admin: {
        description: 'Optional: Programm, Einladung oder Anmeldeformular als PDF.',
      },
    },
    {
      name: 'anmeldeLink',
      label: 'Anmelde-Link',
      type: 'text',
      admin: {
        description: 'Optional: Link zur Anmeldung, z. B. ein Formular oder eine E-Mail-Adresse.',
      },
    },
    {
      name: 'ausgebucht',
      label: 'Ausgebucht',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Wenn aktiviert, wird das Event auf der Website als ausgebucht markiert.',
      },
    },
  ],
}
