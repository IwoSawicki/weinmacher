import type { GlobalConfig } from 'payload'

export const Website: GlobalConfig = {
  slug: 'website',
  label: 'Bilder & Startseite',
  admin: {
    group: 'Inhalte',
    description: 'Große Bilder, die im Layout der Startseite erscheinen.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      label: 'Logo (Favicon / Browser-Tab)',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description:
          'Wird als kleines Symbol im Browser-Tab (Favicon) angezeigt. Am besten quadratisch bzw. mit dem Wappen mittig. Tipp: Über den Fokuspunkt im Bild kann festgelegt werden, welcher Ausschnitt beim quadratischen Zuschnitt sichtbar bleibt.',
      },
    },
    {
      name: 'heroBild',
      label: 'Hero-Bild (Startseite, ganz oben)',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description:
          'Großes Titelbild ganz oben auf der Startseite, z. B. Weinberg im Abendlicht. Querformat, möglichst hochauflösend (mind. 1920 px breit).',
      },
    },
    {
      name: 'ueberBild',
      label: 'Bild „Über uns“',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Porträt- oder Kellerfoto in der Sektion „Über uns“. Hochformat passt am besten.',
      },
    },
  ],
}
