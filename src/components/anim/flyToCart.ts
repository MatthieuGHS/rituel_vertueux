import { gsap } from './gsap'

/**
 * Micro-animation d'ajout au panier : une vignette du stick détouré « vole »
 * de la source vers l'icône panier du header, puis l'icône rebondit.
 */
export function flyToCart(imageSrc: string, from: DOMRect): Promise<void> {
  const target = document.querySelector<HTMLElement>('[data-cart-icon]')
  if (!target) return Promise.resolve()
  const to = target.getBoundingClientRect()

  const img = document.createElement('img')
  img.src = imageSrc
  img.alt = ''
  img.setAttribute('aria-hidden', 'true')
  const width = 44
  const height = 170
  Object.assign(img.style, {
    position: 'fixed',
    left: '0px',
    top: '0px',
    width: `${width}px`,
    height: `${height}px`,
    objectFit: 'contain',
    zIndex: '80',
    pointerEvents: 'none',
    willChange: 'transform, opacity',
  })
  document.body.appendChild(img)

  const startX = from.left + from.width / 2 - width / 2
  const startY = from.top + from.height / 2 - height / 2
  const endX = to.left + to.width / 2 - width / 2
  const endY = to.top + to.height / 2 - height / 2
  const lift = Math.min(160, Math.abs(startY - endY) * 0.35 + 60)

  return new Promise((resolve) => {
    const tl = gsap.timeline({
      onComplete: () => {
        img.remove()
        resolve()
      },
    })
    tl.set(img, { x: startX, y: startY, rotation: -8, scale: 0.9, autoAlpha: 1 })
      .to(img, { x: startX + (endX - startX) * 0.45, y: Math.min(startY, endY) - lift, rotation: 70, scale: 0.7, duration: 0.38, ease: 'power2.out' })
      .to(img, { x: endX, y: endY, rotation: 160, scale: 0.18, duration: 0.42, ease: 'power2.in' })
      .to(img, { autoAlpha: 0, duration: 0.12 }, '-=0.08')
      .fromTo(target, { scale: 1 }, { scale: 1.22, duration: 0.14, yoyo: true, repeat: 1, ease: 'power1.out', clearProps: 'transform' }, '-=0.1')
  })
}
