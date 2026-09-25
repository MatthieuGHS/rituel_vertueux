import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { preload } from 'react-dom'
import type { ImageAsset } from '../../assets/images/types'
import { cn } from '../../lib/cn'

interface ResponsiveImageProps {
  image: ImageAsset
  alt: string
  /** Attribut `sizes` : largeur réelle d'affichage selon le viewport. */
  sizes: string
  /** Image LCP : chargement immédiat, priorité haute et preload. */
  priority?: boolean
  className?: string
  imgClassName?: string
  /** `natural` réserve le ratio de la source (zéro CLS). `fill` : le parent fixe la taille. */
  layout?: 'natural' | 'fill'
  style?: CSSProperties
}

const FORMAT_TYPES: Record<string, string> = { avif: 'image/avif', webp: 'image/webp' }

export function ResponsiveImage({
  image,
  alt,
  sizes,
  priority = false,
  className,
  imgClassName,
  layout = 'natural',
  style,
}: ResponsiveImageProps) {
  const { picture, lqip } = image
  const ref = useRef<HTMLImageElement>(null)
  const [loaded, setLoaded] = useState(priority)

  if (priority && picture.sources.avif) {
    preload(picture.img.src, {
      as: 'image',
      imageSrcSet: picture.sources.avif,
      imageSizes: sizes,
      fetchPriority: 'high',
      type: 'image/avif',
    })
  }

  useEffect(() => {
    if (ref.current?.complete) setLoaded(true)
  }, [])

  return (
    <div
      className={cn(
        'relative',
        // overflow-hidden seulement pour les photos (placeholder flou agrandi) : sur les détourés,
        // il couperait net l'ombre portée (drop-shadow) aux bords de l'image.
        lqip && 'overflow-hidden',
        layout === 'fill' && 'h-full w-full',
        className,
      )}
      style={{ ...(layout === 'natural' ? { aspectRatio: `${picture.img.w} / ${picture.img.h}` } : null), ...style }}
    >
      {lqip && (
        <span
          aria-hidden="true"
          className={cn(
            'absolute inset-0 scale-110 bg-cover bg-center blur-xl transition-opacity duration-500',
            loaded ? 'opacity-0' : 'opacity-100',
          )}
          style={{ backgroundImage: `url(${lqip})` }}
        />
      )}
      <picture>
        {Object.entries(picture.sources).map(([format, srcSet]) => (
          <source key={format} type={FORMAT_TYPES[format]} srcSet={srcSet} sizes={sizes} />
        ))}
        <img
          ref={ref}
          src={picture.img.src}
          width={picture.img.w}
          height={picture.img.h}
          alt={alt}
          sizes={sizes}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : undefined}
          onLoad={() => setLoaded(true)}
          className={cn(
            'relative h-full w-full object-cover transition-opacity duration-500',
            loaded ? 'opacity-100' : 'opacity-0',
            imgClassName,
          )}
        />
      </picture>
    </div>
  )
}
