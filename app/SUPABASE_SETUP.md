# 🗄️ Configuration Supabase - La Réserve

Ce guide explique comment configurer Supabase pour votre restaurant.

---

## 📋 Prérequis

- Un compte [Supabase](https://supabase.com)
- Un projet Supabase créé

---

## 🚀 Étape 1 : Créer un projet Supabase

1. Allez sur [supabase.com](https://supabase.com)
2. Créez un nouveau projet
3. Notez l'**URL** et la **clé anonyme (anon key)**

---

## 🗃️ Étape 2 : Exécuter le schéma SQL

### Méthode 1 : Via le Dashboard Supabase (Recommandé)

1. Allez dans votre projet Supabase
2. Cliquez sur **"SQL Editor"** dans le menu latéral
3. Cliquez sur **"New query"**
4. Copiez-collez le contenu du fichier `database-schema.sql`
5. Cliquez sur **"Run"**

### Méthode 2 : Via psql (Avancé)

```bash
psql -h your-project.supabase.co -p 5432 -d postgres -U postgres -f database-schema.sql
```

---

## 👤 Étape 3 : Créer un utilisateur admin

### 3.1 Créer l'utilisateur dans Authentication

1. Allez dans **"Authentication"** → **"Users"**
2. Cliquez sur **"Add user"**
3. Choisissez **"Create new user"**
4. Renseignez :
   - **Email** : `admin@lareserve.bj`
   - **Password** : Choisissez un mot de passe sécurisé
5. Cliquez sur **"Create user"**

### 3.2 Ajouter l'utilisateur dans la table admin_users

Dans l'**SQL Editor**, exécutez :

```sql
-- Remplacez 'USER_ID_HERE' par l'ID de l'utilisateur créé
INSERT INTO admin_users (id, email, role, full_name)
VALUES (
    'USER_ID_HERE',
    'admin@lareserve.bj',
    'admin',
    'Administrateur'
);
```

Pour trouver l'ID de l'utilisateur :
1. Allez dans **"Authentication"** → **"Users"**
2. Copiez l'ID de l'utilisateur admin

---

## 📦 Étape 4 : Configurer le Storage (Buckets)

Les buckets sont automatiquement créés par le script SQL. Vérifiez dans :

**"Storage"** → **"Buckets"**

Vous devriez voir :
- `menu-images` - Photos des plats
- `menu-videos` - Vidéos des plats
- `gallery-images` - Photos de la galerie
- `gallery-videos` - Vidéos de la galerie

### Politiques de sécurité

Les politiques RLS sont déjà configurées dans le script SQL :
- ✅ Lecture publique pour tous
- ✅ Écriture réservée aux administrateurs

---

## 🔧 Étape 5 : Configurer l'application

### 5.1 Créer le fichier .env

```bash
cp .env.example .env
```

### 5.2 Remplir les variables

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

Trouvez ces valeurs dans :
**"Project Settings"** → **"API"**

---

## ✅ Étape 6 : Vérifier l'installation

### Tester la connexion

1. Démarrez l'application :
```bash
npm run dev
```

2. Allez sur `http://localhost:5173`

3. Testez le site public

4. Testez le panel admin :
   - URL : `http://localhost:5173/admin`
   - Email : `admin@lareserve.bj`
   - Password : Votre mot de passe

---

## 📊 Tables créées

| Table | Description |
|-------|-------------|
| `restaurant_info` | Informations du restaurant |
| `menu_items` | Plats du menu |
| `reviews` | Avis clients |
| `reservations` | Réservations |
| `gallery` | Photos et vidéos |
| `admin_users` | Utilisateurs administrateurs |

---

## 🔒 Sécurité

### Row Level Security (RLS)

Toutes les tables ont RLS activé avec les politiques suivantes :

| Table | Public | Admin |
|-------|--------|-------|
| `restaurant_info` | ✅ Lecture | ✅ Écriture |
| `menu_items` | ✅ Lecture | ✅ Écriture |
| `reviews` | ✅ Lecture, ✅ Création | ✅ Modération |
| `reservations` | ✅ Création | ✅ Gestion |
| `gallery` | ✅ Lecture | ✅ Écriture |

---

## 🛠️ Fonctions disponibles

| Fonction | Description |
|----------|-------------|
| `get_menu_items_by_category(category)` | Récupère les plats par catégorie |
| `get_featured_gallery()` | Récupère les médias mis en avant |
| `get_pending_reviews_count()` | Compte les avis en attente |
| `get_today_reservations()` | Récupère les réservations du jour |

---

## 📈 Vue dashboard_stats

Cette vue fournit les statistiques pour le dashboard admin :

```sql
SELECT * FROM dashboard_stats;
```

Retourne :
- `reservations_this_month`
- `pending_reviews`
- `available_menu_items`
- `pending_reservations`

---

## 🔄 Mise à jour du schéma

Pour mettre à jour le schéma sans perdre les données :

1. Sauvegardez vos données
2. Exécutez uniquement les nouvelles commandes
3. Ne réexécutez pas `CREATE TABLE` sur des tables existantes

---

## 🆘 Dépannage

### Erreur : "Policy denied"

Vérifiez que l'utilisateur est bien dans la table `admin_users` :

```sql
SELECT * FROM admin_users WHERE email = 'admin@lareserve.bj';
```

### Erreur : "Bucket not found"

Créez les buckets manuellement dans **"Storage"** → **"New bucket"**

### Erreur : "Relation does not exist"

Le schéma n'est pas créé. Réexécutez le fichier SQL.

---

## 📞 Support

- Documentation Supabase : https://supabase.com/docs
- Forum communautaire : https://github.com/supabase/supabase/discussions
