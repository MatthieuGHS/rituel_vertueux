import { CheckCircle2, FileDown } from 'lucide-react'
import { useState } from 'react'
import { photo } from '../assets/images/photos'
import { PageHero } from '../components/sections/PageHero'
import { Button } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { ErrorSummary, SelectField, TextareaField, TextField } from '../components/ui/Field'
import { NutriScore } from '../components/ui/NutriScore'
import { ProductName } from '../components/ui/ProductName'
import { PACK, productList } from '../data/products'
import { formatPrice } from '../lib/format'
import { rules, useForm } from '../lib/forms'
import { useSeo } from '../lib/seo'

const labels = {
  company: 'Société',
  name: 'Nom et prénom',
  email: 'E-mail professionnel',
  phone: 'Téléphone',
  type: 'Type d’établissement',
  message: 'Votre projet',
}

export default function Pro() {
  useSeo(
    'Espace professionnels',
    'Fiche technique [RE]BELLE et [RE]CONFORT pour les distributeurs : UVC, poids, colisage, DDM, prix de vente conseillé, allergènes. Formulaire de contact distributeur.',
  )
  const [downloadNote, setDownloadNote] = useState(false)
  const [sent, setSent] = useState(false)
  const form = useForm(
    { company: '', name: '', email: '', phone: '', type: '', message: '' },
    {
      company: [rules.required()],
      name: [rules.required()],
      email: [rules.required(), rules.email()],
      phone: [rules.phone()],
      type: [rules.required('Choisissez un type d’établissement.')],
      message: [rules.required(), rules.minLength(20)],
    },
  )

  const rows: Array<{ label: string; value: (p: (typeof productList)[number]) => string }> = [
    { label: 'Dénomination', value: () => PACK.legalName },
    { label: 'UVC', value: () => `1 boîte de ${PACK.sticks} sticks de ${PACK.stickWeightG} g` },
    { label: 'Poids total', value: () => `${PACK.totalWeightG} g (emballage compris)` },
    { label: 'Colisage', value: () => `${PACK.boxesPerCarton} boîtes par carton` },
    { label: 'DDM', value: (p) => `${p.ddmMonths} mois` },
    { label: 'Prix de vente conseillé', value: (p) => `${formatPrice(p.price)} TTC` },
    { label: 'Allégation', value: (p) => p.claim },
    { label: 'Allergènes', value: (p) => p.allergens },
    { label: 'Nutri-Score', value: () => 'A (calculé à partir de la boisson reconstituée)' },
    { label: 'Préparation', value: () => PACK.preparation },
    { label: 'Conservation', value: () => PACK.storage },
  ]

  return (
    <>
      <PageHero
        title="Espace professionnels"
        tone="deep"
        intro={
          <p>
            Épiceries fines, concept stores, salles de sport, cafés, hôtels et spas : retrouvez ici les
            informations techniques de la gamme et contactez-nous pour la distribuer.
          </p>
        }
        image={photo('reconfort-box-stick')}
        imageAlt="Boîte [RE]CONFORT et stick posés sur des socles jaunes"
      />

      <section className="py-20 lg:py-28" aria-labelledby="fiche-title">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 id="fiche-title" className="display-md">
              Fiche technique
            </h2>
            <div>
              <Button variant="secondary" onClick={() => setDownloadNote(true)}>
                <FileDown aria-hidden="true" className="size-5" />
                Télécharger la fiche (PDF)
              </Button>
            </div>
          </div>
          <p aria-live="polite" className="mt-3 min-h-6 text-sm text-ink/80">
            {downloadNote && 'Site de démonstration : aucun fichier n’est téléchargé. La fiche complète est reproduite ci-dessous.'}
          </p>
          <div className="mt-6 overflow-x-auto rounded-(--radius-card) bg-cream-deep" tabIndex={0} role="region" aria-labelledby="fiche-title">
            <table className="w-full min-w-[40rem] border-collapse text-left">
              <caption className="sr-only">Caractéristiques techniques de [RE]BELLE et [RE]CONFORT</caption>
              <thead>
                <tr className="border-b border-forest/15">
                  <th scope="col" className="p-5">
                    <span className="sr-only">Caractéristique</span>
                  </th>
                  {productList.map((product) => (
                    <th key={product.id} scope="col" className="p-5 text-forest">
                      <ProductName product={product} className="text-3xl" />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.label} className="border-b border-forest/10 last:border-0">
                    <th scope="row" className="label w-1/4 p-5 align-top text-base text-ink/80">
                      {row.label}
                    </th>
                    {productList.map((product) => (
                      <td key={product.id} className="p-5 align-top">
                        {row.value(product)}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <th scope="row" className="label p-5 align-top text-base text-ink/80">
                    Ingrédients
                  </th>
                  {productList.map((product) => (
                    <td key={product.id} className="p-5 align-top text-sm leading-relaxed">
                      {product.ingredientsText}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-6 w-40">
            <NutriScore />
          </div>
        </Container>
      </section>

      <section className="bg-cream-deep py-20 lg:py-28" aria-labelledby="distributeur-title">
        <Container size="narrow">
          <h2 id="distributeur-title" className="display-md">
            Devenir distributeur
          </h2>
          <p className="mt-4 text-lg text-ink/90">
            Parlez-nous de votre établissement. Réponse sous 48 h ouvrées (simulation : aucun message n’est envoyé).
          </p>
          {sent ? (
            <div role="status" className="mt-10 flex gap-4 rounded-(--radius-card) bg-cream p-7">
              <CheckCircle2 aria-hidden="true" className="size-7 shrink-0 text-success" />
              <div>
                <p className="font-display text-2xl text-forest">Demande enregistrée, merci {form.values.name.split(' ')[0]}.</p>
                <p className="mt-2 text-ink/90">
                  Sur ce site de démonstration, votre demande n’est transmise à personne. En conditions réelles, l’équipe
                  commerciale vous recontacterait à l’adresse {form.values.email}.
                </p>
              </div>
            </div>
          ) : (
            <form noValidate onSubmit={form.handleSubmit(() => setSent(true))} className="mt-10 grid gap-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <ErrorSummary errors={form.errors} labels={labels} summaryRef={form.summaryRef} />
              </div>
              <TextField label={labels.company} required autoComplete="organization" {...form.field('company')} />
              <TextField label={labels.name} required autoComplete="name" {...form.field('name')} />
              <TextField label={labels.email} required type="email" autoComplete="email" {...form.field('email')} />
              <TextField label={labels.phone} type="tel" autoComplete="tel" hint="Format : 06 12 34 56 78" {...form.field('phone')} />
              <SelectField label={labels.type} required className="sm:col-span-2" {...form.field('type')}>
                <option value="">Choisir…</option>
                <option>Épicerie fine / concept store</option>
                <option>Salle de sport</option>
                <option>Hôtel / spa</option>
                <option>Café / restaurant</option>
                <option>Autre</option>
              </SelectField>
              <TextareaField label={labels.message} required className="sm:col-span-2" hint="20 caractères minimum." {...form.field('message')} />
              <div className="sm:col-span-2">
                <Button type="submit" size="lg">
                  Envoyer ma demande
                </Button>
              </div>
            </form>
          )}
        </Container>
      </section>
    </>
  )
}
