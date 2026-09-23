import { CreditCard, Lock, LogIn, ShoppingBag } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { OrderSummary } from '../components/sections/OrderSummary'
import { Button, ButtonLink } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { ErrorSummary, TextField } from '../components/ui/Field'
import { products, productList, type ProductId } from '../data/products'
import { cn } from '../lib/cn'
import { formatNumber, formatPrice } from '../lib/format'
import { rules, useForm } from '../lib/forms'
import { computeTotals, LOYALTY, SHIPPING, type AppliedReward, type RewardId } from '../lib/loyalty'
import { useSeo } from '../lib/seo'
import { useAuth } from '../store/auth'
import { useCart } from '../store/cart'
import { generateOrderNumber, useLedger, useOrders, type ShippingMethod } from '../store/orders'

const labels = {
  firstName: 'Prénom',
  lastName: 'Nom',
  email: 'E-mail',
  phone: 'Téléphone',
  address: 'Adresse',
  postalCode: 'Code postal',
  city: 'Ville',
}

const radioCard =
  'flex min-h-14 cursor-pointer items-start gap-3 rounded-2xl border-2 p-4 transition-colors has-[:checked]:border-forest has-[:checked]:bg-white has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-55 has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-terracotta-dark'

export default function Commande() {
  useSeo('Commande', 'Finalisez votre commande de démonstration Rituel Vertueux : coordonnées, livraison et récompense fidélité. Aucun paiement réel.')
  const lines = useCart((state) => state.lines)
  const clearCart = useCart((state) => state.clear)
  const session = useAuth((state) => state.session)
  const addOrder = useOrders((state) => state.addOrder)
  const ledger = useLedger(session?.email)
  const navigate = useNavigate()
  const [shipping, setShipping] = useState<ShippingMethod>('domicile')
  const [rewardId, setRewardId] = useState<RewardId | 'none'>('none')
  const [freeBoxProduct, setFreeBoxProduct] = useState<ProductId>('rebelle')
  const [placing, setPlacing] = useState(false)

  const profile = session?.profile
  const form = useForm(
    {
      firstName: profile?.firstName ?? '',
      lastName: profile?.lastName ?? '',
      email: profile?.email ?? '',
      phone: profile?.phone ?? '',
      address: profile?.address ?? '',
      postalCode: profile?.postalCode ?? '',
      city: profile?.city ?? '',
    },
    {
      firstName: [rules.required()],
      lastName: [rules.required()],
      email: [rules.required(), rules.email()],
      phone: [rules.phone()],
      address: [rules.required()],
      postalCode: [rules.required(), rules.postalCode()],
      city: [rules.required()],
    },
  )

  const reward: AppliedReward | null = useMemo(() => {
    if (!session || rewardId === 'none') return null
    return rewardId === 'freeBox' ? { id: rewardId, productId: freeBoxProduct } : { id: rewardId }
  }, [session, rewardId, freeBoxProduct])
  const totals = computeTotals(lines, reward)

  if (placing) {
    return (
      <Container className="py-24">
        <p role="status" className="font-display text-2xl text-forest">
          Commande validée, préparation du récapitulatif…
        </p>
      </Container>
    )
  }

  if (lines.length === 0) {
    return (
      <Container className="pb-24 pt-10 lg:pt-16">
        <h1 className="display-lg">Commande</h1>
        <div className="mt-10 flex flex-col items-start gap-5 rounded-(--radius-card) bg-cream-deep p-10">
          <ShoppingBag aria-hidden="true" className="size-10 text-terracotta" strokeWidth={1.6} />
          <p className="font-display text-2xl text-forest">Votre panier est vide.</p>
          <ButtonLink to="/boutique">Voir la boutique</ButtonLink>
        </div>
      </Container>
    )
  }

  const submit = form.handleSubmit((values) => {
    const number = generateOrderNumber()
    addOrder({
      number,
      date: new Date().toISOString(),
      lines,
      reward,
      totals,
      pointsEarned: session ? totals.pointsEarned : 0,
      pointsSpent: session ? totals.pointsSpent : 0,
      shippingMethod: shipping,
      customer: { ...values },
      accountEmail: session?.email ?? null,
    })
    setPlacing(true)
    clearCart()
    navigate('/commande/confirmation', { replace: true })
  })

  return (
    <Container className="pb-24 pt-10 lg:pt-16">
      <h1 className="display-lg">Commande</h1>
      <p className="mt-3 text-lg text-ink/85">Site de démonstration : aucune commande n’est expédiée, aucun paiement n’est demandé.</p>

      {!session && (
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-(--radius-card) bg-reconfort p-6">
          <p className="flex items-start gap-3 text-forest">
            <LogIn aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
            <span>
              Vous commandez en invité. Connectez-vous pour gagner <strong>{formatNumber(totals.pointsEarned)} points</strong> et utiliser vos récompenses.
            </span>
          </p>
          <ButtonLink to="/compte/connexion" state={{ from: '/commande' }} variant="secondary">
            Se connecter
          </ButtonLink>
        </div>
      )}

      <form noValidate onSubmit={submit} className="mt-10 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-10">
          <ErrorSummary errors={form.errors} labels={labels} summaryRef={form.summaryRef} />

          <fieldset className="grid gap-6 sm:grid-cols-2">
            <legend className="font-display mb-6 text-3xl font-semibold text-forest">Coordonnées</legend>
            <TextField label={labels.firstName} required autoComplete="given-name" {...form.field('firstName')} />
            <TextField label={labels.lastName} required autoComplete="family-name" {...form.field('lastName')} />
            <TextField label={labels.email} required type="email" autoComplete="email" {...form.field('email')} />
            <TextField label={labels.phone} type="tel" autoComplete="tel" hint="Format : 06 12 34 56 78" {...form.field('phone')} />
            <TextField label={labels.address} required autoComplete="street-address" className="sm:col-span-2" {...form.field('address')} />
            <TextField label={labels.postalCode} required inputMode="numeric" autoComplete="postal-code" {...form.field('postalCode')} />
            <TextField label={labels.city} required autoComplete="address-level2" {...form.field('city')} />
          </fieldset>

          <fieldset>
            <legend className="font-display mb-4 text-3xl font-semibold text-forest">Livraison</legend>
            <div className="grid gap-3 sm:grid-cols-2">
              {(
                [
                  { id: 'domicile', title: 'À domicile', text: 'Colis livré en 3 à 5 jours ouvrés.' },
                  { id: 'relais', title: 'En point relais', text: 'Retrait dans le point relais de votre choix.' },
                ] as const
              ).map((option) => (
                <label key={option.id} className={cn(radioCard, 'border-forest/20')}>
                  <input
                    type="radio"
                    name="shipping"
                    value={option.id}
                    checked={shipping === option.id}
                    onChange={() => setShipping(option.id)}
                    className="mt-1 size-5 accent-forest"
                  />
                  <span>
                    <span className="block font-semibold text-forest">{option.title}</span>
                    <span className="block text-sm text-ink/80">
                      {option.text} {totals.shipping === 0 ? 'Offerte.' : `${formatPrice(SHIPPING.fee)}.`}
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          {session && (
            <fieldset>
              <legend className="font-display mb-2 text-3xl font-semibold text-forest">Récompense fidélité</legend>
              <p className="mb-4 text-ink/85">
                Solde : <strong>{formatNumber(ledger.balance)} points</strong>. Une récompense par commande.
              </p>
              <div className="grid gap-3">
                <label className={cn(radioCard, 'border-forest/20')}>
                  <input type="radio" name="reward" checked={rewardId === 'none'} onChange={() => setRewardId('none')} className="mt-1 size-5 accent-forest" />
                  <span className="font-semibold text-forest">Garder mes points</span>
                </label>
                {LOYALTY.rewards.map((option) => {
                  const locked = ledger.balance < option.cost
                  return (
                    <div key={option.id}>
                      <label className={cn(radioCard, 'border-forest/20')}>
                        <input
                          type="radio"
                          name="reward"
                          disabled={locked}
                          checked={rewardId === option.id}
                          onChange={() => setRewardId(option.id)}
                          className="mt-1 size-5 accent-forest"
                          aria-describedby={`reward-${option.id}`}
                        />
                        <span className="flex-1">
                          <span className="block font-semibold text-forest">
                            {option.title} <span className="label ml-1 text-base text-ink/75">{formatNumber(option.cost)} pts</span>
                          </span>
                          <span id={`reward-${option.id}`} className="block text-sm text-ink/80">
                            {locked ? `Verrouillée : encore ${formatNumber(option.cost - ledger.balance)} points.` : option.description}
                          </span>
                        </span>
                      </label>
                      {option.id === 'freeBox' && rewardId === 'freeBox' && (
                        <div className="mt-3 flex flex-wrap gap-2 pl-12" role="group" aria-label="Choix de la boîte offerte">
                          {productList.map((product) => (
                            <button
                              key={product.id}
                              type="button"
                              aria-pressed={freeBoxProduct === product.id}
                              onClick={() => setFreeBoxProduct(product.id)}
                              className={cn(
                                'label min-h-11 rounded-full border-2 px-4 text-base font-bold',
                                freeBoxProduct === product.id ? 'border-forest bg-forest text-cream' : 'border-forest/25 text-forest',
                              )}
                            >
                              {product.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </fieldset>
          )}

          <fieldset disabled aria-describedby="paiement-note" className="rounded-(--radius-card) border-2 border-dashed border-forest/25 p-6">
            <legend className="font-display px-2 text-3xl font-semibold text-forest">Paiement</legend>
            <p id="paiement-note" className="flex items-center gap-2 font-semibold text-terracotta-dark">
              <Lock aria-hidden="true" className="size-5" />
              Paiement désactivé — site de démonstration
            </p>
            <div className="mt-4 grid gap-4 opacity-60 sm:grid-cols-2">
              <TextField id="carte" label="Numéro de carte" placeholder="•••• •••• •••• ••••" className="sm:col-span-2" />
              <TextField id="expiration" label="Expiration" placeholder="MM/AA" />
              <TextField id="cvc" label="Cryptogramme" placeholder="•••" />
            </div>
            <p className="mt-4 flex items-center gap-2 text-sm text-ink/75">
              <CreditCard aria-hidden="true" className="size-4" />
              Aucune donnée bancaire n’est demandée ni enregistrée.
            </p>
          </fieldset>
        </div>

        <aside className="space-y-5 self-start rounded-(--radius-card) bg-cream-deep p-6 sm:p-8 lg:sticky lg:top-28" aria-labelledby="recap-title">
          <h2 id="recap-title" className="text-2xl">
            Votre commande
          </h2>
          <ul className="space-y-2">
            {lines.map((line) => (
              <li key={line.productId} className="flex justify-between gap-3">
                <span>
                  {line.quantity} × {products[line.productId].name}
                </span>
                <span className="tabular-nums">{formatPrice(products[line.productId].price * line.quantity)}</span>
              </li>
            ))}
          </ul>
          <OrderSummary totals={totals} reward={reward} showPoints={Boolean(session)} />
          <Button type="submit" size="lg" className="w-full">
            Valider ma commande (démo)
          </Button>
          <p className="text-center text-sm text-ink/75">
            <Link to="/panier" className="underline underline-offset-4">
              Modifier le panier
            </Link>
          </p>
        </aside>
      </form>
    </Container>
  )
}
