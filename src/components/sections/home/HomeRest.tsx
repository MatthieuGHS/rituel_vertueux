import { IngredientAssembly } from '../../anim/IngredientAssembly'
import { KineticBand } from '../../anim/KineticBand'
import { MomentsGallery } from '../../anim/MomentsGallery'
import { InstagramGrid } from '../InstagramGrid'
import { Concept } from './Concept'
import { RecipesTeaser } from './RecipesTeaser'
import { ShopCta } from './ShopCta'
import { ThreeGestures } from './ThreeGestures'
import { TwoRituals } from './TwoRituals'

/** Sections de l'accueil sous la ligne de flottaison (chunk séparé : GSAP hors chemin critique). */
export default function HomeRest() {
  return (
    <>
      <Concept />
      <TwoRituals />
      <IngredientAssembly />
      <KineticBand />
      <ThreeGestures />
      <MomentsGallery />
      <RecipesTeaser />
      <InstagramGrid />
      <ShopCta />
    </>
  )
}
