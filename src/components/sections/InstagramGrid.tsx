import { photo, type PhotoKey } from '../../assets/images'
import { Container } from '../ui/Container'
import { InstagramIcon, INSTAGRAM_HANDLE, INSTAGRAM_URL } from '../ui/InstagramIcon'
import { ResponsiveImage } from '../ui/ResponsiveImage'

const posts: Array<{ image: PhotoKey; alt: string }> = [
  { image: 'rebelle-plaisir', alt: 'Main tenant un stick [RE]BELLE devant l’inscription « Plaisir & gourmandise » sur fond rose' },
  { image: 'reconfort-poudre', alt: 'Poudre chocolatée s’écoulant d’un stick [RE]CONFORT sur fond jaune' },
  { image: 'rebelle-podium', alt: 'Stick [RE]BELLE posé sur un socle rond rose' },
  { image: 'reconfort-plaisir', alt: 'Main tenant un stick [RE]CONFORT devant l’inscription « Plaisir & gourmandise » sur fond jaune' },
  { image: 'rebelle-sport', alt: 'Stick [RE]BELLE et shaker rose dans une salle de sport' },
  { image: 'reconfort-plage', alt: 'Stick [RE]CONFORT glissé dans le nœud d’un maillot de bain au soleil' },
]

/** Grille Instagram statique (aucun appel à l'API Instagram). */
export function InstagramGrid() {
  return (
    <section className="bg-cream-deep py-20 lg:py-28" aria-labelledby="insta-title">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="insta-title" className="display-md">
              Le rituel sur Instagram
            </h2>
            <p className="mt-3 text-ink/85">Vos rituels du quotidien, partagés avec {INSTAGRAM_HANDLE}.</p>
          </div>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-forest px-5 font-medium text-forest transition-colors hover:bg-forest hover:text-cream"
          >
            <InstagramIcon size={20} />
            Suivre {INSTAGRAM_HANDLE}
            <span className="sr-only">(nouvel onglet)</span>
          </a>
        </div>
        <ul className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-6">
          {posts.map((post) => (
            <li key={post.image}>
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="group block overflow-hidden rounded-2xl">
                <ResponsiveImage
                  image={photo(post.image)}
                  alt={post.alt}
                  sizes="(min-width: 1024px) 12rem, (min-width: 640px) 30vw, 46vw"
                  className="aspect-square"
                  imgClassName="transition-transform duration-500 group-hover:scale-105"
                  layout="fill"
                />
                <span className="sr-only">Voir sur Instagram (nouvel onglet)</span>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
