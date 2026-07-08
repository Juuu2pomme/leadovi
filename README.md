# LEADOVI — Guide pour continuer le site 🌐

Ce dossier, c'est **le site leadovi.fr** (génération de leads pour les pros de l'énergie).
Tu peux le faire évoluer avec Claude sans être technique. Suis les 3 étapes ci-dessous.

---

## 🧑‍💻 Pour toi — comment travailler

### Étape 1 — Donner le site à Claude
1. Va sur **claude.ai**, ouvre un nouveau chat (ou un « Projet » si tu as Claude Pro, c'est encore mieux).
2. **Glisse tous les fichiers de ce dossier dans le chat** (ou dans le Projet). Claude verra tout le site.
3. Colle le **prompt de départ** ci-dessous.

### Étape 2 — Le prompt de départ (copie-colle ça à Claude)

> Salut Claude ! Je ne suis pas technique. Je veux continuer à améliorer mon site web **LEADOVI**. Tu as accès à tous les fichiers du site.
>
> **Avant tout : lis en entier le fichier `README.md`, surtout la section « 🤖 Contexte pour Claude ».** Elle contient les règles à respecter (comment le site est construit, ce qu'il ne faut pas casser, la charte de marque).
>
> Ensuite, guide-moi **étape par étape, en langage simple, sans jargon**. Pose-moi des questions si besoin. Quand je te demande un changement, applique-le sur les bons fichiers, et **donne-moi le contenu complet de chaque fichier modifié, prêt à enregistrer** (en gardant le même nom de fichier).
>
> Mon premier objectif : **[ÉCRIS ICI CE QUE TU VEUX FAIRE]**

### Étape 3 — Enregistrer et renvoyer à Julian
- Claude te donnera les fichiers modifiés → **enregistre-les dans le dossier en gardant exactement le même nom** (ex : `index.html` reste `index.html`).
- **Garde tous les autres fichiers**, ne supprime rien.
- Quand c'est prêt, **envoie le dossier complet à Julian par WeTransfer**, avec un petit mot de ce que tu as changé.
- Julian s'occupe de la mise en ligne. **Ne t'occupe pas du serveur ni de GitHub.**

---

## 🤖 Contexte pour Claude — à lire avant toute modification

**Rôle attendu :** tu assistes une personne **non technique**. Explique simplement, sans jargon, pas à pas. Propose, vérifie, préviens avant tout gros changement. Après chaque modif, liste clairement les fichiers touchés et donne leur contenu complet, prêt à enregistrer.

**Ce qu'est le site :**
- Site **100 % statique** : `HTML` + `CSS` + `JavaScript` uniquement. **Aucun build, aucun framework, aucun `npm`.** Ça doit toujours pouvoir s'ouvrir en double-cliquant un fichier `.html`. N'introduis jamais React, Vue, Node, un bundler, etc.
- **Pages :** `index.html` (accueil) + 6 pages secteurs (`pv-solaire`, `pac`, `isolation`, `renovation`, `fenetres`, `pergola`) + `contact.html` + 4 pages légales (`mentions-legales`, `politique-confidentialite`, `cgv`, `politique-cookies`).
- **`style.css`** = tout le style (couleurs, mise en page, responsive). **`components.js`** = le JavaScript partagé (fond animé, **menu mobile hamburger**, animations d'apparition au scroll, **envoi du formulaire**, favicon). Ne casse pas ces deux fichiers.

**Règles à ne PAS casser :**
1. **Menu (nav) et pied de page (footer) sont recopiés dans CHAQUE page.** Il n'y a pas de système de template. Si tu modifies le menu ou le footer, **fais le même changement dans TOUTES les pages `.html`**.
2. **Formulaire de contact = service Web3Forms.** Ne reviens JAMAIS à Netlify. La clé du formulaire (`web3forms-key.js`) est **volontairement absente** de ce dossier — elle vit sur le serveur. C'est **normal** qu'elle manque : ne la recrée pas, ne mets pas de clé en dur, ne t'en inquiète pas.
3. **Menu mobile :** sous 900px de large, le menu devient un bouton hamburger (☰) géré automatiquement par `components.js`. Ne le supprime pas. **Teste toujours en vue mobile ET ordinateur.**
4. **Animations d'apparition :** géré par `components.js` (`fade-in`). Ne remets pas le contenu en `opacity:0` sans le mécanisme de révélation, sinon des sections deviennent invisibles.
5. **Pages légales :** elles contiennent des `[TEXTES ENTRE CROCHETS]` (affichés en orange) à remplir avec les vraies infos de la société. **Ne les invente pas.** Laisse les crochets si l'info manque.
6. **Ne supprime aucune page existante.**

**Charte de marque (à respecter) :**
- **Langue : français, vouvoiement partout** (le site s'adresse à des professionnels). Jamais de tutoiement.
- **Ton :** pro, direct, phrases courtes. Pas de buzzwords creux, pas de survente.
- **Couleurs :** fond sombre « deep space » (`#04060F`), indigo (`#5B47FB`), orange (`#FB8B47`), turquoise (`#47D5FB`). Reste cohérent avec l'existant.

**Handoff :** quand c'est validé, rappelle à la personne d'enregistrer les fichiers modifiés (mêmes noms), de garder tous les fichiers, et d'envoyer **le dossier complet** à Julian par WeTransfer.

---

*Questions techniques (serveur, nom de domaine, mise en ligne) → c'est Julian qui gère, pas la personne qui édite.*
