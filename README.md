# LEADOVI — Guide pour continuer le site 🌐

Ce dossier, c'est **le site leadovi.fr** (génération de leads pour les pros de l'énergie).
Tu peux le faire évoluer avec Claude sans être technique. Suis les 3 étapes ci-dessous.

---

## 🧑‍💻 Pour toi — comment travailler

1. Va sur **claude.ai** et ouvre un nouveau chat.
2. **Copie-colle le prompt de départ ci-dessous** (remplace la dernière ligne par ce que tu veux faire).
3. Laisse-toi guider : Claude récupère le code, lit ce guide, puis t'aide pas à pas et te donne les fichiers modifiés à enregistrer.
4. Quand c'est fini, Claude t'aide à **tout renvoyer à Julian par WeTransfer** (dossier complet, sans rien supprimer). Julian s'occupe de la mise en ligne — **toi, tu ne touches ni au serveur ni à GitHub.**

### Le prompt de départ (copie-colle ça à Claude)

> Je vibe code ma landing page, leadovi.fr. Julian gère pour moi la partie GitHub et l'hébergement : je lui donne juste le code, il s'occupe du reste.
>
> Voici l'URL GitHub du projet : https://github.com/Juuu2pomme/leadovi
> Je veux continuer à améliorer mon site web LEADOVI.
>
> Avant tout : lis en entier le fichier `README.md`, surtout la section « 🤖 Contexte pour Claude ». Elle contient les règles à respecter (comment le site est construit, ce qu'il ne faut pas casser, la charte de marque).
>
> Ensuite, guide-moi étape par étape, en langage simple, sans jargon. Pose-moi des questions si besoin. Quand je te demande un changement, applique-le sur les bons fichiers et donne-moi le contenu complet de chaque fichier modifié, prêt à enregistrer (en gardant le même nom de fichier).
>
> Quand j'aurai fini, tu m'aideras à tout renvoyer à Julian (via WeTransfer).
>
> Dans un premier temps, aide-moi à récupérer tout le code : si tu peux accéder directement au projet via le lien GitHub, fais-le ; sinon, guide-moi pas à pas pour télécharger le dossier (sur GitHub : bouton vert « Code » → « Download ZIP »), le décompresser, et te transmettre les fichiers. Une fois que tu as bien tout le site sous les yeux, on commence.

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
