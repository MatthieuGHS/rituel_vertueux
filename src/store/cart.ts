import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import type { ProductId } from '../data/products'
import type { CartLine } from '../lib/loyalty'

const MAX_QTY = 24

interface CartState {
  lines: CartLine[]
  /** État d'interface, non persisté. */
  drawerOpen: boolean
  add: (productId: ProductId, quantity?: number) => void
  setQuantity: (productId: ProductId, quantity: number) => void
  remove: (productId: ProductId) => void
  clear: () => void
  openDrawer: () => void
  closeDrawer: () => void
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      drawerOpen: false,
      add: (productId, quantity = 1) =>
        set((state) => {
          const existing = state.lines.find((line) => line.productId === productId)
          if (existing) {
            return {
              lines: state.lines.map((line) =>
                line.productId === productId
                  ? { ...line, quantity: Math.min(MAX_QTY, line.quantity + quantity) }
                  : line,
              ),
            }
          }
          return { lines: [...state.lines, { productId, quantity: Math.min(MAX_QTY, quantity) }] }
        }),
      setQuantity: (productId, quantity) =>
        set((state) => ({
          lines:
            quantity <= 0
              ? state.lines.filter((line) => line.productId !== productId)
              : state.lines.map((line) =>
                  line.productId === productId ? { ...line, quantity: Math.min(MAX_QTY, quantity) } : line,
                ),
        })),
      remove: (productId) => set((state) => ({ lines: state.lines.filter((line) => line.productId !== productId) })),
      clear: () => set({ lines: [] }),
      openDrawer: () => set({ drawerOpen: true }),
      closeDrawer: () => set({ drawerOpen: false }),
    }),
    {
      name: 'rv-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ lines: state.lines }),
    },
  ),
)

export const CART_MAX_QTY = MAX_QTY

export function useCartCount(): number {
  return useCart((state) => state.lines.reduce((sum, line) => sum + line.quantity, 0))
}
