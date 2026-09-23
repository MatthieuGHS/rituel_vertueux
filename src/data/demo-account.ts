import { computeTotals, type AppliedReward, type CartLine } from '../lib/loyalty'
import type { Order } from '../store/orders'

/**
 * Compte de démonstration : identifiants en clair, affichés sur la page de connexion.
 * Aucune base de données — tout est fictif.
 */
export const DEMO_CREDENTIALS = {
  email: 'demo@rituelvertueux.fr',
  password: 'motdepasse',
} as const

export const DEMO_PROFILE = {
  firstName: 'Camille',
  lastName: 'Martin',
  email: DEMO_CREDENTIALS.email,
  phone: '06 00 00 00 00',
  address: '12 rue des Oliviers',
  postalCode: '13000',
  city: 'Marseille',
} as const

function seedOrder(number: string, date: string, lines: CartLine[], reward: AppliedReward | null = null): Order {
  const totals = computeTotals(lines, reward)
  return {
    number,
    date,
    lines,
    reward,
    totals,
    pointsEarned: totals.pointsEarned,
    pointsSpent: totals.pointsSpent,
    shippingMethod: 'domicile',
    customer: { ...DEMO_PROFILE },
    accountEmail: DEMO_CREDENTIALS.email,
  }
}

/**
 * Historique initial : 3 commandes. Le solde de points est calculé à partir de ces commandes
 * (voir ledgerFrom dans lib/loyalty.ts), jamais saisi à la main.
 */
export const DEMO_ORDERS: Order[] = [
  seedOrder('RV-418273', '2026-05-14T09:12:00.000Z', [
    { productId: 'rebelle', quantity: 2 },
    { productId: 'reconfort', quantity: 1 },
  ]),
  seedOrder(
    'RV-527904',
    '2026-07-02T16:40:00.000Z',
    [{ productId: 'reconfort', quantity: 3 }],
    { id: 'discount5' },
  ),
  seedOrder('RV-603158', '2026-08-29T07:55:00.000Z', [
    { productId: 'rebelle', quantity: 1 },
    { productId: 'reconfort', quantity: 1 },
  ]),
]
