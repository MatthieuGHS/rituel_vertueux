import { Info } from 'lucide-react'

export function DemoBanner() {
  return (
    <div className="bg-ink px-4 py-1.5 text-center text-[0.8125rem] text-cream">
      <p className="inline-flex items-center gap-1.5">
        <Info aria-hidden="true" className="size-3.5 shrink-0" />
        Site de démonstration — aucune commande réelle
      </p>
    </div>
  )
}
