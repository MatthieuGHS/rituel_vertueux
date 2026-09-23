# Rituel Vertueux — site vitrine + boutique fictive (v0)

Projet d'études : aucune transaction réelle, aucun backend, aucune base de données. Tout l'état (panier, session, commandes) vit dans le `localStorage` via Zustand.

## Commandes

```bash
npm run dev            # serveur de dev Vite
npm run build          # tsc -b + vite build → dist/
npm run preview        # sert dist/
npm run typecheck      # tsc -b (strict)
npm run lint           # oxlint (plugins react + jsx-a11y)
npm run images:check   # échoue si une image de dist/ dépasse 250 Ko (lancer après build)
npm run images:prepare # régénère src/assets/images/ depuis docs/photos/ (Python + Pillow)
```

## Stack

Vite 8 · React 19 · TypeScript strict · React Router 8 (`createBrowserRouter`, chaque page en `lazy`) · Tailwind CSS v4 (`@tailwindcss/vite`, tokens dans `@theme`) · GSAP + ScrollTrigger via `@gsap/react` · Lenis · Zustand + `persist` · vite-imagetools · Fontsource (Fraunces, Barlow Condensed, DM Sans) · Lucide. Déploiement Vercel (`vercel.json` : rewrite SPA vers `/index.html`).

## Structure

```
src/
  assets/images/      photos/ (JPEG sources) + cutouts/ (PNG alpha) + index.ts (registre typé imagetools)
  components/ui/      Button, Badge, Container, ResponsiveImage, NutriScore, Logo, ProductName, IngredientIllustration…
  components/layout/  RootLayout, Header, MobileMenu, Footer, DemoBanner, CartDrawer, RequireAuth
  components/sections/ sections réutilisables (ProductCard, CartLines, PageHero…)
  components/anim/    GSAP : gsap.ts (registre + matchMedia), Reveal, flyToCart, sections animées de l'accueil
  pages/              une page par route (export default)
  data/               products.ts (source unique produits), ingredients, recipes, faq, demo-account
  store/              cart.ts, auth.ts, orders.ts
  lib/                loyalty.ts (règles fidélité + totaux), format.ts (fr-FR), seo.ts (useSeo), smooth-scroll.ts
  styles/index.css    @theme + base
docs/                 INVENTAIRE photos, DECISIONS, RAPPORT_V0
design-system/rituel-vertueux/MASTER.md  tokens, contrastes, règles UX, checklist
```

## Règles de contenu — NON NÉGOCIABLES

- Écrire **[RE]BELLE** et **[RE]CONFORT** avec crochets. Jamais « Rebelle », « Recharge », « Réconfort » seul comme nom de produit.
- **Aucun sous-titre sous les noms produits** (interdit : « Beauté & Énergie », « Beauté & Éclat », « Digestif & gourmand », « Gourmand & Équilibre »…). Le nom est suivi du slogan produit ou d'un paragraphe.
- Allégations autorisées : uniquement « Riche en vitamine C » ([RE]BELLE) et « Riche en fibres » ([RE]CONFORT). Aucune promesse santé/beauté.
- [RE]BELLE est à la **framboise** (jamais « fruits des bois », « fraise »).
- Slogan : « **Votre** bien-être devient un rituel » (jamais « Le bien-être… »).
- Slogans produits : [RE]BELLE « Le rituel beauté alliant gourmandise et praticité » · [RE]CONFORT « Le rituel doux pour se sentir bien au quotidien ».
- Vouvoiement. Ton premium accessible, solaire, méditerranéen. Jamais « complément alimentaire pharma ».
- Pas d'infos d'entreprise réelles (SIRET, adresse) : valeurs génériques fictives.
- Bandeau « Site de démonstration — aucune commande réelle » en haut et dans le footer.
- Nutri-Score A avec « *Calculé à partir de la boisson reconstituée. » en très petit dessous.
- Données produit (prix 10,29 € / 10,06 €, DDM 16 / 24 mois, 10 sticks de 18 g, 210 g, 24 boîtes/carton, ingrédients exacts) : **uniquement** dans `src/data/products.ts`.

Vérification rapide avant livraison :
```bash
grep -rniE "Beauté &|Recharge|Le bien-être devient|fruits des bois|fraise" src/
```

## Tokens (voir `src/styles/index.css`)

cream `#FBF4EC` · cream-deep `#F4E9DC` · terracotta `#E05A3A` · terracotta-dark `#C2462A` · forest `#1E4636` · ink `#2B2622` · rebelle `#F6B6C0` · rebelle-deep `#D6336C` · reconfort `#F7D774` · reconfort-deep `#E8B92E` · (+ rebelle-ink `#9E2A55`, pétales `#EC7061` / `#EB7A25`).
Polices : `font-display` Fraunces (SOFT 100) · `.label` / `font-label` Barlow Condensed capitales · `font-sans` DM Sans.
Texte sur jaune : **forest**, jamais blanc. Liens texte : `terracotta-dark`. Boutons : libellé Barlow 700 ≥ 19 px.

## Conventions

- Montants en **centimes** partout ; affichage via `formatPrice()` (fr-FR : `10,29 €`).
- Règles fidélité et livraison centralisées dans `src/lib/loyalty.ts` (`LOYALTY`, `SHIPPING`) : 10 pts/€ sur produits après remise (arrondi inférieur), récompenses 250/500/1000 pts, niveaux Découverte/Initié/Vertueux sur le cumul gagné, livraison 4,90 € offerte dès 30 €.
- Compte démo : `demo@rituelvertueux.fr` / `motdepasse` (`src/data/demo-account.ts`). Historique de 3 commandes, points **calculés** (`ledgerFrom`).
- Images : jamais de `<img>` direct pour les photos → `ResponsiveImage` + `photo('clé')` / `cutout('clé')`. Nouvelle image : ajouter la source dans `scripts/prepare-images.py`, lancer `npm run images:prepare`, compléter `PhotoKey`.
- GSAP importé seulement dans `components/anim/*` (et chargé dynamiquement pour l'animation panier). Toujours `useGSAP({ scope })` + `gsap.matchMedia()` avec `MEDIA.desktop / mobile / motion`. Animer uniquement `transform` / `opacity`. Le contenu doit rester lisible sans animation.
- Chaque page appelle `useSeo(titre, description)` (titre et description uniques).
- Accessibilité : focus visible, cibles ≥ 44 px, labels visibles, alt en français, `aria-label` sur boutons icônes.
- Commits : un commit par lot cohérent, messages `feat:` / `fix:` / `docs:` en français.
