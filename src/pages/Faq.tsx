import { ChevronDown } from 'lucide-react'
import { useId, useState } from 'react'
import { Link } from 'react-router'
import { PageHero } from '../components/sections/PageHero'
import { Container } from '../components/ui/Container'
import { faq, type FaqItem } from '../data/faq'
import { cn } from '../lib/cn'
import { useSeo } from '../lib/seo'

function AccordionItem({ item }: { item: FaqItem }) {
  const [open, setOpen] = useState(false)
  const id = useId()
  return (
    <div className="border-b border-forest/15">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          id={`${id}-button`}
          onClick={() => setOpen((value) => !value)}
          className="flex min-h-14 w-full items-center justify-between gap-4 py-4 text-left font-display text-xl font-semibold text-forest"
        >
          {item.question}
          <span className={cn('flex size-9 shrink-0 items-center justify-center rounded-full bg-cream-deep transition-transform duration-300', open && 'rotate-180')}>
            <ChevronDown aria-hidden="true" className="size-5" />
          </span>
        </button>
      </h3>
      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-button`}
        hidden={!open}
        className="pb-6 pr-12 text-lg leading-relaxed text-ink/90"
      >
        {item.answer}
      </div>
    </div>
  )
}

export default function Faq() {
  useSeo('Questions fréquentes', 'Préparation, conservation, allergènes, livraison, fidélité et compte de démonstration : les réponses aux questions sur Rituel Vertueux.')
  return (
    <>
      <PageHero title="Questions fréquentes" intro={<p>Tout ce qu’il faut savoir sur nos sticks, la livraison et le programme de fidélité.</p>} />
      <Container className="grid gap-12 pb-24 lg:grid-cols-[14rem_1fr]">
        <nav aria-label="Thèmes de la FAQ" className="lg:sticky lg:top-28 lg:self-start">
          <ul className="flex flex-wrap gap-2 lg:flex-col">
            {faq.map((group) => (
              <li key={group.id}>
                <a href={`#${group.id}`} className="inline-flex min-h-11 items-center rounded-full px-4 text-forest hover:bg-cream-deep">
                  {group.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="space-y-14">
          {faq.map((group) => (
            <section key={group.id} id={group.id} aria-labelledby={`${group.id}-title`} className="scroll-mt-28">
              <h2 id={`${group.id}-title`} className="display-md">
                {group.title}
              </h2>
              <div className="mt-4">
                {group.items.map((item) => (
                  <AccordionItem key={item.question} item={item} />
                ))}
              </div>
            </section>
          ))}
          <p className="text-ink/85">
            Vous ne trouvez pas votre réponse ?{' '}
            <Link to="/contact" className="font-medium text-terracotta-dark underline underline-offset-4">
              Écrivez-nous
            </Link>
            .
          </p>
        </div>
      </Container>
    </>
  )
}
