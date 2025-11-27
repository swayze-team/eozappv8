# 🎮 EOZ ESPORT - Elite Gaming Platform

Application e-sport professionnelle complète pour l'équipe EOZ avec authentification Discord, tracker Fortnite en temps réel, système de tickets support, chat d'équipe et analytics avancées.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-v4-38B2AC?style=flat-square&logo=tailwind-css)

## ✨ Fonctionnalités Complètes

### 🔐 Authentification
- **Discord OAuth 2.0** - Connexion sécurisée via Discord
- Gestion automatique des sessions
- Profil utilisateur avec avatar Discord

### 📊 Fortnite Stats Tracker
- **API Fortnite réelle** intégrée (fortnite-api.com)
- Recherche par nom d'utilisateur
- Support multi-plateforme (PC, PlayStation, Xbox)
- Stats détaillées Solo/Duo/Squad
- K/D Ratio, Win Rate, Kills totaux
- Historique des matchs récents

### 🎯 Analytics Avancées
- Graphiques de performance (Recharts)
- Évolution K/D hebdomadaire
- Insights automatiques
- Recommandations personnalisées

### 🏆 Leaderboard
- Classement de l'équipe
- Podium animé des top 3
- Points, victoires, K/D
- Mise à jour en temps réel

### 💬 Chat d'Équipe
- Messages en temps réel
- Indicateur de frappe
- Membres en ligne
- Auto-scroll intelligent

### 🎫 Système de Support
- Création de tickets
- Catégories multiples
- 4 niveaux de priorité
- Messagerie intégrée
- Token unique par utilisateur
- Notifications admin

### 📰 Actualités Fortnite
- News officielles du jeu
- Images haute qualité
- Mise à jour automatique

### 📜 Historique E-Sport
- Timeline des événements
- Achievements de l'équipe
- Hall of Fame
- Statistiques des tournois

### ⚙️ Paramètres
- Gestion profil Discord
- Liaison compte Epic Games
- Notifications personnalisables
- Thème et langue
- Confidentialité

## 🚀 Installation Rapide

### Prérequis
\`\`\`bash
Node.js 18+
npm/yarn/pnpm
\`\`\`

### 1. Installation
\`\`\`bash
git clone <votre-repo>
cd eoz-esport
npm install
\`\`\`

### 2. Variables d'environnement
Créez `.env.local` :
\`\`\`env
# Discord OAuth (REQUIS)
NEXT_PUBLIC_DISCORD_CLIENT_ID=your_client_id
DISCORD_CLIENT_SECRET=your_client_secret
NEXT_PUBLIC_DISCORD_REDIRECT_URI=http://localhost:3000

# Fortnite API (Optionnel)
FORTNITE_API_KEY=your_api_key
\`\`\`

### 3. Configuration Discord
1. [Discord Developer Portal](https://discord.com/developers/applications)
2. Créer une application
3. OAuth2 → Redirects: `http://localhost:3000`
4. Copier Client ID & Secret

### 4. Lancer l'app
\`\`\`bash
npm run dev
\`\`\`
Ouvrez http://localhost:3000

## 🎨 Stack Technique

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI**: shadcn/ui components
- **Fonts**: Inter + Space Grotesk
- **Charts**: Recharts
- **Auth**: Discord OAuth 2.0
- **API**: Fortnite-API.com

## 📁 Structure

\`\`\`
app/
├── api/
│   ├── auth/discord/          # OAuth Discord
│   ├── fortnite/              # Stats & News
│   └── tickets/               # Support system
├── layout.tsx
├── page.tsx
└── globals.css

components/
├── ui/                        # shadcn/ui
├── dashboard.tsx              # Dashboard principal
├── stats-tracker.tsx          # Tracker Fortnite
├── ticket-system.tsx          # Support tickets
├── team-chat.tsx              # Chat équipe
├── analytics.tsx              # Analytics
├── leaderboard.tsx            # Classement
├── fortnite-news.tsx          # Actualités
├── team-history.tsx           # Historique
└── settings.tsx               # Paramètres
\`\`\`

## 🔧 APIs Utilisées

### Discord OAuth
- Endpoint: `https://discord.com/api/oauth2/authorize`
- Scopes: `identify`, `email`, `guilds`

### Fortnite API
- Base: `https://fortnite-api.com/v2`
- `/stats/br/v2` - Stats joueur
- `/news/br` - Actualités

## 🎫 Système de Tickets

Le système utilise un stockage en mémoire avec:
- Token unique localStorage
- 4 catégories
- 4 niveaux de priorité
- Messagerie temps réel
- Notifications

**Production**: Remplacer par une vraie DB (Supabase, PostgreSQL)

## 🌐 Déploiement

### Vercel (Recommandé)
\`\`\`bash
npm i -g vercel
vercel
\`\`\`

Configurez les variables d'environnement dans le dashboard Vercel.

## 🎨 Personnalisation

### Couleurs (globals.css)
\`\`\`css
.dark {
  --primary: 189 100% 55%;    /* Cyan */
  --accent: 328 86% 65%;      /* Pink */
}
\`\`\`

### Fonts (layout.tsx)
\`\`\`tsx
import { Inter, Space_Grotesk } from 'next/font/google'
\`\`\`

## 📝 TODO

- [ ] Base de données réelle (Supabase)
- [ ] WebSocket pour chat temps réel
- [ ] Push notifications
- [ ] Panel admin complet
- [ ] Intégration Twitch
- [ ] Calendrier tournois
- [ ] Application mobile

## 🤝 Contribution

Contributions bienvenues! Ouvrez une issue ou PR.

## 📄 Licence

MIT License

## 🎮 À propos

EOZ Esport - Équipe e-sport professionnelle Fortnite. Cette plateforme centralise toutes les fonctionnalités nécessaires à la gestion d'une équipe pro.

---

**Version**: 1.0.0  
**Dernière MAJ**: Novembre 2024  
Développé avec ❤️ par EOZ Esport
