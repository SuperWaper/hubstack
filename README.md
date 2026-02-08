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

## 📁 Structure du Projet

```text
hubstack/
├── index.html          # Structure
├── script.js           # Logique JavaScript (Thèmes & Animations)
├── style-base.css      # Styles, Layout & Variables de thèmes
└── assets/             # Images, favicons et icônes
```

## 🚀 Installation & Utilisation

1. **Cloner ou Télécharger** : Récupérez les fichiers du projet.
2. **Personnaliser** :
   - Modifiez `index.html` pour mettre vos liens, votre nom et votre bio.
   - Remplacez les images dans `assets/` (votre photo de profil et favicons).
3. **Tester** : Ouvrez simplement `index.html` dans votre navigateur.

## ☁️ Déploiement

Le site est statique et peut être déployé en quelques secondes :

- **Vercel** : Importez le dossier et déployez.
- **GitHub Pages** : Poussez sur un repo et activez GitHub Pages dans les réglages.

## 🛠️ Personnalisation avancée

Pour modifier les couleurs :
1. Ouvrez `style-base.css`.
2. Modifiez les variables dans `body.theme-dark` ou `body.theme-light`.
3. Pour ajouter un nouveau thème, créez une nouvelle classe (ex: `body.theme-ocean`).

---
*Fait avec ❤️ par Thomas Petaroscia.*
