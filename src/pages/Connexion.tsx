import { Eye, EyeOff, KeyRound } from 'lucide-react'
import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router'
import { Button } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { ErrorSummary, TextField } from '../components/ui/Field'
import { DEMO_CREDENTIALS } from '../data/demo-account'
import { rules, useForm } from '../lib/forms'
import { useSeo } from '../lib/seo'
import { useAuth } from '../store/auth'

const labels = { email: 'E-mail', password: 'Mot de passe' }

export default function Connexion() {
  useSeo('Connexion', 'Connectez-vous au compte de démonstration Rituel Vertueux pour suivre vos commandes et vos points de fidélité.')
  const session = useAuth((state) => state.session)
  const login = useAuth((state) => state.login)
  const navigate = useNavigate()
  const location = useLocation()
  const state = (location.state ?? {}) as { from?: string; loggedOut?: boolean }
  const [showPassword, setShowPassword] = useState(false)
  const [failed, setFailed] = useState(false)
  const form = useForm(
    { email: '', password: '' },
    { email: [rules.required(), rules.email()], password: [rules.required()] },
  )

  if (session && !failed) return <Navigate to={state.from ?? '/compte'} replace />

  return (
    <Container className="grid gap-10 pb-24 pt-10 lg:grid-cols-[1.2fr_1fr] lg:pt-16">
      <div>
        <h1 className="display-lg">Connexion</h1>
        <p className="mt-4 max-w-md text-lg text-ink/90">
          Retrouvez vos commandes, votre solde de points et vos récompenses.
        </p>
        {state.loggedOut && (
          <p role="status" className="mt-6 rounded-2xl bg-cream-deep p-4 text-forest">
            Déconnexion effectuée. À bientôt !
          </p>
        )}
        {state.from && !state.loggedOut && (
          <p role="status" className="mt-6 rounded-2xl bg-cream-deep p-4 text-forest">
            Connectez-vous pour accéder à cette page.
          </p>
        )}
        <form
          noValidate
          className="mt-8 grid max-w-md gap-6"
          onSubmit={form.handleSubmit((values) => {
            const ok = login(values.email, values.password)
            setFailed(!ok)
            if (ok) navigate(state.from ?? '/compte', { replace: true })
          })}
        >
          <ErrorSummary errors={form.errors} labels={labels} summaryRef={form.summaryRef} />
          {failed && (
            <p role="alert" className="rounded-2xl border-2 border-danger bg-white p-4 font-medium text-danger">
              E-mail ou mot de passe incorrect. Utilisez les identifiants du compte de démonstration ci-contre.
            </p>
          )}
          <TextField label={labels.email} required type="email" autoComplete="username" {...form.field('email')} />
          <div className="relative">
            <TextField
              label={labels.password}
              required
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              {...form.field('password')}
            />
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              aria-pressed={showPassword}
              className="absolute right-1.5 top-[2.35rem] inline-flex size-11 items-center justify-center rounded-full text-forest hover:bg-cream-deep"
            >
              {showPassword ? <EyeOff aria-hidden="true" className="size-5" /> : <Eye aria-hidden="true" className="size-5" />}
              <span className="sr-only">{showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}</span>
            </button>
          </div>
          <div>
            <Button type="submit" size="lg">
              Se connecter
            </Button>
          </div>
        </form>
      </div>

      <aside className="self-start rounded-(--radius-card) bg-reconfort p-8" aria-labelledby="demo-title">
        <KeyRound aria-hidden="true" className="size-8 text-forest" />
        <h2 id="demo-title" className="mt-4 text-3xl">
          Compte de démonstration
        </h2>
        <p className="mt-3 text-forest">
          Aucune inscription possible : ce site est une démo. Utilisez ces identifiants pour explorer l’espace client.
        </p>
        <dl className="mt-6 space-y-3 rounded-2xl bg-cream p-5">
          <div>
            <dt className="label text-sm text-ink/75">E-mail</dt>
            <dd className="font-medium break-all text-forest">{DEMO_CREDENTIALS.email}</dd>
          </div>
          <div>
            <dt className="label text-sm text-ink/75">Mot de passe</dt>
            <dd className="font-medium text-forest">{DEMO_CREDENTIALS.password}</dd>
          </div>
        </dl>
        <Button
          variant="secondary"
          className="mt-6"
          onClick={() => form.setValues({ email: DEMO_CREDENTIALS.email, password: DEMO_CREDENTIALS.password })}
        >
          Remplir le formulaire
        </Button>
        <p className="mt-6 text-sm text-forest">
          Le compte contient 3 commandes passées et un solde de points qui débloque déjà des récompenses.
        </p>
      </aside>
    </Container>
  )
}
