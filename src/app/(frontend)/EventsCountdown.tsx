'use client'

import React, { useEffect, useState } from 'react'

type Rest = { tage: number; stunden: number; minuten: number; sekunden: number; vorbei: boolean }

function berechne(target: number): Rest {
  const diff = Math.max(0, target - Date.now())
  const s = Math.floor(diff / 1000)
  return {
    tage: Math.floor(s / 86400),
    stunden: Math.floor((s % 86400) / 3600),
    minuten: Math.floor((s % 3600) / 60),
    sekunden: s % 60,
    vorbei: diff === 0,
  }
}

// Live-Countdown zum nächsten Event. Tickt jede Sekunde. Rendert bis zum
// Mounten "--" (kein Hydration-Mismatch), danach die echten Werte.
export function EventsCountdown({ targetIso, titel }: { targetIso: string; titel: string }) {
  const target = new Date(targetIso).getTime()
  const [rest, setRest] = useState<Rest | null>(null)

  useEffect(() => {
    setRest(berechne(target))
    const id = setInterval(() => setRest(berechne(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  const blocks: Array<[number | undefined, string]> = [
    [rest?.tage, 'Tage'],
    [rest?.stunden, 'Stunden'],
    [rest?.minuten, 'Minuten'],
    [rest?.sekunden, 'Sekunden'],
  ]

  return (
    <div className="cd" data-reveal="">
      <p className="cd-label">Nächstes Event</p>
      <h3 className="cd-titel">{titel}</h3>
      {rest?.vorbei ? (
        <p className="cd-jetzt">Es ist so weit – heute ist es dann!</p>
      ) : (
        <div className="cd-grid">
          {blocks.map(([wert, label]) => (
            <div className="cd-block" key={label}>
              <span className="cd-zahl">
                {rest ? String(wert).padStart(2, '0') : '--'}
              </span>
              <span className="cd-einheit">{label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
