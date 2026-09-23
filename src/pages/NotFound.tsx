import { cutout } from '../assets/images'
import { ButtonLink } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { ResponsiveImage } from '../components/ui/ResponsiveImage'
import { useSeo } from '../lib/seo'

export default function NotFound() {
  useSeo('Page introuvable', 'Cette page n’existe pas ou a été déplacée. Revenez à l’accueil de Rituel Vertueux.')
  return (
    <Container className="grid items-center gap-10 pb-24 pt-10 md:grid-cols-[1fr_1.2fr] lg:pt-16">
      <div className="relative mx-auto flex aspect-square w-full max-w-sm items-center justify-center">
        <span aria-hidden="true" className="absolute inset-0 rounded-(--radius-blob) bg-rebelle" />
        <ResponsiveImage
          image={cutout('reconfort-stick')}
          alt="Stick [RE]CONFORT renversé"
          sizes="8rem"
          className="relative w-28 rotate-[160deg]"
          imgClassName="object-contain drop-shadow-[0_24px_24px_rgb(43_38_34/0.25)]"
        />
        <span aria-hidden="true" className="absolute bottom-[14%] left-[30%] h-6 w-36 rounded-full bg-reconfort-deep/50 blur-[2px]" />
      </div>
      <div>
        <p className="label text-2xl font-bold text-terracotta-dark">Erreur 404</p>
        <h1 className="display-lg mt-2">Oups, le rituel s’est renversé</h1>
        <p className="mt-5 max-w-md text-lg text-ink/90">La page que vous cherchez n’existe pas ou a changé d’adresse.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink to="/">Retour à l’accueil</ButtonLink>
          <ButtonLink to="/boutique" variant="secondary">
            Boutique
          </ButtonLink>
        </div>
      </div>
    </Container>
  )
}
