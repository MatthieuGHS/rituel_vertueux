import { useEffect } from 'react'

const SITE = 'Rituel Vertueux'

/** Met à jour <title> et la meta description de la page courante. */
export function useSeo(title: string, description: string) {
  useEffect(() => {
    document.title = title === SITE ? `${SITE} — Votre bien-être devient un rituel` : `${title} · ${SITE}`
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.name = 'description'
      document.head.appendChild(meta)
    }
    meta.content = description
  }, [title, description])
}
