import { recipes } from '../../../data/recipes'
import { Reveal } from '../../anim/Reveal'
import { ButtonLink } from '../../ui/Button'
import { Container } from '../../ui/Container'
import { RecipeCard } from '../RecipeCard'

export function RecipesTeaser() {
  const selection = [recipes[0], recipes[2], recipes[4]]
  return (
    <section className="py-20 lg:py-32" aria-labelledby="recettes-title">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 id="recettes-title" className="display-lg max-w-xl">
            Au-delà du verre d’eau
          </h2>
          <ButtonLink to="/recettes" variant="secondary">
            Toutes les recettes
          </ButtonLink>
        </div>
        <Reveal as="ul" stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {selection.map((recipe) => (
            <li key={recipe.id}>
              <RecipeCard recipe={recipe} />
            </li>
          ))}
        </Reveal>
      </Container>
    </section>
  )
}
