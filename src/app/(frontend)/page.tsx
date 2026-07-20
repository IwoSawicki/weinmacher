import { getPayload } from 'payload'
import React from 'react'

import { Nav } from '@/components/Nav'
import { ScrollReveal } from '@/components/ScrollReveal'
import { EventsSection } from '@/components/sections/EventsSection'
import { Footer } from '@/components/sections/Footer'
import { Hero } from '@/components/sections/Hero'
import { Ueber } from '@/components/sections/Ueber'
import { VerleihSection } from '@/components/sections/VerleihSection'
import { WeineSection } from '@/components/sections/WeineSection'
import config from '@/payload.config'

// Inhalte kommen aus dem CMS – immer zur Laufzeit rendern, damit Änderungen
// sofort live sind (und der Docker-Build keine Datenbank braucht)
export const dynamic = 'force-dynamic'

export default async function HomePage() {
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

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Ueber />
        <WeineSection weine={weine.docs} />
        <EventsSection events={events.docs} />
        <VerleihSection
          artikel={verleih.docs}
          email={kontakt.email || 'hallo@weinmacher-muehltal.de'}
        />
      </main>
      <Footer kontakt={kontakt} />
      <ScrollReveal />
    </>
  )
}
