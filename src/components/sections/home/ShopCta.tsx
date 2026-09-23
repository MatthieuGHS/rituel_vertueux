import { productList } from '../../../data/products'
import { Container } from '../../ui/Container'
import { ProductCard } from '../ProductCard'

export function ShopCta() {
  return (
    <section className="py-20 lg:py-32" aria-labelledby="shop-title">
      <Container>
        <div className="max-w-2xl">
          <h2 id="shop-title" className="display-lg">
            Choisissez votre rituel
          </h2>
          <p className="mt-4 text-lg text-ink/85">Boîtes de 10 sticks. Livraison offerte dès 30 € d’achat.</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {productList.map((product) => (
            <ProductCard key={product.id} product={product} headingLevel="h3" />
          ))}
        </div>
      </Container>
    </section>
  )
}
