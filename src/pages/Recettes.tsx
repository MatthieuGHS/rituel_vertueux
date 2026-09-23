import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { photo } from '../assets/images'
import { PageHero } from '../components/sections/PageHero'
import { RecipeCard } from '../components/sections/RecipeCard'
import { Container } from '../components/ui/Container'
import { productList, type ProductId } from '../data/products'
import { recipes } from '../data/recipes'
import { cn } from '../lib/cn'
import { useSeo } from '../lib/seo'

export default function Recettes() {
  useSeo('Recettes', 'Six recettes simples avec les sticks [RE]BELLE et [RE]CONFORT : latte glacé, infusion rosée, smoothies, chocolat chaud, pétillant.')
  const [filter, setFilter] = useState<ProductId | 'all'>('all')
  const visible = recipes.filter((recipe) => filter === 'all' || recipe.product === filter)

  return (
    <>
      <PageHero
        title="Recettes"
        intro={<p>Le rituel se boit à l’eau, mais il se prête aussi à quelques variations gourmandes. Six idées, prêtes en cinq minutes maximum.</p>}
        image={photo('reconfort-smoothie')}
        imageAlt="Smoothie banane-cacao dans un verre, à côté d’un stick [RE]CONFORT et de rondelles de banane"
      />
      <Container className="pb-24">
        <div role="group" aria-label="Filtrer les recettes" className="flex flex-wrap gap-2">
          {[{ id: 'all' as const, label: 'Toutes' }, ...productList.map((p) => ({ id: p.id, label: p.name }))].map((option) => (
            <button
              key={option.id}
              type="button"
              aria-pressed={filter === option.id}
              onClick={() => setFilter(option.id)}
              className={cn(
                'label min-h-11 rounded-full border-2 px-5 text-lg font-bold transition-colors',
                filter === option.id ? 'border-forest bg-forest text-cream' : 'border-forest/25 text-forest hover:border-forest',
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
        <p className="sr-only" aria-live="polite">
          {visible.length} recettes affichées
        </p>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((recipe) => (
            <li key={recipe.id}>
              <RecipeCard recipe={recipe} headingLevel="h2">
                <details className="group mt-auto pt-5">
                  <summary className="flex min-h-11 list-none items-center justify-between gap-2 rounded-full border-2 border-forest/20 px-5 font-medium text-forest transition-colors hover:border-forest [&::-webkit-details-marker]:hidden">
                    Voir la recette
                    <ChevronDown aria-hidden="true" className="size-5 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="pt-5">
                    <h3 className="label text-lg font-bold text-forest">Ingrédients</h3>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-ink/90">
                      {recipe.ingredients.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <h3 className="label mt-5 text-lg font-bold text-forest">Préparation</h3>
                    <ol className="mt-2 list-decimal space-y-1 pl-5 text-ink/90">
                      {recipe.steps.map((step) => (
                        <li key={step}>{step}</li>
                      ))}
                    </ol>
                  </div>
                </details>
              </RecipeCard>
            </li>
          ))}
        </ul>
        <p className="mt-10 max-w-2xl text-sm text-ink/75">
          Préparation de référence : 1 stick dans 250 ml d’eau froide ou chaude. Les recettes ci-dessus sont des suggestions de dégustation.
        </p>
      </Container>
    </>
  )
}
