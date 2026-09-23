import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { DEMO_CREDENTIALS, DEMO_PROFILE } from '../data/demo-account'

export type Profile = typeof DEMO_PROFILE

interface AuthState {
  session: { email: string; profile: Profile } | null
  /** Renvoie true si les identifiants correspondent au compte de démonstration. */
  login: (email: string, password: string) => boolean
  logout: () => void
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      session: null,
      login: (email, password) => {
        const ok =
          email.trim().toLowerCase() === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password
        if (ok) set({ session: { email: DEMO_CREDENTIALS.email, profile: { ...DEMO_PROFILE } } })
        return ok
      },
      logout: () => set({ session: null }),
    }),
    { name: 'rv-session', storage: createJSONStorage(() => localStorage) },
  ),
)
