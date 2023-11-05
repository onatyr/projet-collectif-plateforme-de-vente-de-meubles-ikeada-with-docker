# Documentation Front-end du Projet

## Introduction
La documentation front-end de ce projet vous guidera à travers les étapes nécessaires pour développer une application web en utilisant la stack technologique suivante : React avec Vite comme serveur de développement, Bootstrap pour les styles et React Router pour la navigation.

### Prérequis
Avant de commencer à travailler sur le projet, assurez-vous d'avoir installé Node.js sur votre machine. Vous pouvez le télécharger à partir du site officiel : Node.js.

### Installation
Installez les dépendances du projet en utilisant npm :

```bash
npm install
```
### Dependances
- Vite -> outil de déploiement/transpilateur/gestion du serveur de dev

- React, Javascript ES6

- React-Bootstrap -> version de bootstrap adaptée à React, on importe directement dans chaque composant

```jsx
import {Navbar} from 'react-bootstrap'

function monComposant() {
    return(
        <>
            <Navbar />
        </>)
    }

```

- Prop-Types -> outil de verification de type des props, c'est pas aussi efficace que TypeScript mais c'est beaucoup plus simple à mettre en place

```jsx
import { PropTypes } from 'prop-types'

function MonComposant(prop) {

}

MonComposant.propTypes = {
  prop: PropTypes.string
}

```

- Mob X -> outil de gestion des States et de création de Stores (on explique en détail plus bas)

- React-router : outil de gestion de la navigation. On en parle tout de suite.


### Exécution de l'Application
Pour exécuter l'application, utilisez Vite, un serveur de développement rapide pour React. Vous pouvez lancer l'application avec la commande suivante :

```bash
npm run dev
```
L'application sera accessible à l'adresse http://localhost:3006 dans votre navigateur.

## Structure du Projet
La structure du projet est la suivante :

```css
Ikeada/
  ├── src/
  │    ├── auth/
  │    │    ├── ...
  │    ├── providers/
  │    │    ├── ...
  │    ├── stores/
  │    │    ├── ...
  │    ├── atoms/
  │    │    ├── DeleteButton.jsx  
  │    │    ├── ...
  │    ├── components/
  │    │    ├── CardList.jsx
  │    │    ├── NavBar.jsx
  │    │    ├── ProductCard.jsx
  │    │    ├── ...
  │    ├── routes/
  │    │    ├── Layout.jsx
  │    │    ├── Login.jsx 
  │    │    ├── ProductPage.jsx
  │    │    ├── ...
  │    ├── App.jsx
  │    └── main.jsx
  └── index.html
```
- Le dossier auth contient ce qui permet l'authentification d'un utilisateur

- Le dossier providers contient des classes chargées d'effectuer des requêtes API

- Le dossier stores contient des stores, qui servent à stocker les données 
globales de l'application

- Le dossier atoms contient les petits composants réutilisables

- Le dossier components contient les composants complexes

- Le dossier src contient tous les fichiers source de l'application, y compris les composants.

- Le fichier App.jsx est le composant principal de l'application où les routes sont configurées.

- Le fichier main.js fait la connexion entre l'application React et Node.js/Vite, afin de déployer l'application sur le serveur local par ex.

## Routing

La navigation entre les différentes pages est gérée par un HASH ROUTER appelé aux niveau de main.js, et configuré dans App.jsx grâce à des <Routes>.

Il permet de créer des chemins associés à une URL et de charger les fichiers .jsx correspondants lors de la navigation :

- pour "/" (la racine), on charge la barre de navigation <NavBar>. Elle ne sera pas rechargée quand on change de page.

- quand l'utilisateur navigue vers une page, le routeur regarde quel fichier correspond à la sous-route ("/accueil" => <CardList />) et injecte le code au point d'injection spécifié avec <Outlet/> .

Cela permet de naviguer d'une page à l'autre, avec des url différentes, alors qu'en réalité on charge des composants.

### Routes protégées

Le routeur permet de contrôler l'accès à certaines routes, comme le back-office :

On a créé un composant <ProtectedRoute /> qui vérifie si l'utilisateur est connecté et redirige vers <BackOffice /> seulement si c'est le cas.

## Les composants

React gère l'affichage en insérant ou retirant des composants du DOM. Plus vous allez avoir de composants, plus ses opérations sont précises : si seul un élément dans une liste dois changer, pas besoin de recharger toute la liste.

Pour éviter les problèmes de re-rendu intempestif, les erreurs "undefined", un débuggage complexe et une répétition du code, il ne faut pas hésiter à découper votre code le plus possible.

Ici on a choisi l'architecture suivante :

- Le layout : ce sont les éléments permanents de l'application, ici la barre de navigation, et le container vide qui accueille le contenu

- Des vues : correspondent à ce qu'on veut afficher, et en général à une route si on ignore la route Layout qui est commune à toutes les vues. Le composant "vue" ne doit idéalement construire lui-même que ce qui ne change jamais, et charger le reste.

- Des composants : Représentent des éléments complexes de la vue, par exemple une carte produit, un formulaire, un tableau d'items.

- Des "atomes" : Des éléments susceptible d'être utilisés plusieurs fois dans un même composant, ou par plusieurs composants différents, par exemple un bouton "supprimer"

Ca n'est pas grave, bien au contraire, si votre composant fait deux lignes :

```jsx
export default function DeleteButton() {
    function deleteItem({ id }) {
        itemsStore.delItem(id)
    }
    return (
        <>
            <Button variant="transparent" onClick={deleteItem}>
                <TrashFill size={25} className="text-danger"></TrashFill>
            </Button>
        </>)
}
```

## States & Stores

