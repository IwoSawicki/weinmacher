import Image from 'next/image'
import React from 'react'

import type { Media } from '@/payload-types'

type BildProps = {
  media?: number | Media | null
  alt?: string
  sizes?: string
  contain?: boolean
}

// Rendert ein Bild aus der Mediathek (oder einen Platzhalter, solange keins
// hochgeladen ist). Der Eltern-Container braucht position: relative.
export function Bild({ media, alt, sizes, contain = false }: BildProps) {
  if (!media || typeof media === 'number' || !media.url) {
    return <div className="bild-platzhalter" aria-hidden="true" />
  }

  return (
    <Image
      src={media.url}
      alt={media.alt || alt || ''}
      fill
      sizes={sizes}
      style={{ objectFit: contain ? 'contain' : 'cover' }}
    />
  )
}
