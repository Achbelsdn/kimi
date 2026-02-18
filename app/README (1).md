# 🍽️ La Réserve - Restaurant & Bar

Site web professionnel pour restaurant avec panel d'administration complet.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss)
![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?logo=supabase)

---

## ✨ Fonctionnalités

### 🌐 Site Web Public
- ✅ Design moderne et élégant
- ✅ Animations fluides (Framer Motion)
- ✅ Responsive (mobile, tablette, desktop)
- ✅ Sections : Hero, À Propos, Menu, Galerie, Avis, Réservation, Contact
- ✅ Intégration Google Maps
- ✅ Formulaire de réservation
- ✅ Système d'avis clients

### 🔐 Panel Admin
- ✅ Dashboard avec statistiques
- ✅ Gestion complète du menu (CRUD)
- ✅ Modération des avis clients
- ✅ Gestion des réservations
- ✅ Upload photos/vidéos
- ✅ Galerie médias avec mise en avant
- ✅ Paramètres du restaurant

---

## 🚀 Démarrage rapide

### Prérequis
- Node.js 18+
- npm ou yarn
- Compte Supabase (gratuit)

### Installation

```bash
# Cloner le projet
git clone https://github.com/yourusername/la-reserve.git
cd la-reserve

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env
# Éditez .env avec vos credentials Supabase

# Démarrer le serveur de développement
npm run dev
```

### Build production

```bash
npm run build
```

---

## 📁 Structure du projet

```
la-reserve/
├── src/
│   ├── components/
│   │   ├── ui/              # Composants shadcn/ui
│   │   ├── sections/        # Sections du site web
│   │   └── Navigation.tsx   # Navigation principale
│   ├── pages/
│   │   ├── HomePage.tsx     # Page d'accueil
│   │   └── admin/           # Pages admin
│   │       ├── Login.tsx
│   │       ├── Dashboard.tsx
│   │       ├── Menu.tsx
│   │       ├── Reviews.tsx
│   │       ├── Reservations.tsx
│   │       ├── Gallery.tsx
│   │       └── Settings.tsx
│   ├── hooks/               # Custom React hooks
│   ├── contexts/            # React contexts
│   ├── lib/                 # Utilitaires
│   │   └── supabase.ts      # Client Supabase
│   ├── types/               # Types TypeScript
│   └── App.tsx              # Routeur principal
├── public/                  # Assets statiques
├── database-schema.sql      # Schéma de la base de données
├── SUPABASE_SETUP.md        # Guide configuration Supabase
└── package.json
```

---

## 🗄️ Configuration de la base de données

Voir le fichier [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) pour les instructions détaillées.

### Résumé

1. Créez un projet sur [Supabase](https://supabase.com)
2. Exécutez le fichier `database-schema.sql` dans l'éditeur SQL
3. Créez un utilisateur admin dans Authentication
4. Ajoutez l'utilisateur dans la table `admin_users`
5. Configurez les variables d'environnement

---

## 🛠️ Stack technique

| Technologie | Usage |
|-------------|-------|
| **React 18** | Framework UI |
| **TypeScript** | Typage statique |
| **Vite** | Build tool |
| **Tailwind CSS** | Styling |
| **shadcn/ui** | Composants UI |
| **Framer Motion** | Animations |
| **Supabase** | Backend, Auth, Database, Storage |
| **React Query** | Gestion des données |
| **React Router** | Routing |

---

## 📱 Responsive Design

Le site est optimisé pour tous les appareils :
- 📱 Mobile (< 640px)
- 📲 Tablette (640px - 1024px)
- 💻 Desktop (> 1024px)

---

## 🔐 Authentification

### Créer un compte admin

1. Créez un utilisateur dans Supabase Authentication
2. Ajoutez-le dans la table `admin_users` :

```sql
INSERT INTO admin_users (id, email, role, full_name)
VALUES (
    'USER_ID',
    'admin@lareserve.bj',
    'admin',
    'Administrateur'
);
```

---

## 📸 Storage (Buckets)

Les buckets suivants sont créés automatiquement :

| Bucket | Usage | Public |
|--------|-------|--------|
| `menu-images` | Photos des plats | ✅ |
| `menu-videos` | Vidéos des plats | ✅ |
| `gallery-images` | Photos de la galerie | ✅ |
| `gallery-videos` | Vidéos de la galerie | ✅ |

---

## 🎨 Personnalisation

### Couleurs

Les couleurs sont définies dans `tailwind.config.js` :

```javascript
colors: {
  amber: {
    500: '#f59e0b', // Couleur principale
  },
  slate: {
    950: '#020617', // Fond sombre
  }
}
```

### Polices

- **Titres** : Playfair Display (serif)
- **Corps** : Inter (sans-serif)

---

## 📊 Fonctionnalités Admin

### Dashboard
- Statistiques en temps réel
- Réservations récentes
- Actions rapides

### Gestion du Menu
- Ajouter/modifier/supprimer des plats
- Upload d'images et vidéos
- Catégories : Entrées, Plats, Desserts, Boissons, Vins
- Gestion de la disponibilité

### Avis Clients
- Modération des avis
- Système de notation (1-5 étoiles)
- Notation détaillée (Cuisine, Service, Ambiance)

### Réservations
- Liste des réservations
- Filtrage par statut
- Confirmation/Annulation

### Galerie
- Upload photos/vidéos
- Catégorisation
- Mise en avant

### Paramètres
- Informations du restaurant
- Horaires d'ouverture
- Réseaux sociaux

---

## 🚀 Déploiement

### Vercel (Recommandé)

```bash
npm i -g vercel
vercel
```

### Netlify

```bash
npm run build
netlify deploy --prod --dir=dist
```

### Sur votre serveur

```bash
npm run build
# Copiez le dossier 'dist' sur votre serveur
```

---

## 📝 Scripts disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Démarrer le serveur de développement |
| `npm run build` | Build pour production |
| `npm run preview` | Prévisualiser le build |
| `npm run lint` | Lancer ESLint |

---

## 🤝 Contribution

Les contributions sont les bienvenues !

1. Fork le projet
2. Créez une branche (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push sur la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

---

## 📄 License

Ce projet est sous licence MIT.

---

## 🙏 Remerciements

- [shadcn/ui](https://ui.shadcn.com) pour les composants UI
- [Supabase](https://supabase.com) pour le backend
- [Framer Motion](https://www.framer.com/motion) pour les animations

---

## 📞 Contact

Pour toute question ou suggestion :
- Email : contact@lareserve.bj
- Téléphone : 91 11 71 71

---

<p align="center">
  <strong>La Réserve - Une expérience culinaire africaine d'exception</strong>
</p>
