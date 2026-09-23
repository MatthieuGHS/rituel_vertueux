import { photo } from '../assets/images/photos'
import { Reveal } from '../components/anim/Reveal'
import { PageHero } from '../components/sections/PageHero'
import { ButtonLink } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { ResponsiveImage } from '../components/ui/ResponsiveImage'
import { useSeo } from '../lib/seo'

const reMeanings = [
  { verb: 'Reprendre', before: '', after: 'prendre', text: 'Reprendre un moment pour soi, même court, au milieu d’une journée chargée.' },
  { verb: 'Se recentrer', before: 'Se ', after: 'centrer', text: 'Faire une pause, poser le téléphone, savourer quelque chose de bon.' },
  { verb: 'Renouer avec soi', before: '', after: 'nouer avec soi', text: 'Transformer un geste simple en habitude qui fait du bien.' },
]

const values = [
  { title: 'Le plaisir d’abord', text: 'Une boisson fonctionnelle doit d’abord être bonne. Si l’on n’a pas envie d’y revenir, ce n’est pas un rituel.' },
  { title: 'La transparence', text: 'Des listes d’ingrédients lisibles, des pourcentages affichés, des allégations limitées à ce que disent nos étiquettes.' },
  { title: 'La simplicité', text: 'Un stick, de l’eau, un mélange. Pas de balance, pas de doseur, pas de mode d’emploi compliqué.' },
]

export default function NotreHistoire() {
  useSeo('Notre histoire', 'La mission de Rituel Vertueux, nos valeurs, et ce que signifie le « [RE] » de [RE]BELLE et [RE]CONFORT.')

  return (
    <>
      <PageHero
        title="Faire du bien-être un plaisir quotidien"
        intro={
          <p>
            Rituel Vertueux est né d’une idée simple : les boissons « bien-être » n’ont pas à ressembler à des médicaments.
            Nous avons voulu des recettes gourmandes, solaires, qui donnent envie d’y revenir chaque jour.
          </p>
        }
        image={photo('duo-cuisine-portrait')}
        imageAlt="Les boîtes [RE]BELLE et [RE]CONFORT sur un plan de travail ensoleillé, entre fleurs, fruits et smoothies"
      />

      <section className="bg-forest py-20 text-cream lg:py-32" aria-labelledby="re-title">
        <Container>
          <h2 id="re-title" className="display-lg text-cream">
            Pourquoi « [RE] » ?
          </h2>
          <p className="mt-5 max-w-2xl text-lg text-cream/85">
            Le préfixe qui ouvre [RE]BELLE et [RE]CONFORT dit le mouvement de revenir vers soi. Trois verbes le résument.
          </p>
          <Reveal as="ul" stagger className="mt-14 grid gap-10 md:grid-cols-3">
            {reMeanings.map((item) => (
              <li key={item.verb} className="border-t border-cream/25 pt-6">
                <h3 className="font-display text-4xl font-semibold text-reconfort" aria-label={item.verb}>
                  {item.before}
                  <span className="text-rebelle">[RE]</span>
                  {item.after}
                </h3>
                <p className="mt-3 text-cream/85">{item.text}</p>
              </li>
            ))}
          </Reveal>
        </Container>
      </section>

      <section className="py-20 lg:py-28" aria-labelledby="mission-title">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 id="mission-title" className="display-md">
              Notre mission
            </h2>
            <div className="prose-rv mt-6 text-lg">
              <p>
                Proposer une gamme de boissons fonctionnelles en sticks, pensée pour associer plaisir et bien-être au
                quotidien. Deux recettes, deux humeurs, un même format nomade.
              </p>
              <p>
                Nos inspirations viennent de la Méditerranée : la lumière du matin, les fruits mûrs, les pauses à l’ombre.
                C’est cette douceur de vivre que nous voulons glisser dans un stick.
              </p>
            </div>
          </div>
          <ResponsiveImage
            image={photo('rebelle-plage')}
            alt="Stick [RE]BELLE glissé dans le nœud d’un maillot de bain, au bord de la piscine"
            sizes="(min-width: 1024px) 34rem, 92vw"
            className="aspect-[4/5] rounded-(--radius-card)"
            layout="fill"
          />
        </Container>
      </section>

      <section className="bg-cream-deep py-20 lg:py-28" aria-labelledby="valeurs-title">
        <Container>
          <h2 id="valeurs-title" className="display-md">
            Ce qui nous guide
          </h2>
          <Reveal as="ul" stagger className="mt-10 grid gap-6 md:grid-cols-3">
            {values.map((value) => (
              <li key={value.title} className="rounded-(--radius-card) bg-cream p-7">
                <h3 className="text-2xl">{value.title}</h3>
                <p className="mt-3 text-ink/90">{value.text}</p>
              </li>
            ))}
          </Reveal>
        </Container>
      </section>

      <section className="py-20 lg:py-28" aria-labelledby="engagement-title">
        <Container size="narrow" className="text-center">
          <h2 id="engagement-title" className="display-md">
            Notre engagement ingrédients
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-ink/90">
            Chaque ingrédient a une raison d’être dans la recette : le goût, la texture ou la fonction. Nous affichons
            les pourcentages des ingrédients principaux et nous ne revendiquons que deux allégations : « riche en
            vitamine C » pour [RE]BELLE et « riche en fibres » pour [RE]CONFORT.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <ButtonLink to="/ingredients">Voir les ingrédients</ButtonLink>
            <ButtonLink to="/rituels" variant="secondary">
              Découvrir les rituels
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  )
}
