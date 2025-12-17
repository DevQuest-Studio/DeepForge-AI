# DeepForge AI

**Stormworks Code & Vehicle Intelligence**  
Desktop web app • Free-first • Community-oriented

---

## 🚀 Vision

DeepForge AI est une plateforme **publique et gratuite** qui aide les joueurs de **Stormworks: Build and Rescue** à concevoir et optimiser :

- Véhicules (XML)
- Microcontrôleurs (XML)
- Code Lua pour écrans tactiles

L’objectif : augmenter l’ingénierie sans remplacer la créativité humaine.

---

## ⚙️ Fonctionnalités principales

### 1. Génération intelligente
- **Véhicules Stormworks** : structures complètes, propulsion, énergie, navigation
- **Microcontrôleurs** : logique compacte et capteurs
- **Lua Touchscreen** : UI interactive, optimisée pour onTick/onDraw *(4 tickets)*

### 2. Chat intelligent
- Mode discussion ou mode build
- Conserve le contexte
- Résumé automatique
- Explications sur demande

### 3. Thinking / Reasoning preview
- Affiche la stratégie et les contraintes
- Pas de chain-of-thought brute
- Aide l’utilisateur à comprendre le plan de l’IA

### 4. Mémoire utilisateur
- Préférences de style, complexité et types de projets
- Utilisée automatiquement pour guider les réponses

### 5. Mémoire projet
- Historique des versions
- Fichiers utilisés
- Contraintes définies
- Permet la continuité intelligente

### 6. Apprentissage par fichiers
- Analyse des fichiers XML ou Lua fournis
- Extrait des patterns
- Utilisé comme **contexte temporaire**
- Pas de stockage global, pas d’entraînement réel

---

## 💳 Système de tickets

| Type de tâche                | Coût |
|-------------------------------|------|
| Lua Touchscreen              | 4    |
| Microcontrôleur XML          | 6    |
| Véhicule XML                 | 10   |
| Petites modifications        | 2    |

- 1000 tickets par mois
- Limite journalière pour éviter l’abus
- Reset automatique

---

## 🤖 Modèles IA

| Rôle        | Modèle                                 | Usage principal                              |
|------------|----------------------------------------|---------------------------------------------|
| Primaire   | Qwen3-Coder-480B-A35B-Instruct         | Génération finale : XML & Lua              |
| Secondaire | Qwen2.5-7B-Instruct                     | Raisonnement, planning, chat, preview       |
| Fallback   | Qwen3-4B-Thinking-2507                  | Continuity & safe reasoning                 |

---

## 🖥️ UI & UX

- Sidebar : projets & outils
- Zone centrale : prompt & options
- Panneau droit : thinking preview & output
- Thème sombre technique
- Typographie nette et grilles subtiles
- Animations discrètes et professionnelles

### Accessibilité
- SVG inline avec labels
- Navigation clavier
- Contraste élevé
- Zones cliquables larges

---

## 🔒 Admin (statistiques seulement)

- Visualisation d’usage et performance
- Suivi modèles et taux d’erreurs
- Aucun accès aux projets privés des utilisateurs

---

## 🛠️ Stack technique

- **Frontend** : Next.js + TypeScript + Tailwind + Radix UI
- **Backend / API** : Vercel Serverless Functions
- **Auth** : Firebase Authentication (Google)
- **Database** : Firestore
- **AI** : Hugging Face Inference
- 100% gratuit et sans PHP

---

## 🖼️ Logo

SVG inclus dans `/public/logo.svg`  
Triangle = ingénierie, Node = intelligence, Bar = logique, Base sombre = outil professionnel

---

## ⚡ Comment utiliser

1. Se connecter avec Google
2. Créer ou ouvrir un projet
3. Choisir un type de génération (Véhicule, Microcontrôleur, Lua Touchscreen)
4. Entrer les contraintes ou utiliser un fichier template
5. Lancer la génération et voir le **thinking preview**
6. Copier ou télécharger le code XML/Lua

---

## 📂 Structure du projet (exemple)
```yaml
/deepforge-ai
│
├─ /pages
│ ├─ index.tsx
│ ├─ dashboard.tsx
│ └─ api/ai.ts
│
├─ /components
│ ├─ Sidebar.tsx
│ ├─ OutputPanel.tsx
│ └─ ThinkingPreview.tsx
│
├─ /lib
│ └─ aiRouter.ts
│
├─ /public
│ └─ logo.svg
│
├─ /styles
│ └─ globals.css
│
├─ next.config.js
├─ package.json
└─ README.md
```


---

## 🌟 Prochaines étapes

1. Définir **Firestore schema** pour tickets, mémoire et projets
2. Créer les **prompts “gold standard”** pour XML et Lua
3. Développer le **middleware tickets + mémoire**
4. Construire l’**API `/ai`** pour Vercel
5. UI wireframe complet
6. Beta test public

---

## License

Open-source, gratuit pour tous les utilisateurs, utilisation commerciale et personnelle autorisée.

---

