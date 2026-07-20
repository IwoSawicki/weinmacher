import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import './styles.css'

// Zur Build-Zeit gibt es keine Datenbank (Docker-Build) – immer zur Laufzeit rendern
export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const payload = await getPayload({ config: await config })

  const [weine, events, verleih] = await Promise.all([
    payload.count({ collection: 'weine' }),
    payload.count({ collection: 'events' }),
    payload.count({ collection: 'verleih' }),
  ])

  return (
    <div className="home">
      <div className="content">
        <h1>Weinmacher Mühltal</h1>
        <p>Die Website befindet sich im Aufbau.</p>
        <p>
          Im System gepflegt: {weine.totalDocs} Weine, {events.totalDocs} Events,{' '}
          {verleih.totalDocs} Verleih-Artikel.
        </p>
        <div className="links">
          <a className="admin" href="/admin" rel="noopener noreferrer">
            Zum Admin-Bereich
          </a>
        </div>
      </div>
    </div>
  )
}
