import React from 'react'

import type { Media } from '@/payload-types'

type SizeName = 'thumbnail' | 'card' | 'hero'

type BildProps = {
  media?: number | Media | null
  alt?: string
  size?: SizeName // welche vorab erzeugte Größe als Hauptquelle dient
  sizes?: string // responsives sizes-Attribut
  contain?: boolean
  priority?: boolean // above-the-fold (Hero) → sofort laden statt lazy
}

// Rendert ein Bild aus der Mediathek und nutzt die von Payload beim Upload
// erzeugten, verkleinerten Größen (thumbnail/card/hero) + srcset. So werden
// nicht die riesigen Originale ausgeliefert. Bewusst ein <img> (kein
// next/image), weil selbst-gehostete Uploads im Container zuverlässiger sind.
export function Bild({ media, alt, size = 'card', sizes, contain = false, priority = false }: BildProps) {
  if (!media || typeof media === 'number' || !media.url) {
    return <div className="bild-platzhalter" aria-hidden="true" />
  }

  const s = media.sizes
  const chosen = size === 'hero' ? s?.hero : size === 'thumbnail' ? s?.thumbnail : s?.card
  const src = chosen?.url || media.url

  // srcset aus allen verfügbaren Größen (Browser wählt die passende)
  const srcSet = [s?.thumbnail, s?.card, s?.hero, { url: media.url, width: media.width }]
    .filter((c): c is { url: string; width: number } => !!(c && c.url && c.width))
    .map((c) => `${c.url} ${c.width}w`)
    .join(', ')

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src || undefined}
      srcSet={srcSet || undefined}
      sizes={sizes}
      alt={media.alt || alt || ''}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
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
