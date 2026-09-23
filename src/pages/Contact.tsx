import { CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router'
import { PageHero } from '../components/sections/PageHero'
import { Button } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { ErrorSummary, SelectField, TextareaField, TextField } from '../components/ui/Field'
import { InstagramIcon, INSTAGRAM_HANDLE, INSTAGRAM_URL } from '../components/ui/InstagramIcon'
import { rules, useForm } from '../lib/forms'
import { useSeo } from '../lib/seo'

const labels = { name: 'Nom', email: 'E-mail', subject: 'Sujet', message: 'Message' }

export default function Contact() {
  useSeo('Contact', 'Une question sur [RE]BELLE, [RE]CONFORT ou votre commande ? Écrivez-nous via le formulaire de contact ou sur Instagram @rituelvertueux.')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const form = useForm(
    { name: '', email: '', subject: '', message: '' },
    {
      name: [rules.required()],
      email: [rules.required(), rules.email()],
      subject: [rules.required('Choisissez un sujet.')],
      message: [rules.required(), rules.minLength(10)],
    },
  )

  return (
    <>
      <PageHero
        title="Nous écrire"
        intro={<p>Une question sur nos rituels, une idée de recette, une remarque ? Nous lisons tous les messages.</p>}
      />
      <Container className="grid gap-12 pb-24 lg:grid-cols-[1.4fr_1fr]">
        <section aria-labelledby="form-title">
          <h2 id="form-title" className="sr-only">
            Formulaire de contact
          </h2>
          {sent ? (
            <div role="status" className="flex gap-4 rounded-(--radius-card) bg-cream-deep p-7">
              <CheckCircle2 aria-hidden="true" className="size-7 shrink-0 text-success" />
              <div>
                <p className="font-display text-2xl text-forest">Message envoyé, merci.</p>
                <p className="mt-2 text-ink/90">
                  Site de démonstration : votre message n’a été transmis à personne et n’est pas conservé.
                </p>
                <Button
                  variant="ghost"
                  className="mt-2 -ml-6"
                  onClick={() => {
                    form.setValues({ name: '', email: '', subject: '', message: '' })
                    setSent(false)
                  }}
                >
                  Écrire un autre message
                </Button>
              </div>
            </div>
          ) : (
            <form
              noValidate
              className="grid gap-6"
              onSubmit={form.handleSubmit(() => {
                setSending(true)
                setTimeout(() => {
                  setSending(false)
                  setSent(true)
                }, 700)
              })}
            >
              <ErrorSummary errors={form.errors} labels={labels} summaryRef={form.summaryRef} />
              <div className="grid gap-6 sm:grid-cols-2">
                <TextField label={labels.name} required autoComplete="name" {...form.field('name')} />
                <TextField label={labels.email} required type="email" autoComplete="email" {...form.field('email')} />
              </div>
              <SelectField label={labels.subject} required {...form.field('subject')}>
                <option value="">Choisir…</option>
                <option>Question sur un produit</option>
                <option>Ma commande (démo)</option>
                <option>Programme de fidélité</option>
                <option>Presse et partenariats</option>
                <option>Autre</option>
              </SelectField>
              <TextareaField label={labels.message} required hint="10 caractères minimum." {...form.field('message')} />
              <div>
                <Button type="submit" size="lg" disabled={sending} aria-busy={sending}>
                  {sending ? 'Envoi…' : 'Envoyer le message'}
                </Button>
              </div>
            </form>
          )}
        </section>
        <aside className="self-start rounded-(--radius-card) bg-rebelle p-8" aria-labelledby="insta-contact">
          <InstagramIcon size={32} className="text-forest" />
          <h2 id="insta-contact" className="mt-4 text-3xl">
            Sur Instagram
          </h2>
          <p className="mt-3 text-forest">Recettes, coulisses et moments de rituel, partagés chaque semaine.</p>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-forest px-6 font-medium text-cream hover:bg-ink"
          >
            {INSTAGRAM_HANDLE}
            <span className="sr-only">(nouvel onglet)</span>
          </a>
          <p className="mt-8 text-sm text-forest">
            Adresse et SIRET : informations fictives, voir les <Link to="/mentions-legales" className="underline">mentions légales</Link>.
          </p>
        </aside>
      </Container>
    </>
  )
}
