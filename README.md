# cours-02-github-flow-api

API NestJS minimaliste — support du TP cours-02.

Ce dépôt est divisé en deux parties pédagogiques distinctes :

| Répertoire | Contenu |
|---|---|
| `docker-practice/` | **Partie 1 — Docker** : exercice indépendant sur les commandes de base |
| `src/`, `prisma/`, etc. | **Partie 2 — GitHub Flow** : API NestJS à faire évoluer |

---

## Prérequis et démarrage

### Démarrage recommandé — DevContainer

**Prérequis** : [VS Code](https://code.visualstudio.com/) + [Docker Desktop](https://www.docker.com/products/docker-desktop/) + extension [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

1. Forker le dépôt, puis cloner votre fork :
   ```bash
   git clone <url-du-fork>
   cd cours-02-github-flow-api
   ```

2. Ouvrir le dossier dans VS Code et accepter "Reopen in Container" — ou utiliser la palette de commandes : `Dev Containers: Reopen in Container`.

3. Attendre l'initialisation. La première ouverture peut prendre environ deux minutes.

4. Exécuter les commandes du TP dans le terminal du DevContainer.

### Démarrage manuel

Le DevContainer est le mode attendu pour ce TP. Le démarrage manuel n'est utile qu'en dépannage.

**Prérequis** : Node.js 24, PostgreSQL 18

1. Copier et renseigner les variables d'environnement :
   ```bash
   cp .env.example .env
   # Éditer .env : renseigner DATABASE_URL
   ```

2. Installer les dépendances :
   ```bash
   npm install
   ```

3. Appliquer les migrations :
   ```bash
   npx prisma migrate dev --name init
   ```

4. Lancer l'application :
   ```bash
   npm run start:dev
   ```

---

## Partie 1 — Docker pratique

> Voir [`docker-practice/README.md`](docker-practice/README.md) pour les instructions complètes.

Cette partie se fait dans le DevContainer, sur une branche dédiée :

```bash
git checkout main
git pull
git checkout -b feature/docker-practice
```

Tu vas écrire un Dockerfile minimaliste, construire une image, lancer un conteneur, puis faire le nettoyage.

---

## Partie 2 — GitHub Flow

### Objectif

Implémenter la fonctionnalité manquante `GET /tasks?done=true` et `GET /tasks?done=false` en suivant le GitHub Flow.

Le query param `done` est obligatoire pour cet exercice. C'est un booléen transmis sous forme de chaîne dans l'URL :

- `done=true` retourne uniquement les tâches terminées ;
- `done=false` retourne uniquement les tâches non terminées.

### Flux attendu

1. Revenir sur `main` et récupérer la dernière version.
2. Créer une branche `feature/add-task-filter` depuis `main`.
3. Implémenter le filtrage booléen dans `TasksService` et `TasksController`.
4. Adapter les tests existants.
5. Vérifier que les tests passent avec `npm test`.
6. Committer avec un message Conventional Commits.
7. Pousser la branche et ouvrir une Pull Request.
8. Traiter les retours de relecture.
9. Fusionner la Pull Request dans `main`.
10. Vérifier que `main` reste fonctionnelle après la fusion.
11. Préparer le passage en `1.0.0` sur `main` :
    - mettre à jour `package.json` et `package-lock.json` de `0.0.1` vers `1.0.0` ;
    - créer ou mettre à jour `CHANGELOG.md` avec les changements livrés ;
    - committer ces fichiers avec le message `chore(release): bump project to version to 1.0.0`.
12. Depuis l'interface web GitHub, créer une release manuelle en renseignant le tag `v1.0.0` basé sur ce commit de release, avec un titre et des notes de version. GitHub créera le tag au moment de publier la release.

---

## Contexte des Pull Requests en TP

Par défaut, la Pull Request est ouverte **dans ton fork** : la branche `feature/add-task-filter` est proposée vers `main` de ton dépôt forké.

Si l'enseignant le demande explicitement, la Pull Request peut être ouverte vers le dépôt central `GVI2026/tp-github-flow`. Sans droit d'écriture ou sans accès GitHub disponible, le même raisonnement peut être simulé localement en comparant la branche de feature avec `main`, puis en expliquant le merge attendu.

---

## Routes disponibles

| Méthode | Route | Description |
|---|---|---|
| `POST` | `/tasks` | Créer une tâche |
| `GET` | `/tasks` | Lister toutes les tâches |
| `GET` | `/tasks/:id` | Récupérer une tâche |
| `PATCH` | `/tasks/:id` | Mettre à jour une tâche |
| `DELETE` | `/tasks/:id` | Supprimer une tâche |
| `GET` | `/tasks?done=true` | ⚠️ **À implémenter** — filtrer les tâches terminées |
| `GET` | `/tasks?done=false` | ⚠️ **À implémenter** — filtrer les tâches non terminées |

Swagger est disponible sur [http://localhost:3000/api](http://localhost:3000/api) après lancement de l'application :

```bash
npm run start:dev
```

---

## Tests

```bash
npm test
```

---

## Pour les plus rapides

Une fois la Partie 2 terminée, tu peux implémenter la **pagination** sur `GET /tasks` via les query params `?page=` et `?limit=`.

Exemple : `GET /tasks?page=1&limit=10`

Même démarche : nouvelle branche `feature/add-pagination`, Pull Request, merge, puis release manuelle si l'enseignant le demande.
