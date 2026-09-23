import { lazy, Suspense } from 'react'
import { HomeHero } from '../components/sections/home/HomeHero'
import { useSeo } from '../lib/seo'

const HomeRest = lazy(() => import('../components/sections/home/HomeRest'))

export default function Home() {
  useSeo(
    'Rituel Vertueux',
    'Rituel Vertueux, des boissons fonctionnelles en sticks : [RE]BELLE framboise-hibiscus, riche en vitamine C, et [RE]CONFORT banane-cacao, riche en fibres.',
  )
  return (
    <>
      <HomeHero />
      <Suspense fallback={<div className="min-h-dvh bg-cream-deep" />}>
        <HomeRest />
      </Suspense>
    </>
  )
}
