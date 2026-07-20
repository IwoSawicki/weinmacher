import { getPayload } from 'payload'

import config from '@/payload.config'

// Gemeinsames Laden aller Startseiten-Inhalte aus dem CMS.
// Wird von den Design-Varianten (/, /home-2, /home-3) genutzt.
export async function ladeStartseitenDaten() {
  const payload = await getPayload({ config: await config })

  const heute = new Date()
  heute.setHours(0, 0, 0, 0)

  const [weine, events, verleih, kontakt] = await Promise.all([
    payload.find({ collection: 'weine', sort: '_order', limit: 100 }),
    payload.find({
      collection: 'events',
      where: { datum: { greater_than_equal: heute.toISOString() } },
      sort: 'datum',
      limit: 50,
    }),
    payload.find({ collection: 'verleih', sort: '_order', limit: 100 }),
    payload.findGlobal({ slug: 'kontakt' }),
  ])

  return {
    weine: weine.docs,
    events: events.docs,
    verleih: verleih.docs,
    kontakt,
  }
}
