import type { ReactNode } from 'react'
import type { ImageAsset } from '../../assets/images'
import { cn } from '../../lib/cn'
import { Container } from '../ui/Container'
import { ResponsiveImage } from '../ui/ResponsiveImage'

type Tone = 'cream' | 'deep' | 'rebelle' | 'reconfort' | 'forest'

const tones: Record<Tone, string> = {
  cream: 'bg-cream',
  deep: 'bg-cream-deep',
  rebelle: 'bg-rebelle',
  reconfort: 'bg-reconfort',
  forest: 'bg-forest text-cream [&_h1]:text-cream',
}

interface PageHeroProps {
  title: ReactNode
  intro?: ReactNode
  tone?: Tone
  image?: ImageAsset
  imageAlt?: string
  children?: ReactNode
  /** Priorité de chargement de l'image (LCP de la page). */
  priority?: boolean
}

/** En-tête des pages intérieures : titre Fraunces à gauche, visuel dans une forme organique à droite. */
export function PageHero({ title, intro, tone = 'cream', image, imageAlt = '', children, priority = true }: PageHeroProps) {
  return (
    <section className={cn('relative overflow-hidden', tones[tone])}>
      <Container className={cn('grid items-center gap-10 pb-16 pt-10 lg:pb-24 lg:pt-16', image && 'lg:grid-cols-[1.15fr_1fr]')}>
        <div className="max-w-2xl">
          <h1 className="display-lg">{title}</h1>
          {intro && <div className="mt-6 max-w-xl text-lg leading-relaxed">{intro}</div>}
          {children && <div className="mt-8">{children}</div>}
        </div>
        {image && (
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <ResponsiveImage
              image={image}
              alt={imageAlt}
              priority={priority}
              sizes="(min-width: 1024px) 40vw, (min-width: 640px) 28rem, 92vw"
              className="aspect-[4/5] rounded-[48%_52%_45%_55%/40%_38%_62%_60%] shadow-(--shadow-soft)"
              layout="fill"
            />
          </div>
        )}
      </Container>
    </section>
  )
}
