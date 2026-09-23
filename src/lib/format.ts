const priceFormatter = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' })
const numberFormatter = new Intl.NumberFormat('fr-FR')
const dateFormatter = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })

/** Tous les montants sont stockés en centimes pour éviter les erreurs d'arrondi. */
export function formatPrice(cents: number): string {
  return priceFormatter.format(cents / 100)
}

export function formatNumber(value: number): string {
  return numberFormatter.format(value)
}

export function formatDate(iso: string): string {
  return dateFormatter.format(new Date(iso))
}

export function pluralize(count: number, singular: string, plural = `${singular}s`): string {
  return `${formatNumber(count)} ${count > 1 ? plural : singular}`
}
