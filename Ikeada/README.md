## Dependances

- Vite : outil de déploiement/transpilateur/gestion du serveur de dev

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

- Prop-Types : outil de verification de type des props, c'est pas aussi efficace que TypeScript mais c'est beaucoup plus simple à mettre en place

```jsx
import { PropTypes } from 'prop-types'

function MonComposant(prop) {

}

MonComposant.propTypes = {
  prop: PropTypes.string
}

```

- Mob X : outil de gestion des States et de création de Stores (on explique en détail plus bas)

## Routing

La navigation entre les différentes pages est gérée par un HASH ROUTER appelé aux niveau de main.js (point d'entrée de l'application pour Node.js) et configuré au niveau de App.jsx (point d'entrée pour React) grâce à des <Routes> et des sous-routes (children).

Le routeur permet de créer des chemins associés à un URL et de charger les fichiers .jsx correspondants lors de la navigation :

- pour "/" (la racine), on charge la barre de navigation <NavBar>. Elle ne sera pas rechargée quand on change de page.

-  quand l'utilisateur navigue vers une page, le routeur regarde quel fichier correspond à la sous-route ("/accueil" => <CardList />, "/product-page" => <ProductPage/>) et injecte le code dans un div grâce à l'élément <Outlet/> qui sert de point d'injection.

Cela permet de donner l'impression de naviguer d'une page à l'autre, avec des url différentes, alors qu'en réalité on charge des composants.

### Routes protégées

Le routeur permet de contrôler l'accès à certaines routes. Ici on s'en est servi pour protéger l'accès au back-office :

On a créé un composant <ProtectedRoute /> qui vérifie si l'utilisateur est connecté et redirige vers <BackOffice /> seulement si c'est le cas.

## States & Stores

Le state, c'est les données du front-end de l'application, en temps réel. Ca peux être par exemple un champ de formulaire (qu'est ce que l'utilisateur est en train de taper), une liste de résultats de recherche à afficher, l'état d'une barre d'outil (minimisée/étendue)...

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

C'est cool, mais dans React, le state est lié aux composants. Pour avoir des States plus global qui permettent de garder et actualiser par exemple des réponses de requêtes API, des données de session... C'est vite compliqué.

On utilise MobX qui simplifie tout ça :

On crée un Store sous la forme d'une classe, qui va contenir le State et définir des actions, c'est à dire des méthodes pour faire des trucs sur ou avec le state : l'actualiser, faire des calculs, filtrer des données, récupérer des données spécifiques.

```jsx

import unAutreTruc from './quelquepart/unAutreTruc'

class MonStore {
    données
    constructor(truc) {
        makeObservable(this,
        {
            données: observable,
            modifier: action
        })
        this.truc = truc
    }

    modifier(nouvDonnées) {
        this.données = nouvDonnées
    }
}

export default const monStore = new MonStore(unAutreTruc)

```

Ensuite, on peut y accèder depuis n'importe ou, ce qui est très pratique, par exemple pour gérer l'accès à une route privée

> regardez session.js dans src/auth/, c'est notre Store pour les données de session après la connexion avec Supabase, ça nous sert notament à autoriser l'accès au back-office

## Accèder au store

Il y à plusieurs façon d'accèder au store et de le modifier dans React:

- les variables globales : on exporte, on importe, ça marche. C'est simple, pratique, mais pas testable et pas clean/safe sur un gros projet, donc pas très scalable. 


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

- le contexte avec useContext() et des providers : on injecte dans l'arborescence de l'appli un "contexte" qui permet d'accèder au store indirectement. C'est testable et ça sépare bien le store du rendu, mais c'est atrocement chiant à mettre en place, je l'ai fait et je me suis ravisé.

````jsx

const unExemple = "je vous épargne l'exemple"

````


- les props : on se fait passer le store de parent à enfant. Ca implique des chaines continues parent->enfant ("props drilling") et c'est pas compatible avec les routes dynamiques qui créent des pages à la volée, carrément sur une autre "branche" de l'arborescence. Donc non.

```jsx

function monComposant({storeCommeProp}) {
    return(
        <>
            <p>{storeCommeProp.données}</p>
        </>
    )
}

```



## Gérer le rendu des composants selon le store

Syntaxe observer :

```javascript

const monComposant = observer(({prop}) => { 
    // des trucs logiques genre useState(), des calculs..

    return(
        // du jsx
    )

})

```

La syntaxe observer permet d'actualiser un composant dès que l'état du store change, c'est pratique... sauf si c'est le composant lui même qui change l'état auquel cas on a vite des boucles infinies de re-calcul. Relou. A réserver aux composants qui n'actualisent pas le store et reçoivent des props ou créent un truc observable à l'intérieur d'elles mêmes.

Pour un code plus lisible, on utilise plutot la méthode useEffect fournie par react.

useEffect éxecute une instruction, sans renvoyer quoi que ce soit, une fois que le composant est chargé. On peut y assigner des valeurs à surveiller : si la valeur n'a pas changée, alors il ne se passe rien. Si elle à changer, alors on recharge le composant avec la nouvelle valeur.

```jsx
import noelStore from './quelquepart/noelStore.js'

function ListeDuPereNoel() {

    const enfantsGentils = noelStore.enfantsGentils

    noelStores.miseAJour()

    const [listeGentils, setListeGentils] = useState([])

    useEffect(() => { 
        setEnfantsGentils(enfantsGentils.map((enfant) => return(
                <li nom={enfant.nom}/>
        )))
    }, [enfantsGentils])

    return(
        <>
            <ul>{listeGentils}</ul>
        </>
    )

}

```
Ca permet avant tout d'éviter les boucles de rechargement infini et les erreurs "undefined", et s'utilise principalement pour agir sur quelque chose d'externe, par exemple une API ou un store. Pour les props ou autres, useState() est suffisant.

