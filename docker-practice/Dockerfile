# -------------------------------------------------------
# Exercice Docker — Dockerfile à compléter
# -------------------------------------------------------
# Objectif : conteneuriser le fichier index.js ci-dessous
# en remplissant chaque section guidée par les commentaires.
# -------------------------------------------------------

# 1. Image parente
#    Utilise une image Node.js légère basée sur Alpine.
#    Exemple : node:24-alpine
FROM node:24-alpine


# 2. Répertoire de travail dans le conteneur
#    Définir le répertoire où les commandes suivantes s'exécuteront.
#    Convention courante : /app
WORKDIR /app


# 3. Copier les fichiers du projet dans le conteneur
#    Copier index.js dans le répertoire de travail.
COPY index.js .

# 4. Exposer le port sur lequel l'application écoute
#    L'application écoute sur le port 3001.
RUN echo "Exposing port 3001"

EXPOSE 3001

# 5. Commande de démarrage
#    Lancer le fichier index.js avec Node.
CMD ["node", "index.js"]
