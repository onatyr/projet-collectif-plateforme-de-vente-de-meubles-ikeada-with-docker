import { makeObservable, observable, action } from "mobx"
import { createContext } from "react"

// store qui va contenir les données de session
class itemStore {
    items = []

    // on lui dis que "user" et "session" sont des trucs auxquels on va vouloir accèder
    // et que setSession est une méthode pour y assigner des données
    constructor() {
        makeObservable(this, {
            items: observable,
            getItem: action,
            removeItem: action,
            getAll: action,
            fetchItems: action
        })
    }
    fetchItems() {
        // déclencher la requête
    }
    
}

// on instancie le Store
export const sessionStore = new Session();
// on l'initialize pour pouvoir y accèder partout avec React
export const sessionContext = createContext(sessionStore);