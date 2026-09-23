import { useMemo } from 'react'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { DEMO_CREDENTIALS, DEMO_ORDERS } from '../data/demo-account'
import { ledgerFrom, type AppliedReward, type CartLine, type OrderTotals } from '../lib/loyalty'

export type ShippingMethod = 'domicile' | 'relais'

export interface Customer {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  postalCode: string
  city: string
}

export interface Order {
  number: string
  date: string
  lines: CartLine[]
  reward: AppliedReward | null
  totals: OrderTotals
  pointsEarned: number
  pointsSpent: number
  shippingMethod: ShippingMethod
  customer: Customer
  /** null pour une commande invité. */
  accountEmail: string | null
}

interface OrdersState {
  /** Commandes passées pendant la démo (l'historique initial vient de demo-account.ts). */
  placed: Order[]
  lastOrderNumber: string | null
  addOrder: (order: Order) => void
  resetDemo: () => void
}

export const useOrders = create<OrdersState>()(
  persist(
    (set) => ({
      placed: [],
      lastOrderNumber: null,
      addOrder: (order) => set((state) => ({ placed: [order, ...state.placed], lastOrderNumber: order.number })),
      resetDemo: () => set({ placed: [], lastOrderNumber: null }),
    }),
    { name: 'rv-orders', storage: createJSONStorage(() => localStorage) },
  ),
)

export function generateOrderNumber(): string {
  const digits = Math.floor(100000 + Math.random() * 900000)
  return `RV-${digits}`
}

/** Historique complet d'un compte : commandes de démo + commandes passées, plus récentes d'abord. */
export function useAccountOrders(email: string | undefined): Order[] {
  const placed = useOrders((state) => state.placed)
  return useMemo(() => {
    if (!email) return []
    const seed = email === DEMO_CREDENTIALS.email ? DEMO_ORDERS : []
    return [...placed.filter((order) => order.accountEmail === email), ...seed].toSorted((a, b) =>
      b.date.localeCompare(a.date),
    )
  }, [email, placed])
}

export function useLedger(email: string | undefined) {
  const orders = useAccountOrders(email)
  return useMemo(() => ledgerFrom(orders), [orders])
}
