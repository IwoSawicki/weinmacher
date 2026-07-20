import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { de } from '@payloadcms/translations/languages/de'
import { en } from '@payloadcms/translations/languages/en'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Dokumente } from './collections/Dokumente'
import { Weine } from './collections/Weine'
import { Events } from './collections/Events'
import { Verleih } from './collections/Verleih'
import { Kontakt } from './globals/Kontakt'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '– Weinmacher Mühltal',
    },
    dateFormat: 'dd.MM.yyyy',
  },
  i18n: {
    supportedLanguages: { de, en },
    fallbackLanguage: 'de',
  },
  collections: [Weine, Events, Verleih, Media, Dokumente, Users],
  globals: [Kontakt],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  upload: {
    limits: {
      fileSize: 20_000_000, // 20 MB
    },
  },
  plugins: [],
})
