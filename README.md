# 🚀 DevToolbox Pro

<p align="center">
  <img src="https://img.shields.io/badge/version-2.0.0-blue.svg" alt="Version">
  <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="License">
  <img src="https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg" alt="Node">
  <img src="https://img.shields.io/badge/platform-linux%20%7C%20macos%20%7C%20windows-lightgrey.svg" alt="Platform">
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome">
</p>

<p align="center">
  <img src="https://img.shields.io/github/v/release/votreusername/devtoolbox-pro" alt="Release">
  <img src="https://img.shields.io/github/license/votreusername/devtoolbox-pro" alt="License">
  <img src="https://img.shields.io/github/stars/votreusername/devtoolbox-pro" alt="Stars">
  <img src="https://img.shields.io/github/contributors/votreusername/devtoolbox-pro" alt="Contributors">
  <img src="https://img.shields.io/github/issues/votreusername/devtoolbox-pro" alt="Issues">
</p>

<p align="center">
  <strong>Votre assistant de développement ultime en ligne de commande</strong>
</p>

<p align="center">
  Une boîte à outils complète et interactive pour gérer Docker, Git, NPM, bases de données, 
  monitoring système et bien plus encore, le tout depuis votre terminal préféré.
</p>

---

## 📋 Table des Matières

- [✨ Fonctionnalités](#-fonctionnalités)
- [📸 Captures d'écran](#-captures-décran)
- [🚀 Installation](#-installation)
- [📖 Utilisation](#-utilisation)
- [🎯 Modules Disponibles](#-modules-disponibles)
- [⚙️ Configuration](#️-configuration)
- [🎨 Thèmes](#-thèmes)
- [🔧 Commandes Personnalisées](#-commandes-personnalisées)
- [📊 Exemples d'Utilisation](#-exemples-dutilisation)
- [🛠️ Développement](#️-développement)
- [🤝 Contribution](#-contribution)
- [📝 Changelog](#-changelog)
- [📄 License](#-license)
- [👥 Auteurs](#-auteurs)

---

## ✨ Fonctionnalités

### 🎯 **Modules Principaux**

- 🐳 **Docker Manager** - Gestion complète de conteneurs, images et Docker Compose
- 📦 **Git Manager** - Commits conventionnels, branches, merges et visualisation
- 📦 **NPM/Yarn/PNPM** - Gestion de packages multi-gestionnaires
- 💾 **Database Manager** - Support MySQL, PostgreSQL, MongoDB, Redis, SQLite
- 🌐 **Network Tools** - Ping, scan ports, test vitesse, vérification SSL
- 📊 **System Monitoring** - Dashboard temps réel, métriques CPU/RAM/Disque
- ⚙️ **System Tools** - Infos système, nettoyage, gestion processus
- 🔧 **Custom Commands** - Créez et gérez vos propres commandes

### 🎨 **Interface & Personnalisation**

- ✅ Interface interactive colorée et moderne
- ✅ 5 thèmes personnalisables (Dark, Light, Neon, Sunset, Ocean)
- ✅ Animations et effets visuels
- ✅ Raccourcis clavier configurables
- ✅ Navigation intuitive avec flèches clavier
- ✅ Support multi-sélection
- ✅ Mode rapide pour actions fréquentes

### 🔒 **Robustesse & Qualité**

- ✅ Gestion d'erreurs avancée
- ✅ Logging multi-niveaux (DEBUG, INFO, WARN, ERROR)
- ✅ Validation des entrées utilisateur
- ✅ Support mode interactif et non-interactif
- ✅ Sauvegarde/restauration de configuration
- ✅ Historique des commandes
- ✅ Compatible Linux, macOS, Windows

---

## 📸 Captures d'écran

### Menu Principal
```
┌────────────────────────────────────────────────────────────┐
│                                                            │
│  ╔╦╗╔═╗╦ ╦╔╦╗╔═╗╦╔╗ ╔═╗╦ ╦╔╗╔╔═╗╔╦╗                        │
│   ║║╠═╣║ ║ ║ ║╣ ║╠╩╗║ ║║ ║║║║║╣  ║║                        │
│  ═╩╝╩ ╩╚═╝ ╩ ╚═╝╩╚═╝╚═╝╚═╝╝╚╝╚═╝═╩╝                        │
│                                                            │
└────────────────────────────────────────────────────────────┘

📋 Que souhaitez-vous faire ?
  🐳 Docker - Gestion des conteneurs
  📦 Git - Gestion de version
  📦 NPM/Yarn - Gestion de packages
  💾 Bases de données
  🌐 Outils réseau
  📊 Monitoring système
  ⚙️  Commandes système
  🔧 Commandes personnalisées
  🎨 Personnalisation
```

### Dashboard Monitoring
```
📊 Dashboard Monitoring Temps Réel

🕒 01/02/2026 14:30:45

💻 CPU Load: 1.23 1.45 1.67 (1,5,15 min)
🧠 Mémoire: 65.4% utilisé (10.47 GB / 16.00 GB)
📊 Uptime: 12.3 heures
⚙️  CPUs: 8 cœurs - Intel Core i7-9700K

💾 Système:
  • Plateforme: linux x64
  • Node.js: v18.17.0
  • Utilisateur: developer
```

---

## 🚀 Installation

### Prérequis

- **Node.js** >= 14.0.0
- **npm** ou **yarn** ou **pnpm**
- **Git** (optionnel, pour module Git)
- **Docker** (optionnel, pour module Docker)

### Installation Rapide

```bash
# Cloner le repository
git clone https://github.com/votreusername/devtoolbox-pro.git

# Naviguer dans le dossier
cd devtoolbox-pro

# Installer les dépendances
npm install

# Rendre exécutable (Unix/Linux/Mac)
chmod +x index.js

# Créer un lien global (optionnel)
npm link
```

### Installation via NPM (si publié)

```bash
npm install -g devtoolbox-pro
```

### Vérification de l'installation

```bash
# Afficher la version
devtool --version

# Afficher l'aide
devtool --help

# Lancer l'application
devtool
```

---

## 📖 Utilisation

### Démarrage

```bash
# Mode interactif (recommandé)
devtool

# ou avec Node.js
node index.js
```

### Mode Rapide

```bash
# Accès direct aux actions fréquentes
devtool quick
```

### Configuration

```bash
# Ouvrir les paramètres
devtool config
```

### Navigation

| Touche | Action |
|--------|--------|
| `↑` `↓` | Naviguer dans les menus |
| `Enter` | Sélectionner une option |
| `Espace` | Sélection multiple (si applicable) |
| `Ctrl+C` | Retour/Annuler/Quitter |
| `Tab` | Auto-complétion (contextes spécifiques) |

---

## 🎯 Modules Disponibles

### 🐳 Docker Manager

Gestion complète de vos environnements Docker.

**Fonctionnalités:**
- Liste conteneurs et images
- Démarrage/arrêt de services Docker Compose
- Construction d'images
- Gestion des conteneurs (start, stop, pause, restart, remove)
- Consultation des logs en temps réel
- Statistiques et monitoring
- Nettoyage système Docker
- Docker Compose avancé avec scaling

**Commandes générées:**
```bash
docker ps -a
docker compose up -d --build
docker logs -f <container>
docker stats --no-stream
docker system prune -f
```

### 📦 Git Manager

Gestion de version avec Git et commits conventionnels.

**Fonctionnalités:**
- Status du dépôt
- Commits avec types conventionnels (feat, fix, docs, style, refactor, perf, test, chore)
- Gestion des branches (création, suppression, checkout, merge)
- Push/Pull
- Gestion des stashes
- Tags
- Visualisation graphique des commits
- Actions rapides (sync, cleanup, commit&push)

**Types de commits supportés:**
- ✨ `feat` - Nouvelle fonctionnalité
- 🐛 `fix` - Correction de bug
- 📚 `docs` - Documentation
- 🎨 `style` - Formatage
- ♻️ `refactor` - Refactorisation
- ⚡ `perf` - Performance
- ✅ `test` - Tests
- 🔧 `chore` - Maintenance

### 📦 NPM/Yarn/PNPM Manager

Gestion multi-gestionnaires de packages.

**Fonctionnalités:**
- Installation de packages (dev/prod)
- Mise à jour
- Désinstallation (local/global)
- Liste des dépendances
- Audit de sécurité
- Exécution de scripts package.json
- Initialisation de projets (React, Vue, TypeScript)
- Support NPM, Yarn et PNPM

### 💾 Database Manager

Support de multiples systèmes de bases de données.

**Bases de données:**
- 🐬 MySQL
- 🐘 PostgreSQL
- 📊 MongoDB
- 💎 Redis
- 🗄️ SQLite

**Opérations:**
- Démarrage/arrêt de services
- Connexion interactive
- Sauvegarde/restauration
- Affichage des bases de données
- Status des services

### 🌐 Network Tools

Suite complète d'outils réseau.

**Outils:**
- Test de connexion (ping)
- Informations réseau (ipconfig/ifconfig)
- Scan de ports (nmap)
- Statistiques réseau
- Test de vitesse Internet
- Vérification SSL/certificats
- Scan réseau local
- Table de routage

### 📊 System Monitoring

Surveillance système en temps réel.

**Métriques:**
- Dashboard temps réel (actualisation auto)
- Monitoring Docker
- Logs en temps réel (Docker, système, application)
- Métriques avancées (CPU, RAM, Disque, I/O)
- Système d'alertes (configurable)
- Load average
- Uptime système

### ⚙️ System Tools

Utilitaires système et gestion de fichiers.

**Fonctionnalités:**
- Informations système complètes
- Nettoyage (cache NPM, Docker, fichiers temporaires, node_modules)
- Gestion des processus (liste, recherche, kill, stats)
- Explorateur de fichiers interactif
- Monitoring temps réel
- Vérification permissions
- Test connexion Internet
- Espace disque

### 🔧 Custom Commands

Créez et gérez vos propres commandes personnalisées.

**Fonctionnalités:**
- Ajout de commandes
- Liste des commandes
- Exécution
- Suppression
- Sauvegarde automatique
- Description optionnelle

---

## ⚙️ Configuration

### Paramètres Disponibles

La configuration est sauvegardée automatiquement dans `~/.config/devtoolbox/config.json`.

```javascript
{
  "theme": "dark",                    // Thème visuel
  "animations": true,                 // Activer animations
  "logLevel": "info",                 // Niveau de log
  "autoUpdate": true,                 // Mises à jour auto
  "notifications": true,              // Notifications
  "shortcuts": {                      // Raccourcis clavier
    "quickExit": "Ctrl+Q",
    "refresh": "Ctrl+R",
    "search": "Ctrl+F"
  },
  "favorites": [],                    // Commandes favorites
  "historySize": 100                  // Taille historique
}
```

### Modifier la Configuration

```bash
# Via l'interface
devtool → 🎨 Personnalisation

# Ou programmatiquement
```

```javascript
import { setConfig, getConfig } from './src/config/settings.js';

// Modifier un paramètre
setConfig('theme', 'neon');

// Obtenir un paramètre
const theme = getConfig('theme');
```

### Sauvegarder/Restaurer

```bash
# Via l'interface
devtool → 🎨 Personnalisation → 💾 Sauvegarder configuration

# Les sauvegardes sont créées dans:
./devtoolbox-backups/config-YYYY-MM-DD-HH-MM-SS.json
```

---

## 🎨 Thèmes

DevToolbox Pro propose 5 thèmes personnalisables.

### Thèmes Disponibles

#### 1. **Dark** (Par défaut)
```
Primary:    #00ffff (Cyan)
Secondary:  #ff6b6b (Rouge corail)
Background: #0a0a0a (Noir profond)
```

#### 2. **Light**
```
Primary:    #007acc (Bleu)
Secondary:  #ff4081 (Rose)
Background: #ffffff (Blanc)
```

#### 3. **Neon**
```
Primary:    #00ff9d (Vert néon)
Secondary:  #ff00ff (Magenta)
Background: #000000 (Noir)
```

#### 4. **Sunset**
```
Primary:    #ff6b6b (Rouge corail)
Secondary:  #ffa726 (Orange)
Background: #2d3436 (Gris foncé)
```

#### 5. **Ocean**
```
Primary:    #00cec9 (Turquoise)
Secondary:  #6c5ce7 (Violet)
Background: #0c2461 (Bleu marine)
```

### Changer de Thème

```bash
# Via l'interface
devtool → 🎨 Personnalisation → 🎨 Changer le thème

# Sélectionner votre thème préféré
```

---

## 🔧 Commandes Personnalisées

### Créer une Commande

```bash
# Via l'interface
devtool → 🔧 Commandes personnalisées → ➕ Ajouter une commande

# Exemples:
Nom:         deploy
Commande:    npm run build && npm run deploy
Description: Déploiement production

Nom:         backup-db
Commande:    docker exec mysql mysqldump -u root -p mydb > backup.sql
Description: Sauvegarde base de données
```

### Format JSON

Les commandes sont sauvegardées dans `custom-commands.json`:

```json
{
  "deploy": {
    "command": "npm run build && npm run deploy",
    "description": "Déploiement production"
  },
  "backup-db": {
    "command": "docker exec mysql mysqldump -u root -p mydb > backup.sql",
    "description": "Sauvegarde base de données"
  },
  "clean-all": {
    "command": "docker system prune -f && npm cache clean --force",
    "description": "Nettoyage complet système"
  }
}
```

### Exécuter une Commande

```bash
# Via l'interface
devtool → 🔧 Commandes personnalisées → ▶️  Exécuter une commande

# Sélectionner la commande à exécuter
```

---

## 📊 Exemples d'Utilisation

### Scénario 1: Démarrer un Projet

```bash
# 1. Lancer DevToolbox
devtool

# 2. Démarrer Docker
→ 🐳 Docker
→ 🚀 Démarrer les services
→ Sélectionner options: -d (détaché)

# 3. Installer dépendances NPM
→ Retour
→ 📦 NPM/Yarn
→ 📦 Installer dépendances

# 4. Vérifier Git status
→ Retour
→ 📦 Git
→ 📊 Status du dépôt
```

### Scénario 2: Debugging

```bash
# 1. Consulter logs Docker
devtool → 🐳 Docker → 📝 Logs conteneur → Sélectionner conteneur

# 2. Monitoring système
devtool → 📊 Monitoring → 📈 Dashboard système

# 3. Vérifier processus
devtool → ⚙️  Système → 📦 Gestion des processus → 🔍 Rechercher
```

### Scénario 3: Déploiement

```bash
# 1. Créer une commande de déploiement
devtool → 🔧 Commandes personnalisées → ➕ Ajouter
  Nom: deploy
  Commande: git pull && npm install && npm run build && pm2 restart app

# 2. Exécuter
devtool → 🔧 Commandes personnalisées → ▶️  Exécuter → deploy
```

### Scénario 4: Maintenance Quotidienne

```bash
# Mode rapide pour maintenance
devtool quick

→ 🔄 Mettre à jour tous les packages
→ 🧹 Nettoyer le système
→ 📊 Status système complet
```

### Scénario 5: Gestion Base de Données

```bash
# 1. Démarrer MySQL
devtool → 💾 Bases de données → 🐬 MySQL → 🚀 Démarrer le service

# 2. Connexion
→ 🔌 Se connecter

# 3. Sauvegarde
→ 💾 Sauvegarder
```

---

## 🛠️ Développement

### Structure du Projet

```
devtoolbox-pro/
├── index.js                    # Point d'entrée
├── package.json
├── README.md
├── LICENSE
├── .gitignore
├── src/
│   ├── commands/              # Système de commandes
│   │   ├── custom.js
│   │   ├── executor.js
│   │   └── run.js
│   ├── config/                # Configuration
│   │   ├── settings.js
│   │   ├── shortcuts.js
│   │   └── themes.js
│   ├── lib/                   # Bibliothèques
│   │   ├── ui.js
│   │   ├── logger.js
│   │   └── animator.js
│   ├── modules/               # Modules fonctionnels
│   │   ├── main.js
│   │   ├── docker.js
│   │   ├── git.js
│   │   ├── npm.js
│   │   ├── database.js
│   │   ├── network.js
│   │   ├── monitoring.js
│   │   ├── system.js
│   │   └── settings.js
│   └── utils/                 # Utilitaires
│       ├── helpers.js
│       └── validators.js
└── custom-commands.json       # Commandes personnalisées
```

### Ajouter un Module

1. **Créer le fichier** dans `src/modules/mon-module.js`:

```javascript
import prompts from 'prompts';
import { runCommand } from '../commands/executor.js';
import { UI } from '../lib/ui.js';

export async function monModule() {
  while (true) {
    UI.header('🎯 Mon Module');

    const response = await prompts({
      type: 'select',
      name: 'action',
      message: 'Actions:',
      choices: [
        { title: '📋 Action 1', value: 'action1' },
        { title: '⬅️ Retour', value: 'back' }
      ]
    });

    if (!response.action || response.action === 'back') break;
    await handleAction(response.action);
  }
}

async function handleAction(action) {
  switch (action) {
    case 'action1':
      await runCommand('ma-commande', 'Description');
      break;
  }
}
```

2. **Intégrer au menu principal** dans `src/modules/main.js`:

```javascript
import { monModule } from './mon-module.js';

// Ajouter dans choices:
{ title: '🎯 Mon Module', value: 'mon-module' }

// Ajouter dans switch:
case 'mon-module':
  await monModule();
  break;
```

### Scripts NPM

```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest",
    "lint": "eslint src/",
    "format": "prettier --write src/"
  }
}
```

### Dépendances

```json
{
  "dependencies": {
    "chalk": "^5.3.0",
    "chalk-animation": "^2.0.3",
    "prompts": "^2.4.2",
    "execa": "^6.1.0",
    "boxen": "^7.1.1",
    "figlet": "^1.6.0",
    "gradient-string": "^2.0.2",
    "nanospinner": "^1.1.0",
    "commander": "^10.0.1",
    "conf": "^11.0.2",
    "cli-table3": "^0.6.3",
    "ora": "^6.3.1",
    "date-fns": "^2.30.0"
  },
  "devDependencies": {
    "eslint": "^8.45.0",
    "prettier": "^3.0.0",
    "nodemon": "^3.0.1",
    "jest": "^29.6.1"
  }
}
```

### Tests

```bash
# Exécuter les tests
npm test

# Avec coverage
npm test -- --coverage
```

### Linting & Formatting

```bash
# Linter
npm run lint

# Formatter
npm run format
```

---

## 🤝 Contribution

Les contributions sont les bienvenues ! Voici comment contribuer:

### Process de Contribution

1. **Fork** le projet
2. **Créer** une branche (`git checkout -b feature/amazing-feature`)
3. **Commit** vos changements (`git commit -m 'feat: add amazing feature'`)
4. **Push** vers la branche (`git push origin feature/amazing-feature`)
5. **Ouvrir** une Pull Request

### Guidelines

#### Commits

Utilisez les commits conventionnels:
- `feat:` - Nouvelle fonctionnalité
- `fix:` - Correction de bug
- `docs:` - Documentation
- `style:` - Formatage
- `refactor:` - Refactorisation
- `test:` - Tests
- `chore:` - Maintenance

Exemples:
```bash
git commit -m "feat: add PostgreSQL support"
git commit -m "fix: resolve Docker connection issue"
git commit -m "docs: update installation instructions"
```

#### Code Style

- Utiliser ESLint et Prettier
- 2 espaces pour indentation
- Pas de point-virgule
- Quotes simples pour strings
- Trailing commas

#### Tests

- Ajouter des tests pour nouvelles fonctionnalités
- Vérifier que tous les tests passent
- Viser 80%+ de coverage

#### Documentation

- Documenter les nouvelles fonctionnalités
- Mettre à jour le README si nécessaire
- Ajouter des exemples d'utilisation

### Signaler un Bug

Créez une issue avec:
- Description claire du bug
- Étapes pour reproduire
- Comportement attendu vs actuel
- Screenshots si applicable
- Environnement (OS, Node version)

### Proposer une Fonctionnalité

Créez une issue avec:
- Description de la fonctionnalité
- Cas d'utilisation
- Mockups/exemples si applicable
- Bénéfices attendus

---

## 📝 Changelog

### [2.0.0] - 2024-02-01

#### Ajouté
- ✨ Interface interactive complète
- ✨ Module Docker avec Docker Compose
- ✨ Module Git avec commits conventionnels
- ✨ Support multi-gestionnaires NPM/Yarn/PNPM
- ✨ Module Database (MySQL, PostgreSQL, MongoDB, Redis, SQLite)
- ✨ Outils réseau avancés
- ✨ Monitoring système temps réel
- ✨ 5 thèmes personnalisables
- ✨ Système de commandes personnalisées
- ✨ Logging multi-niveaux
- ✨ Mode rapide
- ✨ Explorateur de fichiers

#### Modifié
- 🔄 Architecture modulaire
- 🔄 Meilleure gestion d'erreurs
- 🔄 UI optimisée

#### Corrigé
- 🐛 Compatibilité Windows
- 🐛 Gestion de Ctrl+C

### [1.0.0] - 2024-01-01

#### Ajouté
- 🎉 Version initiale
- ✨ Modules de base
- ✨ Interface CLI

---

## 📄 License

Ce projet est sous licence **MIT**.

```
MIT License

Copyright (c) 2024 DevToolbox Pro

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## 👥 Auteurs

**DevToolbox Pro Team**

- 💻 Développement principal
- 🎨 Design & UX
- 📖 Documentation

---

## 🙏 Remerciements

Merci à tous les contributeurs et à la communauté open-source pour:

- [Node.js](https://nodejs.org/)
- [Chalk](https://github.com/chalk/chalk)
- [Prompts](https://github.com/terkelg/prompts)
- [Execa](https://github.com/sindresorhus/execa)
- [Boxen](https://github.com/sindresorhus/boxen)
- [Commander.js](https://github.com/tj/commander.js)
- Tous les autres packages utilisés

---

## 📞 Support

### Documentation

- 📚 [Documentation complète](DOCUMENTATION.md)
- 🎓 [Guide de démarrage](docs/getting-started.md)
- 🔧 [Guide de développement](docs/development.md)

### Community

- 💬 [Discussions GitHub](https://github.com/votreusername/devtoolbox-pro/discussions)
- 🐛 [Issues](https://github.com/votreusername/devtoolbox-pro/issues)
- ⭐ [Releases](https://github.com/votreusername/devtoolbox-pro/releases)

### Contact

- 📧 Email: support@devtoolbox.dev
- 🐦 Twitter: [@devtoolboxpro](https://twitter.com/devtoolboxpro)
- 💼 LinkedIn: [DevToolbox Pro](https://linkedin.com/company/devtoolbox)

---

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=votreusername/devtoolbox-pro&type=Date)](https://star-history.com/#votreusername/devtoolbox-pro&Date)

---

## 📊 Statistiques

![Alt](https://repobeats.axiom.co/api/embed/your-repo-id.svg "Repobeats analytics image")

---

<p align="center">
  <strong>Fait avec ❤️ par la communauté DevToolbox Pro</strong>
</p>

<p align="center">
  <a href="#-table-des-matières">Retour en haut ⬆️</a>
</p>
