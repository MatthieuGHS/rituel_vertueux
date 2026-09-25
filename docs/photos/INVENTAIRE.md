# Inventaire des visuels — Rituel Vertueux

Examen visuel un par un des 58 fichiers de `docs/photos/` (56 images matricielles + 2 SVG).
Les images retenues sont copiées (et recadrées/détourées si besoin) dans `src/assets/images/` sous le nom indiqué.

**Légende qualité** : ★★★ excellente (net, bien éclairé, packaging lisible) · ★★ bonne · ★ faible.
**Constat global** : toutes les boîtes (quel que soit le visuel) portent sur leur tranche la mention « Le bien-être devient un rituel. » (ancienne formulation). Elle est petite et secondaire : les visuels de boîtes sont conservés (indispensables pour les fiches produits), mais le point est remonté dans `docs/DECISIONS.md` et dans le rapport. Les visuels où cette formulation est **l'accroche principale** sont écartés.

## Éléments clés identifiés

| Rôle | Source | Fichier livré |
|---|---|---|
| Logo | `RV__Logo_CouleursAplats.svg` (ancienne version « LE RITUEL », texte noir) + logo imprimé sur le packaging (#02) | Composant SVG `Logo` recréé : pétales officiels repris du SVG + texte circulaire « RITUEL / VERTUEUX » comme sur le packaging |
| Stick [RE]BELLE détouré | #00 (studio fond blanc, 724×2172) détouré par flood-fill | `rebelle-stick.png` (547×2131, alpha) |
| Stick [RE]CONFORT détouré | #01 (studio fond blanc, 725×2170) détouré | `reconfort-stick.png` (535×2134, alpha) |
| Boîte [RE]BELLE détourée | #02 (studio fond blanc, 975×1613) détouré | `rebelle-box.png` (alpha) |
| Boîte [RE]CONFORT détourée | #03 (studio fond blanc, 975×1613) détouré | `reconfort-box.png` (alpha) |

Les détourés fournis (`IMG_3426*.png`) sont conformes mais en basse définition (sujet ≈ 340–680 px de large, texte flou) : remplacés par les versions HD détourées depuis #00–#03. Boîtes : détourage par enveloppe convexe (ombre portée exclue), refait en v0.1 après retour cliente.

## Tableau détaillé

| # | Fichier | Description | Produit | Orientation · dimensions | Qualité | Statut | Emplacement(s) prévu(s) → nom livré |
|---|---|---|---|---|---|---|---|
| 00 | ChatGPT Image 16 sept. 2026 à 12_51_54.png | Stick seul, face, fond blanc studio | [RE]BELLE | Portrait 724×2172 | ★★★ | OK | Détouré → `rebelle-stick.png` : hero, section « deux rituels », assemblage ingrédients, animation panier, boutique, 404 |
| 01 | ChatGPT Image 16 sept. 2026 à 12_53_14.png | Stick seul, face, fond blanc studio | [RE]CONFORT | Portrait 725×2170 | ★★★ | OK | Détouré → `reconfort-stick.png` : hero, deux rituels, boutique, animation panier |
| 02 | ChatGPT Image 16 sept. 2026 à 12_57_44.png | Boîte 3/4, fond blanc, Nutri-Score A lisible | [RE]BELLE | Portrait 975×1613 | ★★★ | OK | Détouré → `rebelle-box.png` : fiche produit, boutique, page Pro, panier |
| 03 | ChatGPT Image 16 sept. 2026 à 12_58_42.png | Boîte 3/4, fond blanc | [RE]CONFORT | Portrait 975×1613 | ★★★ | OK | Détouré → `reconfort-box.png` : fiche produit, boutique, page Pro, panier |
| 04 | ChatGPT Image 16 sept. 2026 à 13_01_15.png | Stick seul, fond blanc + ombre portée | [RE]CONFORT | Portrait 1024×1536 | ★★★ | ÉCARTÉ — doublon de #01 (#01 plus facile à détourer) | — |
| 05 | ChatGPT Image 16 sept. 2026 à 13_12_40.png | Stick incliné sur fond jaune uni | [RE]CONFORT | Portrait 1145×1374 | ★★★ | OK | `reconfort-studio.jpg` : page `/rituels` (carte comparative) |
| 06 | ChatGPT Image 16 sept. 2026 à 13_12_48.png | Stick + banane, cacao, dattes, avoine, fond jaune | [RE]CONFORT | Portrait 1145×1374 | ★★★ | OK | `reconfort-ingredients-jaune.jpg` : fiche [RE]CONFORT (ambiance), page Ingrédients |
| 07 | ChatGPT Image 16 sept. 2026 à 13_12_53.png | Stick + smoothie, banane, chocolat, avoine | [RE]CONFORT | Portrait 1145×1374 | ★★★ | OK | `reconfort-smoothie.jpg` : recette smoothie |
| 08 | ChatGPT Image 16 sept. 2026 à 13_18_29.png | Boîte sur fond jaune | [RE]CONFORT | Portrait 1145×1374 | ★★★ | OK | `reconfort-box-studio.jpg` : grille Instagram |
| 09 | ChatGPT Image 16 sept. 2026 à 13_20_26.png | Boîte + stick sur socles jaunes | [RE]CONFORT | Portrait 1145×1374 | ★★★ | OK | `reconfort-box-stick.jpg` : page Pro |
| 10 | ChatGPT Image 16 sept. 2026 à 13_21_46.png | Vue plongée bureau : stick, laptop, carnet, café | [RE]CONFORT | Portrait 1024×1536 | ★★★ | OK | `reconfort-bureau.jpg` : moments de vie (bureau) |
| 11 | ChatGPT Image 16 sept. 2026 à 13_21_52.png | Main tenant le stick au bureau | [RE]CONFORT | Portrait 1024×1536 | ★★★ | OK | `reconfort-bureau-main.jpg` : page Le rituel (moment bureau) |
| 12 | ChatGPT Image 16 sept. 2026 à 13_22_54.png | Stick versé dans un verre, fond jaune | [RE]CONFORT | Portrait 1145×1374 | ★★★ | OK | `reconfort-versement.jpg` : « le rituel en 3 gestes » (geste 2) |
| 13 | ChatGPT Image 16 sept. 2026 à 13_22_57.png | Poudre qui s'écoule du stick, fond jaune | [RE]CONFORT | Portrait 1145×1374 | ★★★ | OK | `reconfort-poudre.jpg` : grille Instagram |
| 14 | ChatGPT Image 16 sept. 2026 à 13_24_55.png | Duo boîtes + sticks, cuisine lumineuse, ingrédients | Les deux | Paysage 1312×1199 | ★★★ | OK | `duo-cuisine.jpg` : concept (accueil), boutique (bandeau), CTA |
| 15 | ChatGPT Image 16 sept. 2026 à 13_25_06.png | Duo boîtes en cuisine, smoothies | Les deux | Portrait 1123×1401 | ★★★ | OK | `duo-cuisine-portrait.jpg` : Notre histoire, moments (matin) |
| 16 | ChatGPT Image 16 sept. 2026 à 13_25_09.png | Duo boîtes en cuisine, autre cadrage | Les deux | Portrait 1024×1536 | ★★★ | ÉCARTÉ — quasi-doublon de #15 | — |
| 17 | ChatGPT Image 16 sept. 2026 à 13_26_25.png | Stick glissé dans un sac à main | [RE]CONFORT | Portrait 1024×1536 | ★★★ | OK | `reconfort-sac.jpg` : moments (en déplacement) |
| 18 | ChatGPT Image 16 sept. 2026 à 13_27_07.png | Stick + banane, cacao, dattes, caroube, avoine, fond blanc | [RE]CONFORT | Portrait 1024×1536 | ★★★ | OK | `reconfort-ingredients.jpg` : fiche [RE]CONFORT, page Ingrédients |
| 19 | ChatGPT Image 16 sept. 2026 à 13_33_11.png | Stick versé dans une gourde au bureau | [RE]CONFORT | Portrait 1024×1536 | ★★★ | OK | `reconfort-gourde.jpg` : page Le rituel (préparation froide) |
| 20 | ChatGPT Image 16 sept. 2026 à 13_40_12.png | Salle de sport : shaker, serviette, haltère | [RE]CONFORT | Portrait 1024×1536 | ★★★ | OK | `reconfort-sport.jpg` : moments (sport) |
| 21 | ChatGPT Image 16 sept. 2026 à 13_40_15.png | Salle de sport : shaker rose, haltère | [RE]BELLE | Portrait 1024×1536 | ★★★ | OK | `rebelle-sport.jpg` : page Le rituel (sport), grille Instagram |
| 22 | ChatGPT Image 16 sept. 2026, 13_03_56.png | Stick + hibiscus, framboises, acérola, avoine, fond blanc | [RE]BELLE | Portrait 1024×1536 | ★★★ | OK | `rebelle-ingredients.jpg` : fiche [RE]BELLE, page Ingrédients |
| 23 | ChatGPT Image 16 sept. 2026, 13_04_05.png | Stick seul, fond blanc | [RE]BELLE | Portrait 1024×1536 | ★★★ | ÉCARTÉ — doublon de #00 | — |
| 24 | ChatGPT Image 16 sept. 2026, 13_05_59.png | Stick à plat, framboises, hibiscus, fond rose | [RE]BELLE | Portrait 1145×1374 | ★★★ | OK | `rebelle-studio.jpg` : page `/rituels` (carte comparative) |
| 25 | ChatGPT Image 16 sept. 2026, 13_07_45.png | Stick posé sur socle rond rose | [RE]BELLE | Portrait 1145×1374 | ★★★ | OK | `rebelle-podium.jpg` : grille Instagram |
| 26 | ChatGPT Image 16 sept. 2026, 13_08_38.png | Poudre qui s'écoule, fond rose | [RE]BELLE | Portrait 1024×1536 | ★★★ | OK | `rebelle-poudre.jpg` : « le rituel en 3 gestes » (geste 1) |
| 27 | ChatGPT Image 16 sept. 2026, 13_09_58.png | Boîte + stick, hibiscus, framboises, fond rose | [RE]BELLE | Portrait 1145×1374 | ★★★ | OK | `rebelle-box-stick.jpg` : page Pro |
| 28 | ChatGPT Image 16 sept. 2026, 13_11_59.png | Boîte + stick + verre rose, cuisine | [RE]BELLE | Paysage 1312×1199 | ★★★ | OK | `rebelle-cuisine.jpg` : moments (matin) |
| 29 | ChatGPT Image 16 sept. 2026, 13_21_46.png | Stick + smoothie rose, framboises, hibiscus | [RE]BELLE | Portrait 1024×1536 | ★★★ | OK | `rebelle-smoothie.jpg` : recettes (smoothie / infusion rosée) |
| 30 | ChatGPT Image 16 sept. 2026, 13_22_59.png | Même scène que #29 | [RE]BELLE | Portrait 1024×1536 | ★★★ | ÉCARTÉ — doublon quasi identique de #29 | — |
| 31 | ChatGPT Image 16 sept. 2026, 13_26_36.png | Stick sorti d'un sac, bureau | [RE]BELLE | Portrait 1024×1536 | ★★★ | OK | `rebelle-sac.jpg` : page Le rituel (en déplacement) |
| 32 | ChatGPT Image 16 sept. 2026, 13_29_29.png | Stick versé dans une gourde rose au bureau | [RE]BELLE | Portrait 1024×1536 | ★★★ | OK | `rebelle-gourde.jpg` : moments (bureau), 3 gestes (geste 3) |
| 33 | ChatGPT Image 17 sept. 2026 à 11_11_45.png | Affiche métro « Le bien-être devient un rituel. » | [RE]BELLE | Paysage 1536×1024 | ★★★ | ÉCARTÉ — accroche contradictoire (« Le » au lieu de « Votre ») | — |
| 34 | ChatGPT Image 17 sept. 2026 à 11_18_28.png | Roll-up salon | Les deux | Portrait 1024×1536 | ★★ | ÉCARTÉ — sous-titres « Beauté & Éclat », « Gourmand & Équilibre » + accroche erronée | — |
| 35 | ChatGPT Image 17 sept. 2026 à 11_25_52.png | Stick sur collage framboise / hibiscus / eau pétillante / avoine | [RE]BELLE | Portrait 1080×1457 | ★★★ | OK | `rebelle-collage.jpg` : fiche [RE]BELLE (visuel d'ambiance), accueil deux rituels (mobile) |
| 36 | ChatGPT Image 17 sept. 2026 à 11_26_26.png | Flat-lay stick horizontal : banane, cacao, datte, caroube, reishi, avoine | [RE]CONFORT | Carré 1239×1270 | ★★★ | OK | `reconfort-flatlay.jpg` : page Ingrédients (bandeau [RE]CONFORT) |
| 37 | ChatGPT Image 17 sept. 2026 à 11_28_02.png | Flat-lay stick horizontal, fond rose | [RE]BELLE | Carré 1254×1254 | ★★★ | ÉCARTÉ — fraises coupées visibles (recette = framboise) | — |
| 38 | ChatGPT Image 17 sept. 2026 à 11_28_39.png | Stick sur collage banane / cacao / reishi / avoine | [RE]CONFORT | Portrait 1080×1456 | ★★★ | OK | `reconfort-collage.jpg` : fiche [RE]CONFORT (ambiance) |
| 39 | ChatGPT Image 17 sept. 2026 à 11_34_12.png | Verre glacé en bord de mer, encart « Ingrédients » | [RE]BELLE | Portrait 1091×1441 | ★★★ | ÉCARTÉ — texte « Stick de fruits des bois » + fraises et myrtilles | — |
| 40 | ChatGPT Image 17 sept. 2026 à 11_34_15.png | Verre glacé chocolaté en bord de mer, encart « Ingrédients » (texte conforme) | [RE]CONFORT | Portrait 1091×1441 | ★★★ | OK (recadré sous l'encart texte) | `reconfort-glace-mer.jpg` : recette latte glacé, moments (plage) |
| 41 | ChatGPT Image 17 sept. 2026 à 11_36_41.png | Stick glissé dans un maillot, dos bronzé, plage | [RE]CONFORT | Portrait 1113×1413 | ★★★ | OK | `reconfort-plage.jpg` : moments (plage) |
| 42 | ChatGPT Image 17 sept. 2026 à 11_36_58.png | Visuel pub « LE BIEN-ÊTRE DEVIENT UN RITUEL » | [RE]CONFORT | Portrait 1125×1398 | ★★★ | ÉCARTÉ — accroche erronée en titre | — |
| 43 | ChatGPT Image 17 sept. 2026 à 11_38_05.png | Visuel pub « LE BIEN-ÊTRE DEVIENT UN RITUEL » | [RE]BELLE | Portrait 1125×1398 | ★★★ | ÉCARTÉ — accroche erronée + fraise coupée | — |
| 44 | ChatGPT Image 17 sept. 2026 à 11_38_19.png | Main tenant le stick, typo « Plaisir & gourmandise » en vague, fond rose | [RE]BELLE | Carré 1247×1261 | ★★★ | OK | `rebelle-plaisir.jpg` : grille Instagram |
| 45 | ChatGPT Image 17 sept. 2026 à 11_39_08.png | Stick glissé dans un maillot, serviette rose, plage | [RE]BELLE | Portrait 1113×1413 | ★★★ | OK | `rebelle-plage.jpg` : moments (plage), grille Instagram |
| 46 | ChatGPT Image 17 sept. 2026 à 11_40_33.png | Main tenant le stick, typo « Plaisir & gourmandise », fond jaune | [RE]CONFORT | Carré 1247×1261 | ★★★ | OK | `reconfort-plaisir.jpg` : grille Instagram |
| 47 | ChatGPT Image 21 sept. 2026 à 11_01_02.png | Maquette d'e-mailing (identique à `docs/ChatGPT Image 21 sept…png`) | Marque | Portrait 866×1816 | ★★ | ÉCARTÉ — sous-titres « Beauté & Éclat » / « Gourmand & Équilibre », accroche erronée, capture d'écran | — |
| 48 | ChatGPT Image 21 sept. 2026 à 11_16_20.png | Planche stand salon (plan 2D, vues) | Marque | Paysage 1312×1199 | ★★ | ÉCARTÉ — document de travail, accroche erronée | — |
| 49 | ChatGPT Image 21 sept. 2026 à 11_17_26.png | Infographie stick (Fraîcheur / Pratique / Fonctionnalité / Gourmandise) | [RE]BELLE | Carré 1254×1254 | ★★★ | ÉCARTÉ — packaging non conforme (icône éclair, « éclat et énergie », pictos 250 ml / 24 h absents des autres visuels) | — |
| 50 | ChatGPT Image 21 sept. 2026 à 16_34_11.png | Plan de découpe (dieline) de la boîte | — | Paysage 1385×1136 | ★★ | ÉCARTÉ — document technique | — |
| 51 | IMG_3426(1).png | Stick détouré (alpha) | [RE]BELLE | Portrait 1179×1693 (sujet 678×1238) | ★★ | ÉCARTÉ — doublon basse déf. de `rebelle-stick.png` | — |
| 52 | IMG_3426(2).png | Boîte détourée (alpha) | [RE]BELLE | Portrait 1179×1693 (sujet 424×728) | ★ | ÉCARTÉ — doublon basse déf. de `rebelle-box.png` | — |
| 53 | IMG_3426(3).png | Boîte détourée (alpha) | [RE]CONFORT | Portrait 1179×1693 (sujet 398×748) | ★ | ÉCARTÉ — doublon basse déf. de `reconfort-box.png` | — |
| 54 | IMG_3426.png | Stick détouré (alpha) | [RE]CONFORT | Portrait 1179×1693 (sujet 337×1220) | ★★ | ÉCARTÉ — doublon basse déf. de `reconfort-stick.png` | — |
| 55 | IMG_3428.jpeg | Boîte sur fond blanc, compressée | [RE]CONFORT | Portrait 440×879 | ★ | ÉCARTÉ — basse résolution, doublon de #03 | — |
| — | RV__Logo_CouleursAplats.svg | Logo vectoriel, aplats | Marque | 170×178 (vectoriel) | ★★★ | Source (non livré tel quel) — texte « LE RITUEL » obsolète (le packaging et le brief indiquent « RITUEL ») | Pétales repris dans le composant `Logo` |
| — | RV__Logo_CouleursDegrade.svg | Logo vectoriel, pétales en dégradé | Marque | vectoriel | ★★★ | ÉCARTÉ — même texte obsolète ; version aplats préférée | — |

## Bilan

- **37 visuels retenus** (dont 4 sources des détourés HD), **19 écartés** + 2 SVG sources.
- Motifs d'exclusion : doublons (8), basse résolution (1), accroche « Le bien-être devient… » en titre (3), sous-titres interdits (2), fraise / fruits des bois (2), packaging non conforme (1), documents de travail (2).
- Aucun visuel ne montre l'ancien stick [RE]BELLE « banane / fraise / reishi » ni « riche en fibres » sur [RE]BELLE.
- Pas de visuel dédié « matin » : les scènes de cuisine lumineuse (#15, #28) jouent ce rôle.
