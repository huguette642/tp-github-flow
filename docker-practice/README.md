# Partie 1 — Pratique Docker

> **Durée estimée : 25 min**  
> Cette partie est indépendante du reste du projet. Elle se fait entièrement dans ce répertoire `docker-practice/`, depuis le DevContainer du dépôt.

---

## Contexte

Le fichier `index.js` est un serveur HTTP minimaliste en Node.js pur (aucune dépendance). Il répond `Hello depuis Docker !` sur le port 3001.

Ton travail : écrire un `Dockerfile` pour le conteneuriser, puis manipuler les commandes fondamentales de Docker.

Avant de modifier le Dockerfile, ouvre le dépôt dans son DevContainer et crée une branche dédiée :

```bash
git checkout main
git pull
git checkout -b feature/docker-practice
```

Toutes les commandes Docker de cette partie doivent être exécutées dans le terminal du DevContainer.

---

## Étapes

### 1 — Observer le code

Ouvre `index.js` et lis-le. Comprends ce qu'il fait avant de continuer.

---

### 2 — Écrire le Dockerfile

Ouvre `Dockerfile`. Il contient des commentaires qui guident chaque section.  
Complète-le en utilisant :

- `FROM` — image parente
- `WORKDIR` — répertoire de travail dans le conteneur
- `COPY` — copier les fichiers nécessaires
- `EXPOSE` — port à exposer
- `CMD` — commande de démarrage

---

### 3 — Construire l'image

```bash
docker build -t hello-docker .
```

---

### 4 — Vérifier que l'image existe localement

```bash
docker image ls
```

---

### 5 — Lancer un conteneur

```bash
docker run -p 3001:3001 hello-docker
```

---

### 6 — Vérifier que l'application répond

Dans un autre terminal (ou via le navigateur) :

```bash
curl http://localhost:3001
```

Tu dois obtenir : `Hello depuis Docker !`

---

### 7 — Arrêter le conteneur

Dans un autre terminal, trouve l'ID du conteneur en cours d'exécution :

```bash
docker ps
```

Puis arrête-le :

```bash
docker stop <id>
```

---

### 8 — Vérifier que le conteneur n'est plus actif

```bash
docker ps
```

---

### 9 — Supprimer le conteneur

```bash
docker rm <id>
```

---

### 10 — Supprimer l'image locale

```bash
docker rmi hello-docker
```

---

### 11 — Vérifier le nettoyage

```bash
docker image ls
```

L'image `hello-docker` ne doit plus apparaître.

---

### 12 — Committer le travail Docker

```bash
git add Dockerfile
git commit -m "chore: complete docker practice"
```

---

## Exercices optionnels rapides

Ces manipulations prennent quelques minutes chacune et complètent le cycle de base.

Si les étapes de nettoyage ont déjà été effectuées, reconstruis d'abord l'image :

```bash
docker build -t hello-docker .
```

### Lire les logs du conteneur

Relance le conteneur en arrière-plan, puis affiche sa sortie standard :

```bash
docker run -d -p 3001:3001 --name hello-container hello-docker
docker logs hello-container
```

### Exécuter une commande dans le conteneur

Entre dans le conteneur actif pour observer son système de fichiers :

```bash
docker exec -it hello-container sh
pwd
ls
exit
```

Avant l'exercice suivant, libère le nom du conteneur et le port exposé :

```bash
docker rm -f hello-container
```

### Passer une variable d'environnement

Lance un conteneur avec une variable, puis vérifie qu'elle existe dans l'environnement :

```bash
docker run -d -p 3002:3001 --name hello-env -e MESSAGE="Bonjour Docker" hello-docker
docker exec hello-env printenv MESSAGE
```

### Observer un multi-stage très simple

Remplace temporairement le Dockerfile par cette structure pour distinguer une étape de préparation et une étape finale légère :

```Dockerfile
FROM node:24-alpine AS base
WORKDIR /app
COPY index.js .

FROM node:24-alpine
WORKDIR /app
COPY --from=base /app/index.js .
EXPOSE 3001
CMD ["node", "index.js"]
```

Reconstruis ensuite l'image avec `docker build -t hello-docker .`.

---

## Ce que tu dois être capable d'expliquer à la fin

- Quelle est la différence entre une **image** et un **conteneur** ?
- Que fait la ligne `FROM` dans un Dockerfile ?
- Pourquoi utilise-t-on `-p 3001:3001` dans `docker run` ?
- Quel est l'ordre correct : `build` → `run` → `stop` → `rm` → `rmi` ?
