import React from 'react'

import type { Media } from '@/payload-types'

type BildProps = {
  media?: number | Media | null
  alt?: string
  sizes?: string
  contain?: boolean
}

// Rendert ein Bild aus der Mediathek (oder einen Platzhalter, solange keins
// hochgeladen ist). Der Eltern-Container braucht position: relative/absolute
// und eine Höhe. Bewusst ein einfaches <img> statt next/image: selbst-gehostete
// Payload-Uploads scheitern sonst häufig an der Next-Bildoptimierung im Container.
export function Bild({ media, alt, contain = false }: BildProps) {
  if (!media || typeof media === 'number' || !media.url) {
    return <div className="bild-platzhalter" aria-hidden="true" />
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={media.url}
      alt={media.alt || alt || ''}
      loading="lazy"
      decoding="async"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: contain ? 'contain' : 'cover',
        display: 'block',
      }}
    />
  )
}
