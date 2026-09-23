# Design System — Rituel Vertueux (MASTER)

> Source de vérité globale. Si `design-system/rituel-vertueux/pages/<page>.md` existe, ses règles priment pour cette page.
> Généré avec ui-ux-pro-max (`--design-system --persist`) puis **réécrit** : la palette (noir + or) et les typos (Cormorant / Montserrat) proposées par le générateur sont remplacées par l'identité Rituel Vertueux. Le style « Liquid Glass » proposé est écarté (hors sujet pour une marque solaire et gourmande) ; on garde son pattern de page et ses règles UX.

**Projet :** Rituel Vertueux — boissons fonctionnelles en sticks · **Catégorie :** e-commerce bien-être / food
**Ton :** premium mais accessible, solaire, méditerranéen, lifestyle. Vouvoiement. Jamais « pharma ».

---

## Couleurs

Définies dans `src/styles/index.css` (`@theme`). Utiliser les classes Tailwind (`bg-cream`, `text-forest`…), jamais d'hexadécimal en dur dans les composants (sauf couleurs officielles Nutri-Score).

| Token | Valeur | Usage |
|---|---|---|
| `--color-cream` | `#FBF4EC` | fond principal |
| `--color-cream-deep` | `#F4E9DC` | sections alternées, cartes |
| `--color-terracotta` | `#E05A3A` | marque, CTA, éléments graphiques |
| `--color-terracotta-dark` | `#C2462A` | hover CTA, **liens texte**, focus ring |
| `--color-forest` | `#1E4636` | titres, texte fort, texte sur jaune |
| `--color-ink` | `#2B2622` | texte courant |
| `--color-rebelle` | `#F6B6C0` | fond univers [RE]BELLE |
| `--color-rebelle-deep` | `#D6336C` | accents [RE]BELLE (grands textes / graphismes) |
| `--color-reconfort` | `#F7D774` | fond univers [RE]CONFORT |
| `--color-reconfort-deep` | `#E8B92E` | accents [RE]CONFORT (graphismes) |
| `--color-rebelle-ink` *(ajout)* | `#9E2A55` | petit texte d'accent sur rose ou crème |
| `--color-petal-coral` / `--color-petal-orange` *(ajout)* | `#EC7061` / `#EB7A25` | pétales officiels du logo |

### Contrastes vérifiés (WCAG 2.2)

| Paire | Ratio | Verdict |
|---|---|---|
| ink / cream | 13,7:1 | ✅ texte courant |
| forest / cream | 9,7:1 | ✅ |
| forest / rebelle | 6,2:1 | ✅ |
| forest / reconfort | 7,5:1 | ✅ texte sur jaune = **forest** |
| blanc / reconfort | 1,4:1 | ❌ **interdit** |
| blanc / terracotta | 3,7:1 | ⚠️ texte large uniquement → libellés de boutons en Barlow Condensed 700 ≥ 19 px |
| blanc / terracotta-dark | 5,0:1 | ✅ |
| terracotta / cream | 3,4:1 | ⚠️ graphismes et grands titres seulement |
| terracotta-dark / cream | 4,6:1 | ✅ liens texte |
| rebelle-deep / cream | 4,2:1 | ⚠️ grands textes seulement |
| rebelle-ink / rebelle | 4,2:1 | ⚠️ ≥ 18,66 px gras ; petit texte sur rose → forest |
| cream / forest | 9,7:1 | ✅ footer, menu mobile |
| reconfort / forest | 7,5:1 | ✅ intertitres du footer |

## Typographie

| Rôle | Police | Réglages |
|---|---|---|
| Titres, grandes tailles | **Fraunces** variable (`@fontsource-variable/fraunces/soft.css`) | `font-variation-settings: 'SOFT' 100` (rendu gourmand), graisses 600–650, interlignage 0,95–1,05 |
| Labels, noms produits, prix, chiffres, badges, boutons | **Barlow Condensed** 500/600/700, capitales | classe `.label` ; tracking 0,06 em ; chiffres `tabular-nums` |
| Texte courant | **DM Sans** variable | 16 px min, interlignage 1,6, 65 caractères max |

Échelle : `.display-xl` (hero, clamp 48→120 px) · `.display-lg` (titres de section, 38→76 px) · `.display-md` (32→48 px) · h3 24–28 px · corps 16–18 px · note Nutri-Score 10 px.
Préchargement : seul le fichier Fraunces latin (axe SOFT) est préchargé (police du hero). Tout est en `font-display: swap`.

## Formes, espaces, profondeur

