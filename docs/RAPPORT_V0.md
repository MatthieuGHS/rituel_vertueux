# Rapport v0 — Rituel Vertueux

Site vitrine + boutique fictive (projet d'études). Aucune transaction réelle, aucun backend, aucune base de données.

## 1. Ce qui a été construit

**Stack** : Vite 8, React 19, TypeScript strict, React Router 8 (routes lazy), Tailwind CSS v4, GSAP + ScrollTrigger, Lenis, Zustand persisté, vite-imagetools, Fontsource, Lucide. Déploiement Vercel prêt (`vercel.json`).

### Pages (22 routes)

| Route | Contenu |
|---|---|
| `/` | Hero (slogan révélé ligne par ligne, sticks et ingrédients en parallax), concept + 3 piliers, **deux rituels** (section pinnée crème → rose → jaune), **assemblage des ingrédients** (convergence au scroll), bandeau cinétique « Plaisir & gourmandise », rituel en 3 gestes, **galerie horizontale** « moments de vie », extrait recettes, grille Instagram statique, CTA boutique |
| `/rituels` | Gamme : cartes comparatives + tableau « en un coup d'œil » |
| `/rituels/rebelle`, `/rituels/reconfort` | Fiche complète aux couleurs de l'univers : boîte détourée, slogan, prix, quantité, ajout au panier, allégation, ingrédients vedettes illustrés, liste exacte, allergènes, Nutri-Score A*, préparation, DDM, conservation, « Découvrir l'autre rituel » |
| `/ingredients` | 10 ingrédients vedettes illustrés au trait, groupés par rituel (ancres `#framboise`…) |
| `/le-rituel` | Chaud / froid / glacé, 5 moments de consommation |
| `/recettes` | 6 recettes filtrables, détail dépliable |
| `/notre-histoire` | Mission, sens du « [RE] », valeurs, engagement ingrédients |
| `/pro` | Fiche technique (UVC, poids, colisage, DDM, PVC, allergènes, ingrédients), bouton de téléchargement démo, formulaire distributeur |
| `/faq` | Accordéon accessible, 6 thèmes |
| `/contact` | Formulaire validé côté client, envoi simulé, Instagram |
| `/boutique` | 2 produits, filtre par rituel (paramètre d'URL `?rituel=`) |
| `/panier` | Panier pleine page + récapitulatif |
| `/commande`, `/commande/confirmation` | Commande invité ou connectée, récompense fidélité, paiement désactivé, confirmation avec points |
| `/compte/connexion`, `/compte`, `/compte/commandes`, `/compte/fidelite` | Compte démo protégé : tableau de bord, historique détaillé, programme de fidélité |
| `/mentions-legales`, `/confidentialite` | Textes génériques ; bouton « Effacer les données de démo » |
| `*` | 404 : stick renversé, retour accueil |

### Fonctionnalités

- **Panier** Zustand persisté : tiroir latéral (quantités, suppression, sous-total, jauge « Plus que X € pour la livraison offerte »), page panier, compteur dans le header. Livraison 4,90 €, offerte dès 30 € après remise.
- **Micro-animation d'ajout** : le stick détouré vole jusqu'à l'icône panier (GSAP chargé à la demande), puis le tiroir s'ouvre. Désactivée en reduced-motion.
- **Compte démo** `demo@rituelvertueux.fr` / `motdepasse` (identifiants affichés sur la page de connexion, bouton « Remplir le formulaire »). Session persistée, déconnexion, routes `/compte/*` protégées avec retour à la page demandée.
- **Fidélité** (`src/lib/loyalty.ts`) : 10 pts/€ sur les produits après remise ; récompenses 250 (−5 %), 500 (livraison offerte), 1 000 (boîte offerte) ; niveaux Découverte / Initié / Vertueux sur le cumul. Profil Camille Martin : 3 commandes, **551 pts** calculés, niveau Initié, 2 récompenses débloquées.
- **Commande** : coordonnées pré-remplies si connecté, sélecteur de récompense (verrouillées si solde insuffisant), résumé d'erreurs focalisé, numéro `RV-XXXXXX`, points crédités/déduits, panier vidé.
- **Accessibilité** : lien d'évitement, focus visible, focus déplacé sur le contenu à chaque navigation, dialogues avec piège de focus et Échap, labels visibles, erreurs reliées aux champs, cibles ≥ 44 px, alt en français, reduced-motion respecté (GSAP, Lenis, CSS).
- **SEO de page** : `<title>` et meta description uniques par page (`useSeo`).

## 2. Images

37 visuels retenus sur 56 (voir **`docs/photos/INVENTAIRE.md`** : statut, raison d'exclusion et emplacement de chaque fichier). Les 4 détourés (2 sticks, 2 boîtes) ont été produits en HD à partir des visuels studio ; les boîtes proviennent des PNG fournis par la cliente, finalisés (voir DECISIONS n° 2). 223 fichiers livrés (AVIF + WebP, 3 largeurs), **tous < 250 Ko** (`npm run images:check`).

Écartés notamment : roll-up et e-mailing avec sous-titres interdits, visuels « Le bien-être devient un rituel » en accroche, visuel « fruits des bois », flat-lay avec fraises, infographie au packaging non conforme, doublons et documents de travail.

## 3. Vérifications

| Contrôle | Résultat |
|---|---|
| `npm run typecheck` / `lint` / `build` / `images:check` | ✅ zéro erreur |
| Captures Playwright 375 / 768 / 1440 px, 22 routes | ✅ 0 débordement horizontal, 0 erreur console, 0 image cassée |
| Parcours : panier → commande invité | ✅ |
| Parcours : connexion démo → récompense « livraison offerte » → commande → solde recalculé (−500 pts + points gagnés) | ✅ |
| Déconnexion, route protégée | ✅ redirection vers `/compte/connexion` |
| Reduced-motion | ✅ pas de pin, pas de Lenis, aucun contenu masqué |
| Règles de contenu (grep « Beauté & », « Recharge », « Le bien-être devient », « fruits des bois », « fraise ») | ✅ aucune occurrence |
| JS initial | ✅ 113 Ko gzip (budget 200 Ko) ; GSAP (45 Ko) chargé seulement par les pages animées |
| Lighthouse mobile — accueil | Perf **85**, Accessibilité **100**, Bonnes pratiques **100**, SEO 66* |
| Lighthouse mobile — fiche [RE]BELLE | Perf **82**, Accessibilité **100**, Bonnes pratiques **100**, SEO 66* |
| CLS | ✅ 0 à 0,004 |
| LCP (simulation Lighthouse mobile, serveur local) | ⚠️ 4,1 à 4,6 s (objectif 2,5 s) |

\* SEO 66 : volontaire, le site est en `noindex` + `robots.txt Disallow` (démo d'une marque fictive).

## 4. Limites connues

- **Performance mobile < 90 / LCP > 2,5 s en simulation.** Le socle imposé (SPA React 19 + React Router, sans SSR/SSG) représente ~110 Ko gzip à télécharger et exécuter avant le premier rendu. Les optimisations possibles dans ce cadre sont faites (chunks par route, GSAP hors chemin critique, préchargement du chunk et de l'image LCP, police du hero préchargée, CLS nul). Pour atteindre ≥ 90, il faudrait un pré-rendu statique (SSG) des pages, exclu par le brief. À re-mesurer en conditions réelles sur Vercel (CDN, TTFB plus faible).
- Textes rédigés pour la v0 (descriptions, ingrédients, recettes, FAQ, mission) : **à relire par la cliente**.
- Illustrations d'ingrédients et logo **recréés** : à valider visuellement.
- La mention « Le bien-être devient un rituel. » est imprimée sur la tranche des boîtes (visuels fournis) alors que le slogan officiel est « Votre bien-être… ».
- Grille Instagram statique (aucune connexion à l'API).
- Aucune donnée réelle : paiement désactivé, formulaires simulés, données en `localStorage` du navigateur.

## 5. Points à valider avec la cliente

1. Packaging : mettre à jour la tranche des boîtes (« Votre bien-être devient un rituel ») ?
2. Logo recréé (typo du texte circulaire) et illustrations d'ingrédients.
3. Tous les textes inventés (voir `docs/DECISIONS.md`, section Contenu).
4. Recettes proposées (faisabilité, goût).
5. Ajout de « Boutique » dans le header desktop.
6. Conseil « un stick par jour » dans la FAQ.

Toutes les décisions prises sans validation : **`docs/DECISIONS.md`**.

## 6. Lancer et déployer

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # dist/
npm run preview      # http://localhost:4173 (build de production)
npm run typecheck && npm run lint && npm run images:check
```

**Vercel** : importer le dépôt (framework « Vite » détecté, `vercel.json` fourni : build `npm run build`, sortie `dist`, rewrite de toutes les routes vers `/index.html`, cache long sur `/assets/*`). En CLI :

```bash
npx vercel          # prévisualisation
npx vercel --prod   # production
```

Les images sources brutes (`docs/photos/*.png`) ne sont pas versionnées ; les images optimisées nécessaires au build le sont (`src/assets/images/`).

## 7. Retours cliente intégrés (v0.1)

- Prix corrigés : [RE]BELLE **10,28 €**, [RE]CONFORT **10,18 €** (source unique `src/data/products.ts`) ; solde du compte démo recalculé : **551 pts** (niveau Initié inchangé).
- Accueil, « Ce qu’il y a dans un stick » : texte remplacé par « Liste d’ingrédients courte, uniquement le sucre naturellement présent dans les fruits et des bénéfices fonctionnels. »
- Préparation : « 250 ml d’eau froide ou chaude, **ou de lait de votre choix** » partout (fiches, Pro, accueil, 3 gestes, gamme, FAQ, recettes, le rituel, notre histoire).
- Boîtes détourées : PNG fournis par la cliente (`pngcorrectR/J.png`, HD) finalisés (ombre au sol restée opaque retirée, liseré blanc supprimé, arêtes redressées). Cause du « rectangle » visible autour des boîtes corrigée : l’ombre CSS (`drop-shadow`) était coupée par le conteneur de l’image.