Le state, c'est les données du front de l'application à un moment précis. Ca peux être un champs de formulaire, une liste de résultats de recherche à afficher, l'état d'une barre d'outil (minimisée/étendue)...

```jsx
import { useState } from 'react'

function monComposant() {
    // au début y'a rien
    const [email, setEmail] = useState('')
    return(
        <>
            <Form>
                <Form.Control
                    type='email' 
                    value={email}
                    // c'est là qu'on envoie dans email ce que l'utilisateur tape
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Form>
        </>
    )
}
```

Dans React, le state est lié aux composants. Pour avoir des states plus globaux qui permettent de garder et actualiser des réponses de requêtes API, des données de session, c'est plus compliqué.

### MobX

MobX permet de créer des states partagés pour toute l'application, de les centraliser.

On crée un Store sous la forme d'une classe, qui va contenir le state et définir des actions, c'est à dire des méthodes pour faire des trucs sur ou avec le state.

```jsx

import unAutreTruc from './quelquepart/unAutreTruc'
class MonStore {
    données = [] // on précise ce qu'on attends avec une var vide
    constructor(truc) {
        makeObservable(this,
        {
            données: observable, // "donnée" sera observable dans toute l'application
            modifier: action // "modifier" agit sur le state
        })
        this.truc = truc
    }
    modifier(nouvDonnées) {
        this.données = nouvDonnées
    }
}
export default const monStore = new MonStore(unAutreTruc)

```

Ensuite, on peut y accèder depuis n'importe ou, par exemple pour gérer l'accès à une route privée, ou récupérer à un seul endroit les données du back-end et les envoyer ou on veut sans passer des props.

> regardez session.js dans src/auth/, c'est notre Store pour les données de session après la connexion avec Supabase, ça nous sert notament à autoriser l'accès au back-office

> itemsStore est le store dans lequel on va stocker les données que le back end nous fournit, c'est là qu'on déclenchera les requêtes, on pourra aussi faire en sorte que lorsqu'on modifie la BDD, les changements se répercutent instantanément sur l'affichage avec une boucle du style : GET -> response stockée dans le store -> affichage d'items à partir du store -> action de l'utilisateur sur la page pour supprimer un item -> POST -> GET -> modification des données du store -> re-rendu des éléments affichés .


### Accèder au store

Il y à plusieurs façon d'accèder au store et de le modifier dans React:

- les variables globales : on exporte, on importe. C'est simple, pratique, mais pas testable et pas clean/safe sur un gros projet, donc pas très scalable. C'est ce qu'on utilise ici.

```jsx
import { monStore } from './laOuCestrangé/monStore.js'
function monComposant() {
    const desDonnées = monStore.données

    return (
        <>
            <p>{desDonnées}</p>
        </>
    )
}
```

- le contexte avec useContext() et des providers : on injecte dans l'arborescence de l'appli un "contexte" qui permet d'accèder au store indirectement. C'est testable et ça sépare bien le store du rendu, mais c'est casse-pieds à mettre en place et complexifie le code.

- les props : on fait passer le store de parent à enfant. Ca implique des chaines continues parent->enfant ("props drilling") et c'est pas compatible avec les routes dynamiques qui créent des pages à la volée.

```jsx
function monComposant({storeCommeProp}) {
    return(
        <>
            <p>{storeCommeProp.données}</p>
        </>
    )
}

```

### Gérer le rendu des composants selon le store

Syntaxe observer :

```javascript
const monComposant = observer(({prop}) => { 
    // des trucs logiques genre useState(), des calculs..

    return(
        // du jsx
    )
})

```

La syntaxe observer permet d'actualiser un composant dès que l'état du store change. Il faut faire attention aux boucles infinies de re-rendu. Pour éviter ça, on peut utiliser des conditions, ou des hooks comme useEffect.

useEffect éxécute une instruction, sans renvoyer quoi que ce soit, une fois que le composant est chargé. On peut y assigner des valeurs à surveiller : en cas de re-rendu du composant, useEffect n'est executé que si la valeur à changé. On peut s'en servir pour déclencher une maj du store selon certaines conditions, et éviter le bouclage de l'observer.

Exemple 1 : observer avec condition

```jsx
import noelStore from './quelquepart/noelStore.js'

const ListeDuPereNoel = observer(() => {
    // déclenche le re-rendu dès que ça change grace à observer
    const enfants = noelStore.enfants
    // si la liste est vide ("si il n'y a rien à l'index 1 du tableau")
    if(!enfants[1]) {
        noelStore.getEnfants()
    }

    return(
        <>
            <ul>{enfants.map((enfant) => return(
                <li nom ={ enfant.nom }
                statut ={ enfant.gentilOuMechant }/>))}
            </ul>
        </>
    )
})

```

Exemple 2: observer avec mise à jour conditionnelle selon la page 

```jsx

import noelStore from './quelquepart/noelStore.js'

const ListeDuPereNoel = observer(() => {
    // on récupère l'url : localhost:3006/#/listeGentils 
    // ou localhost:3006/#/listeMechants
    params = useParams()

    // déclenche le re-render dès que ça change grace à observer
    const enfants = noelStore.enfants

    useEffect(() => {
        if(params.listeMechants) { // si on veut afficher les méchants...
            noelStore.getMechants()
        } else if (params.listeGentils) { // ou les gentils...
            noelStore.getGentils()
        }
    },[params]) // si ça bouge pas, on ne ralance pas la maj pour rien

    return(
        <>
            <ul>{enfants.map((enfant) => return(
                <li nom ={ enfant.nom }
                statut ={ enfant.gentilOuMechant }/>))}
            </ul>
        </>
    )

})

```
Ca permet d'éviter les boucles de rechargement infini et les erreurs "undefined", et s'utilise principalement pour agir sur quelque chose d'externe, par exemple une API ou un store. 

