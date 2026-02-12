# HubStack 🚀

**HubStack** est un modèle de page de profil (Link-in-bio) ultra-léger, performant et élégant, conçu pour remplacer les solutions propriétaires comme Bento.me ou Linktree.

## ✨ Caractéristiques

- 🎨 **Design Moderne & Premium** : Esthétique soignée avec des effets de verre (glassmorphism) et des dégradés vibrants.
- 🌓 **Système de Thèmes** : Basculez entre un mode sombre profond et un mode clair aux nuances de gris élégantes. La préférence est sauvegardée localement.
- ⚡ **Performance Maximale** : 100% HTML/CSS/JS Vanilla. Pas de frameworks lourds, chargement quasi-instantané.
- 📱 **100% Responsive** : S'adapte parfaitement aux mobiles, tablettes et ordinateurs.
- ⌨️ **Leet Speak Animation** : Effet de transformation "leet speak" interactif sur le nom au survol.
- 🧩 **Architecture Modulaire** : CSS séparé en une base commune et des fichiers de thèmes légers pour une personnalisation facile.
- 🌐 **Prêt pour le Déploiement** : Compatible avec Vercel, GitHub Pages, Netlify ou tout hébergement statique.

## 📁 Structure Multi-Utilisateurs

HubStack est désormais une plateforme modulaire. Le moteur (HTML/CSS/JS) est séparé des données utilisateurs (JSON).

```text
hubstack/
├── index.html          # Moteur de rendu (Template unique)
├── script.js           # Moteur d'hydratation dynamique
├── style-base.css      # Styles partagés
├── vercel.json         # Routage Vercel (URLs /username)
└── users/
    └── [username]/
        ├── user.json   # Données spécifiques (Liens, Bio, etc.)
        └── assets/     # Images spécifiques (Profil, Icônes)
```

## 🚀 Comment ajouter un utilisateur ?

1.  Via votre pull request (aprés fork du projet hubstack).
2.  Créez un dossier dans `/users/` avec l'identifiant souhaité (ex: `marc`).
3.  Copiez un fichier `user.json` existant dedans et personnalisez les données.
4.  Ajoutez les images dans le sous-dossier `assets/`.
5.  L'URL sera automatiquement disponible (après validation de votre PR) :
    - **En Production (Vercel)** : `hubstack.vercel.app/marc` (grâce au fichier `vercel.json`).
    - **En Local** : Utilisez le paramètre URL `?user=marc`.
    - L'URL sans paramètre (ex: `index.html`) affichera désormais le profil `demo` par défaut.

> [!TIP]
> Le fichier `vercel.json` n'est interprété que par Vercel. Pour tester les "URLs propres" en local, vous pouvez installer la CLI Vercel et utiliser la commande `vercel dev` au lieu de `npx serve`.

## 💻 Utilisation en Local

Pour tester vos modifications ou visualiser un profil sans serveur externe, suivez ces étapes :

1.  **Prérequis** : Avoir [Node.js](https://nodejs.org/) installé.
2.  **Lancement** : Ouvrez un terminal dans le dossier du projet et lancez :
    ```bash
    npx serve .
    ```
3.  **Accès** : Ouvrez l'URL affichée (généralement `http://localhost:3000`).
    - Par défaut, le profil `demo` s'affiche.
    - Pour voir un utilisateur spécifique : `http://localhost:3000/?user=votreusername`.

## 🤝 Comment contribuer (Pull Request) ?

Vous souhaitez ajouter votre profil à l'instance partagée ? C'est simple :

1.  **Fork** : Créez un fork du projet sur votre compte GitHub.
2.  **Branche** : Créez une nouvelle branche (`git checkout -b feat/add-user-votre-nom`).
3.  **Ajout** : Créez votre dossier dans `/users/` avec votre `user.json` et vos `assets/` (voir la section "Comment ajouter un utilisateur").
4.  **Test** : Vérifiez que tout s'affiche correctement en local.
5.  **Commit** : Enregistrez vos modifications (`git commit -m "feat: add user votre-nom"`).
6.  **PR** : Poussez votre branche et ouvrez une Pull Request sur le dépôt principal.

## ☁️ Déploiement (Vercel)

L'un des grands avantages de **HubStack** est l'automatisation totale une fois relié à Vercel :

1.  **PR Mergée** : Dès que vous validez une Pull Request (PR) sur GitHub, Vercel détecte le changement.
2.  **Build Auto** : Vercel déploie automatiquement la nouvelle version en quelques secondes.
3.  **URLs Propres** : Grâce au fichier `vercel.json`, vos utilisateurs seront immédiatement accessibles sur `hubstack.vercel.app/nom-utilisateur`.

## 🛠️ Personnalisation avancée

Pour modifier les couleurs :

1. Ouvrez `style-base.css`.
2. Modifiez les variables dans `body.theme-dark` ou `body.theme-light`.
3. Pour ajouter un nouveau thème, créez une nouvelle classe (ex: `body.theme-ocean`).

---

_Fait avec ❤️ par Thomas Petaroscia._
