import { isRouteErrorResponse, Link, useRouteError } from 'react-router'
import { Logo } from '../ui/Logo'

export function HydrateFallback() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-cream" role="status" aria-label="Chargement">
      <Logo variant="mark" decorative className="size-14 animate-pulse" />
    </div>
  )
}

export function RouteError() {
  const error = useRouteError()
  const message = isRouteErrorResponse(error) ? `${error.status} ${error.statusText}` : 'Une erreur inattendue est survenue.'
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-cream px-6 text-center">
      <Logo variant="mark" decorative className="size-14" />
      <h1 className="display-md">La page n’a pas pu s’afficher</h1>
      <p className="text-ink/80">{message} Actualisez la page ou revenez à l’accueil.</p>
      <Link to="/" className="label rounded-full bg-terracotta px-6 py-3 text-[1.2rem] font-bold text-white hover:bg-terracotta-dark">
        Retour à l’accueil
      </Link>
    </div>
  )
}
