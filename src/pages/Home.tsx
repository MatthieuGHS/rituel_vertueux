import { IngredientAssembly } from '../components/anim/IngredientAssembly'
import { KineticBand } from '../components/anim/KineticBand'
import { MomentsGallery } from '../components/anim/MomentsGallery'
import { Concept } from '../components/sections/home/Concept'
import { HomeHero } from '../components/sections/home/HomeHero'
import { RecipesTeaser } from '../components/sections/home/RecipesTeaser'
import { ShopCta } from '../components/sections/home/ShopCta'
import { ThreeGestures } from '../components/sections/home/ThreeGestures'
import { TwoRituals } from '../components/sections/home/TwoRituals'
import { InstagramGrid } from '../components/sections/InstagramGrid'
import { useSeo } from '../lib/seo'

export default function Home() {
  useSeo(
    'Rituel Vertueux',
    'Rituel Vertueux, des boissons fonctionnelles en sticks : [RE]BELLE framboise-hibiscus, riche en vitamine C, et [RE]CONFORT banane-cacao, riche en fibres.',
  )
  return (
    <>
      <HomeHero />
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