- Espacement : échelle Tailwind (multiples de 4 px). Sections : `py-20` mobile → `py-32` desktop.
- Conteneur : `max-w-6xl` (contenu), `max-w-7xl` (header/footer), gouttière 16 px mobile.
- Rayons : boutons **pilule** (`rounded-full`) comme la forme du stick ; cartes `rounded-[1.75rem]` ; formes organiques (`--radius-blob`) pour les fonds d'univers, rappel des aplats ondulés du packaging.
- Ombres : quasi absentes. `--shadow-soft` pour les détourés posés, `--shadow-drawer` pour le tiroir.
- z-index : header 40 · menu 50 · tiroir 60 · vol panier 80 · skip link 100.

## Composants

- **Button** : `primary` (terracotta → terracotta-dark), `secondary` (contour forest), `ghost`, `light`. Hauteur ≥ 48 px. Retour tactile `active:scale-[0.97]`.
- **ProductName** : toujours « [RE]BELLE » / « [RE]CONFORT », jamais suivi d'un sous-titre.
- **ResponsiveImage** : `<picture>` AVIF + WebP, `srcset`/`sizes`, `width`/`height`, LQIP flou, lazy sauf LCP.
- **NutriScore** : SVG couleurs officielles, A mis en avant, note « *Calculé à partir de la boisson reconstituée. » en très petit dessous.
- **Logo** : SVG, pétales officiels + texte circulaire. Variante `mark` (fleur seule) pour header mobile et favicon.
- **Formulaires** : label visible, erreur sous le champ reliée par `aria-describedby`, résumé d'erreurs focalisé à la soumission, `autocomplete`, champs ≥ 48 px.
- **Icônes** : Lucide (trait 1,8), jamais d'emoji. Instagram : icône SVG maison (Lucide n'a plus les logos de marque).

## Mouvement

- GSAP + ScrollTrigger via `useGSAP` (scope + nettoyage auto), importés **uniquement** dans `src/components/anim/` et les sections animées.
- `gsap.matchMedia()` : `desktop` (≥ 1024 px, mouvement autorisé) = pin + scrub ; `mobile` = versions simplifiées, pas de pin long ; `prefers-reduced-motion: reduce` = rien, contenu statique et lisible.
- Uniquement `transform` et `opacity`. Durées 0,2–0,8 s, `power2.out` à l'entrée, sorties plus courtes.
- Un seul moment fort par écran. Lenis (smooth scroll) désactivé en reduced-motion.

## Pattern de page (conservé du générateur)

**Scroll-Triggered Storytelling** — le récit doit rester compréhensible sans effets de scroll ; ordre DOM complet ; simplifier sur mobile ; parallax et scrub coupés en reduced-motion ; mini-CTA en fin de chapitre + CTA final.

## Anti-patterns (à ne pas faire)

- ❌ Visuels bon marché, animations rapides/nerveuses
- ❌ Emojis comme icônes → SVG (Lucide)
- ❌ `cursor: pointer` manquant sur les éléments cliquables
- ❌ Hover qui décale la mise en page (préférer couleur/opacité)
- ❌ Contraste < 4,5:1 pour le texte courant ; **texte blanc sur jaune**
- ❌ Changements d'état instantanés → transitions 150–300 ms
- ❌ Focus invisible
- ❌ Sous-titres sous les noms produits (« Beauté & Éclat », « Gourmand & Équilibre »…)
- ❌ Allégations santé/beauté autres que « Riche en vitamine C » / « Riche en fibres »
- ❌ Eyebrows en capitales au-dessus de chaque titre, marqueurs 01/02/03 hors séquence réelle

## Checklist pré-livraison

- [ ] Aucun emoji utilisé comme icône (SVG uniquement)
- [ ] Icônes d'un même jeu (Lucide)
- [ ] `cursor-pointer` sur tous les éléments cliquables
- [ ] États hover avec transitions douces (150–300 ms)
- [ ] Contraste texte ≥ 4,5:1 (≥ 3:1 texte large)
- [ ] Focus visible au clavier (anneau terracotta-dark 3 px)
- [ ] `prefers-reduced-motion` respecté (GSAP + Lenis + CSS)
- [ ] Responsive : 375, 768, 1024, 1440 px
- [ ] Aucun contenu masqué par le header sticky
- [ ] Aucun scroll horizontal sur mobile
- [ ] Cibles tactiles ≥ 44 px
- [ ] Labels de formulaires visibles, erreurs reliées aux champs
- [ ] Textes alternatifs pertinents, en français
