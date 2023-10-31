# README - Documentation du Backend

## Introduction

Ce référentiel contient le code backend d'une application web. Le backend est construit avec Node.js et Express, et il interagit avec la base de données Supabase. Le but de ce document est de fournir un aperçu de la structure du projet et des dépendances, ainsi que de guider les développeurs sur la configuration et l'exécution du backend.

## Structure du Projet

La structure du projet est la suivante :

- **`server.js`**: Le point d'entrée principal de l'application. Il crée un serveur HTTP et écoute sur le port spécifié.
- **`app.js`**: Définit l'application Express, y compris la configuration des middlewares et les points d'accès API.
- **`package.json`**: Contient des métadonnées sur le projet et répertorie les dépendances.

## Dépendances

Le backend dépend des packages npm suivants :

- **`@supabase/supabase-js`**: Une bibliothèque cliente JavaScript pour Supabase.
- **`body-parser`**: Middleware pour gérer les requêtes HTTP POST.
- **`morgan`**: Middleware d'enregistrement des requêtes HTTP.

Ces dépendances sont spécifiées dans le fichier `package.json`.

## Installation

Pour installer les dépendances requises, exécutez la commande suivante dans le répertoire du projet :

```bash
npm install
```

## Configuration

### Importation 

Pour acceder aux differentes dépendances il faut les importer dans le app.js :
```javascript
import express from 'express';
import {createClient} from '@supabase/supabase-js'
import morgan from 'morgan'
import bodyParser from "body-parser";
```

Et ensuite définir les constantes pour simplifier leurs utilisations : 
```javascript
const app = express();

app.use(morgan('combined'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
```

### Clef API Supabase 

Pour interagir avec Supabase, vous devez fournir votre clé API Supabase. Remplacez la valeur fictive dans app.js par votre clé API réelle :

```javascript
const supabase = createClient({
  apiKey: 'VOTRE_CLÉ_API_SUPABASE',
  project: 'VOTRE_PROJET_SUPABASE',
});
```
### Configuration du Port

Le serveur backend écoute par défaut sur le port 3000. Vous pouvez modifier le port en modifiant la ligne suivante dans server.js :

```javascript
app.set('port', process.env.PORT || 3000);
```

### Exécution du Backend

Pour démarrer le serveur backend, exécutez la commande suivante :

```bash
npm start
```

Le serveur démarrera, et vous pourrez accéder à l'API à l'adresse http://localhost:3000.

## Points d'accès API

  - POST /api/stuff: Créer un objet.
  - GET /api/stuff: Récupérer une liste d'objets.
Exemple :
```javascript
app.get('/api/stuff', async (req, res) => {
    const {data, error} = await supabase
        .from('item')
        .select()
    res.send(data);
});

app.post('/api/stuff', async (req, res) => {
    const {error} = await supabase
        .from('item')
        .insert({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
        })
    if (error) {
        res.send(error);
    }
    res.send("created!!");
});
```
