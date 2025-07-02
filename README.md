# Kinogroove 🎵

Bonjour la team Kinoba 👋, voici l'exercice technique demandé !

Pour le tester voici les quelques besoins après clone du projet :

## Lancer l'API rails

### 1 - Le fichier .env

Un fichier .env est nécessaire pour la secret key utilisée par Devise en mode JWT.

Pour illustrer les bonnes pratiques de sécurité habituelles, je n'ai pas inclus ce fichier sur le repo mais il vous suffit de copier cette ligne dans un fichier `.env` que vous aurez créé à la racine du dossier `backend` :

```
DEVISE_JWT_SECRET_KEY=LaCleDeVotreChoix
```

Dans ce cas de figure tout fonctionne en local avec une db qui sera crée pour l'occasion, la secret key a peu d'importance tant qu'elle reste la même sur votre poste.
En production il faudrait évidemment une secret key valide qui serait partagée de manière sécurisée.

### 2 - Préparer la db PostgreSQL et lancer l'API

Une petite série de commandes à lancer en CLI à la racine du dossier `backend` :

`bin/rails db:create`

`bin/rails db:migrate`

`bin/rails db:seed`

`bin/rails s`

L'API est prête à être utilisée 🎉!

## Le front-end

### 1 - Le fichier .env.development

Comme pour l'API Rails, le fichier `.env.development` n'est pas fourni non plus pour illustrer les bonnes pratiques.

Il suffit de créer un fichier `.env.development` à la racine du dossier `frontend` et d'y copier la ligne suivante :

```
VITE_API_URL=http://localhost:3000/api/v1
```

#### 2 - Installer les packages et l'ancer l'application

Pnpm est le package manager utilisé pour ce projet, pour le lancer il suffit d'aller à la racine du dossier `frontend` et de lancer les commandes suivantes :

`pnpm i`

`pnpm dev`

L'appli front est lancée et tout est prêt à être testé 🎉!

Il vous suffit alors de vous rendre sur [http://127.0.0.1:5173/](http://127.0.0.1:5173/) et de vous créer un compte.

## Pistes d'améliorations

Ce projet étant un POC mis en place dans un temps court, voici quelques pistes d'améliorations que j'envisagerais si je continue à travailler dessus :

- Faire le front avec Vue. Le front est découplé du back et remplacer l'application React par une application Vue n'a pas d'impact sur le back. Pour des contraintes de temps et afin de prioriser l'API Rails je me suis orienté sur React. L'apprentissage de Vue aurait trop joué sur le temps alloué au back-end, qui était priorisé par le sujet.

- Mettre en place Typescript pour pouvoir typer la partie front.

- Améliorer la sécurité en ne stockant pas les JWT dans le local storage pour se protéger des attaques XSS. C'est une solution viable pour un POC en local mais déconseillée en production.
