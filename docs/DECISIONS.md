# Décisions prises sans validation

| # | Sujet | Décision | Pourquoi |
|---|---|---|---|
| 1 | Sources photos | Les images brutes de `docs/photos/` (~90 Mo) et le brief `.odt` sont exclus de git (`.gitignore`). Seuls `INVENTAIRE.md`, les SVG et les images optimisées de `src/assets/images/` sont versionnés. | Poids du dépôt, déploiement Vercel plus rapide. Les sources restent en local. |
| 2 | Détourés | Sticks et boîtes détourés à partir des visuels studio HD (#00–#03) plutôt que les PNG `IMG_3426*` fournis. | Les détourés fournis sont en basse définition (sujet ≤ 680 px). |
| 3 | Mention « Le bien-être devient un rituel. » sur la tranche des boîtes | Visuels de boîtes conservés malgré cette mention (petite, secondaire). Les visuels où elle est l'accroche principale sont écartés. | Les boîtes sont indispensables aux fiches produits ; aucun visuel sans cette mention n'existe. **À valider avec la cliente (packaging à mettre à jour ?)**. |
| 4 | Logo | Le SVG fourni affiche « LE RITUEL VERTUEUX » en noir (ancienne version, le brief demande d'enlever « LE »). Composant `Logo` recréé : pétales vectoriels officiels + texte circulaire « RITUEL » / « VERTUEUX » comme sur le packaging. | Fidélité au packaging actuel. |
