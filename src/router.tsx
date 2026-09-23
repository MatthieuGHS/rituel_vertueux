import type { ComponentType } from 'react'
import { createBrowserRouter, type RouteObject } from 'react-router'
import { RequireAuth } from './components/layout/RequireAuth'
import { RootLayout } from './components/layout/RootLayout'
import { HydrateFallback, RouteError } from './components/layout/RouteFallbacks'

/** Chaque page est chargée à la demande (code-splitting par route). */
const page = (loader: () => Promise<{ default: ComponentType }>): RouteObject['lazy'] =>
  async () => ({ Component: (await loader()).default })

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    ErrorBoundary: RouteError,
    HydrateFallback,
    children: [
      { index: true, lazy: page(() => import('./pages/Home')) },
      { path: 'rituels', lazy: page(() => import('./pages/Rituels')) },
      { path: 'rituels/:slug', lazy: page(() => import('./pages/ProductPage')) },
      { path: 'ingredients', lazy: page(() => import('./pages/Ingredients')) },
      { path: 'le-rituel', lazy: page(() => import('./pages/LeRituel')) },
      { path: 'recettes', lazy: page(() => import('./pages/Recettes')) },
      { path: 'notre-histoire', lazy: page(() => import('./pages/NotreHistoire')) },
      { path: 'pro', lazy: page(() => import('./pages/Pro')) },
      { path: 'faq', lazy: page(() => import('./pages/Faq')) },
      { path: 'contact', lazy: page(() => import('./pages/Contact')) },
      { path: 'boutique', lazy: page(() => import('./pages/Boutique')) },
      { path: 'panier', lazy: page(() => import('./pages/Panier')) },
      { path: 'commande', lazy: page(() => import('./pages/Commande')) },
      { path: 'commande/confirmation', lazy: page(() => import('./pages/Confirmation')) },
      { path: 'compte/connexion', lazy: page(() => import('./pages/Connexion')) },
      {
        path: 'compte',
        Component: RequireAuth,
        children: [
          { index: true, lazy: page(() => import('./pages/Compte')) },
          { path: 'commandes', lazy: page(() => import('./pages/CompteCommandes')) },
          { path: 'fidelite', lazy: page(() => import('./pages/CompteFidelite')) },
        ],
      },
      { path: 'mentions-legales', lazy: page(() => import('./pages/MentionsLegales')) },
      { path: 'confidentialite', lazy: page(() => import('./pages/Confidentialite')) },
      { path: '*', lazy: page(() => import('./pages/NotFound')) },
    ],
  },
])
