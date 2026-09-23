/**
 * Programme de fidélité et calcul des totaux de commande.
 * Toutes les règles modifiables sont regroupées dans LOYALTY et SHIPPING.
 * Montants en centimes.
 */
import { products, type ProductId } from '../data/products'

export const SHIPPING = {
  /** Frais de livraison standard. */
  fee: 490,
  /** Livraison offerte à partir de ce montant produits (après remise). */
  freeFrom: 3000,
} as const

export const LOYALTY = {
  /** Points gagnés par euro dépensé sur les produits (après remise, hors livraison), arrondi à l'inférieur. */
  pointsPerEuro: 10,
  rewards: [
    { id: 'discount5', cost: 250, title: '−5 % sur les produits', description: 'Remise de 5 % sur le montant des produits de la commande.' },
    { id: 'freeShipping', cost: 500, title: 'Livraison offerte', description: 'Les frais de livraison sont offerts, quel que soit le montant.' },
    { id: 'freeBox', cost: 1000, title: '1 boîte offerte au choix', description: 'Une boîte de 10 sticks [RE]BELLE ou [RE]CONFORT ajoutée gratuitement.' },
  ],
  /** Niveaux selon le cumul total de points gagnés (jamais diminué par les dépenses). */
  levels: [
    { id: 'decouverte', name: 'Découverte', min: 0 },
    { id: 'initie', name: 'Initié', min: 500 },
    { id: 'vertueux', name: 'Vertueux', min: 1500 },
  ],
} as const

export type RewardId = (typeof LOYALTY.rewards)[number]['id']
export type Reward = (typeof LOYALTY.rewards)[number]
export type Level = (typeof LOYALTY.levels)[number]

export interface CartLine {
  productId: ProductId
  quantity: number
}

export interface AppliedReward {
  id: RewardId
  /** Pour la boîte offerte : le produit choisi. */
  productId?: ProductId
}

export interface OrderTotals {
  /** Somme des produits payants avant remise. */
  productsSubtotal: number
  discount: number
  /** Produits après remise : base du seuil de livraison et du calcul des points. */
  productsTotal: number
  shipping: number
  total: number
  pointsEarned: number
  pointsSpent: number
  freeShippingReason: 'threshold' | 'reward' | null
}

export function getReward(id: RewardId): Reward {
  const reward = LOYALTY.rewards.find((r) => r.id === id)
  if (!reward) throw new Error(`Récompense inconnue : ${id}`)
  return reward
}

export function computeTotals(lines: CartLine[], reward?: AppliedReward | null): OrderTotals {
  const productsSubtotal = lines.reduce((sum, line) => sum + products[line.productId].price * line.quantity, 0)
  const discount = reward?.id === 'discount5' ? Math.round(productsSubtotal * 0.05) : 0
  const productsTotal = productsSubtotal - discount

  let freeShippingReason: OrderTotals['freeShippingReason'] = null
  if (reward?.id === 'freeShipping') freeShippingReason = 'reward'
  else if (productsTotal >= SHIPPING.freeFrom) freeShippingReason = 'threshold'
  const shipping = lines.length === 0 || freeShippingReason ? 0 : SHIPPING.fee

  return {
    productsSubtotal,
    discount,
    productsTotal,
    shipping,
    total: productsTotal + shipping,
    pointsEarned: pointsFor(productsTotal),
    pointsSpent: reward ? getReward(reward.id).cost : 0,
    freeShippingReason,
  }
}

export function pointsFor(productsTotalCents: number): number {
  return Math.floor((productsTotalCents / 100) * LOYALTY.pointsPerEuro)
}

/** Montant restant avant la livraison offerte (0 si atteinte). */
export function remainingForFreeShipping(productsTotalCents: number): number {
  return Math.max(0, SHIPPING.freeFrom - productsTotalCents)
}

export function levelFor(lifetimePoints: number): { current: Level; next: Level | null } {
  const levels = LOYALTY.levels
  let index = 0
  levels.forEach((level, i) => {
    if (lifetimePoints >= level.min) index = i
  })
  return { current: levels[index], next: levels[index + 1] ?? null }
}

/** Prochaine récompense non encore accessible avec le solde actuel. */
export function nextReward(balance: number): Reward | null {
  return LOYALTY.rewards.find((reward) => reward.cost > balance) ?? null
}

export function availableRewards(balance: number): Reward[] {
  return LOYALTY.rewards.filter((reward) => reward.cost <= balance)
}

export interface PointsLedger {
  lifetime: number
  spent: number
  balance: number
}

export function ledgerFrom(orders: Array<{ pointsEarned: number; pointsSpent: number }>): PointsLedger {
  const lifetime = orders.reduce((sum, order) => sum + order.pointsEarned, 0)
  const spent = orders.reduce((sum, order) => sum + order.pointsSpent, 0)
  return { lifetime, spent, balance: lifetime - spent }
}
