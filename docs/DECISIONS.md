# Décisions prises sans validation

Décisions prises en autonomie pendant la construction de la v0. Celles marquées **À valider** demandent un arbitrage de la cliente.

## Sources et visuels

| # | Sujet | Décision | Pourquoi |
|---|---|---|---|
| 1 | Sources photos | Les images brutes de `docs/photos/` (~90 Mo) et le brief `.odt` restent hors de git (`.gitignore`). Seuls `INVENTAIRE.md`, les SVG et les images préparées de `src/assets/images/` sont versionnés. | Poids du dépôt, déploiement Vercel plus rapide. `npm run images:prepare` régénère tout depuis les sources locales. |
| 2 | Détourés | Sticks détourés depuis les visuels studio HD (#00, #01). Boîtes (v0.2) : PNG détourés fournis par la cliente (`docs/photos/pnged/`), seulement normalisés (intérieur exporté à ~99 % d’opacité remis à 100 %, recadrage). | Versions précédentes (détourages automatiques, `pngcorrect*`) imparfaites ; la cliente a fourni des détourés propres et en bonne définition. |
| 2b | Ombre portée des détourés | `ResponsiveImage` n’applique plus `overflow: hidden` aux détourés (seulement aux photos, pour le placeholder flou). | Le `drop-shadow` CSS des boîtes était coupé net aux bords de l’image et dessinait un rectangle sombre autour de la boîte. |
| 2c | Nettoyage des sources (v0.2) | Photos jamais affichées retirées du site (`rebelle-box-stick`, `reconfort-box-studio`, `reconfort-ingredients`) ; 26 sources non utilisées envoyées à la corbeille du poste (récupérables), pas supprimées définitivement. | Demande de la cliente ; les sources n’étant pas versionnées, la corbeille évite une perte irréversible. |
| 3 | Mention « Le bien-être devient un rituel. » sur la tranche des boîtes | Visuels de boîtes conservés malgré cette mention (petite, secondaire). Visuels où elle est l'accroche principale écartés (#33, #42, #43…). | Les boîtes sont indispensables aux fiches produits ; aucun visuel de boîte sans cette mention n'existe. **À valider** : packaging à mettre à jour ? |
| 4 | Logo | Le SVG fourni affiche « LE RITUEL VERTUEUX » (le brief demande d'enlever « LE »). Composant `Logo` recréé : pétales vectoriels **officiels** (repris du SVG) + texte circulaire « RITUEL » / « VERTUEUX » en Fraunces, deux points orange. Variante `mark` (fleur seule) pour le header mobile et le favicon. | Fidélité au packaging actuel. **À valider** : police du texte circulaire (la typo exacte du logo n'a pas été fournie). |
| 5 | Couleurs du logo | Pétales en corail `#EC7061` et orange `#EB7A25` (couleurs du SVG officiel) plutôt qu'en terracotta unique. | Fidélité à la charte existante. |
| 6 | Illustrations d'ingrédients | 10 illustrations SVG au trait dessinées pour le site (framboise, hibiscus, acérola, collagène, banane, cacao, datte, caroube, reishi, avoine). | Aucun visuel dédié fourni. **À valider** : style et lisibilité. |
| 7 | Formats d'image | Photos en 480 / 960 / 1280 px (les sources font ≤ 1 312 px, 1 600 px aurait été un agrandissement). Sticks en 160 / 320 / 540 px, boîtes en 360 / 720 / 960 px. AVIF + WebP, fallback `<img>` en WebP. | Tailles réelles d'affichage, budget de 250 Ko par image. |
| 8 | Recadrage | #40 (latte glacé face à la mer) recadré pour retirer l'encart texte « Ingrédients » incrusté. | Texte incrusté non maîtrisé. |

## Design

| # | Sujet | Décision | Pourquoi |
|---|---|---|---|
| 9 | Tokens ajoutés | `rebelle-ink` (#9E2A55, petit texte sur rose), `petal-coral`/`petal-orange`, `success`/`danger`. | Contrastes et états fonctionnels ; la palette imposée n'avait pas de rose assez foncé pour du petit texte. |
| 10 | Blanc sur terracotta (3,7:1) | Conservé pour les boutons, avec libellés en Barlow Condensed 700 ≥ 19 px (texte « large » WCAG, seuil 3:1). Liens texte en `terracotta-dark`. | Respect des couleurs CTA imposées sans échouer au contraste. |
| 11 | Bandeau « Plaisir & gourmandise » | Crème sur jaune comme demandé, mais purement décoratif (`aria-hidden`, phrase lue une fois par les lecteurs d'écran) avec un léger liseré `reconfort-deep`. | Contraste 1,3:1 : acceptable seulement pour un élément décoratif. |
| 12 | Icône Instagram | SVG maison au trait (style Lucide). | Lucide ne fournit plus les logos de marque. |
| 13 | Navigation | Header strictement conforme à la liste demandée (Rituels, Ingrédients, Recettes, Notre histoire, Pro + compte + panier). « Boutique » est accessible par les CTA, le menu mobile et le footer. | Respect du brief. **À valider** : ajouter « Boutique » au header desktop ? |
| 14 | Ton des verbes « [RE] » | Page Notre histoire : « [RE]prendre », « Se [RE]centrer », « [RE]nouer avec soi ». | Mise en scène du préfixe demandée. |

## Contenu (textes inventés, **à valider**)

| # | Sujet | Décision |
|---|---|---|
| 15a | Allégation sucre (v0.1) | Texte de la cliente repris tel quel sur l’accueil (« uniquement le sucre naturellement présent dans les fruits »), coquille « fonctionels » corrigée. **À valider** : allégation encadrée (règlement CE 1924/2006), à confirmer au regard de la recette. |
| 15 | Descriptions produits, textes des ingrédients, mission, valeurs, moments de consommation | Rédigés pour la v0, sans allégation autre que « Riche en vitamine C » / « Riche en fibres ». |
| 16 | Recettes | 6 suggestions inventées (latte glacé, infusion rosée, 2 smoothies, chocolat chaud, pétillant). Temps et quantités indicatifs. |
| 17 | FAQ | Réponse « un stick par jour » inventée (aucune recommandation fournie). |
| 18 | Page Pro | Types d'établissements (épiceries fines, concept stores, salles de sport, cafés, hôtels et spas) et délai de réponse « 48 h » inventés. Prix de vente conseillé = prix boutique TTC. |
| 19 | Mentions légales | Éditeur, adresse et SIRET fictifs ; hébergeur mentionné sans coordonnées. |

## Boutique et fidélité

| # | Sujet | Décision | Pourquoi |
|---|---|---|---|
| 20 | Modes de livraison | Domicile et point relais au même tarif (4,90 €, offerte dès 30 €). | Un seul tarif fourni. |
| 21 | Arrondis | Remise −5 % arrondie au centime ; points arrondis à l'inférieur (10 pts/€). | Règle demandée pour les points, convention usuelle pour la remise. |
| 22 | Boîte offerte (1 000 pts) | Ajoutée en ligne gratuite, ne compte ni dans le seuil de livraison ni dans les points. | Cohérence : points calculés sur le montant payé. |
| 23 | Commande invité | Aucun point crédité ; encart invitant à se connecter (avec le nombre de points qui auraient été gagnés). | Brief. |
| 24 | Historique démo | 3 commandes (mai, juillet, août 2026) dont une avec la récompense −5 %. Solde **calculé** : 795 pts cumulés − 250 utilisés = **545 pts**, niveau **Initié**, récompenses 250 et 500 débloquées d'emblée. | « Au moins une récompense débloquée ». |
| 25 | Données de démo | Commandes passées pendant la démo stockées dans le `localStorage` (clé `rv-orders`), effaçables depuis la page Confidentialité. | Pas de backend. |

## Technique

| # | Sujet | Décision | Pourquoi |
|---|---|---|---|
| 26 | Routes lazy | API `lazy` des routes de React Router (équivalent à `React.lazy`, mais la navigation attend le chunk au lieu d'afficher un fallback). | Pas de flash de chargement entre pages. |
| 27 | GSAP hors chemin critique | `Reveal` et le parallax du hero importent GSAP à la demande (`import()` dans `useEffect`) au lieu de `useGSAP` ; l'intro du titre du hero est en CSS. Les sections pinnées/scrubées gardent `useGSAP` + `gsap.matchMedia()`. Les sections basses de l'accueil sont dans un chunk lazy. | Le LCP attendait le chargement de GSAP (45 Ko gzip). |
| 28 | Préchargement LCP | Script inline généré au build : précharge le chunk de la page et son image LCP (accueil, fiches produit) avec le même `srcset`/`sizes`. Fraunces (police du hero) préchargée. | SPA sans SSR : l'image LCP n'est sinon découverte qu'après le JS. |
| 29 | Section pinnée des rituels | Desktop uniquement ; mobile et reduced-motion affichent deux chapitres empilés. Entrée (avant le pin) et sortie (pendant le pin) ciblent des éléments distincts pour éviter tout conflit de scrub. | Pas de pin long sur mobile (brief). |
| 30 | Indexation | `noindex` + `robots.txt` `Disallow: /`. | Site de démonstration d'une marque fictive : ne pas l'indexer. Le score SEO Lighthouse (66) en découle. |
| 31 | Lint | oxlint (template Vite) ; `prefer-tag-over-role` désactivée (faux positifs sur `role="img"` des SVG), `tabIndex` autorisé sur les régions défilantes (`role="region"`, exigence WCAG), profondeur de recherche du texte des labels portée à 4. | Règles contradictoires avec les bonnes pratiques d'accessibilité appliquées. |
