import React from 'react'

type BildProps = {
  src?: string | null
  alt?: string
  sizes?: string
  contain?: boolean
  priority?: boolean // above-the-fold (Hero) → sofort laden statt lazy
}

// Einfaches, absolut gefülltes Bild (kein next/image, kein CMS). Erwartet einen
// Pfad unter /public. Ohne Pfad wird ein dezenter Platzhalter gezeigt.
export function Bild({ src, alt, sizes, contain = false, priority = false }: BildProps) {
  if (!src) {
    return <div className="bild-platzhalter" aria-hidden="true" />
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      sizes={sizes}
      alt={alt || ''}
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
