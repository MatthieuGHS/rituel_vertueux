import { Clock } from 'lucide-react'
import type { ReactNode } from 'react'
import { photo } from '../../assets/images/photos'
import { products } from '../../data/products'
import type { Recipe } from '../../data/recipes'
import { ResponsiveImage } from '../ui/ResponsiveImage'

interface RecipeCardProps {
  recipe: Recipe
  headingLevel?: 'h2' | 'h3'
  children?: ReactNode
}

export function RecipeCard({ recipe, headingLevel: Heading = 'h3', children }: RecipeCardProps) {
  const product = products[recipe.product]
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-(--radius-card) bg-cream-deep">
      <div className="relative">
        <ResponsiveImage
          image={photo(recipe.image)}
          alt={recipe.imageAlt}
          sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 92vw"
          className="aspect-[4/3]"
          layout="fill"
        />
        <span
          className="label absolute left-4 top-4 rounded-full px-3 py-1 text-[0.95rem] font-bold text-forest"
          style={{ backgroundColor: product.theme.bg }}
        >
          {product.name}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="label flex items-center gap-2 text-[0.95rem] text-ink/75">
          {recipe.temperature}
          <span aria-hidden="true" className="size-1 rounded-full bg-ink/40" />
          <Clock aria-hidden="true" className="size-4" />
          {recipe.minutes} min
        </p>
        <Heading className="mt-2 text-2xl">{recipe.title}</Heading>
        <p className="mt-2 text-ink/85">{recipe.intro}</p>
        {children}
      </div>
    </article>
  )
}
