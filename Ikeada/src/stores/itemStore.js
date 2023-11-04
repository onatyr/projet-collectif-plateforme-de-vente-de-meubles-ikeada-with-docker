import { makeObservable, observable, action } from "mobx"
import { createContext } from "react"
import { interfaceBackEnd } from "../providers/interfaceBackEnd"

// store qui va contenir les données de session
class itemStore {
    items = []
    currentItem = {}
    #service
    // on lui dis que "user" et "session" sont des trucs auxquels on va vouloir accèder
    // et que setSession est une méthode pour y assigner des données
    constructor(service) {
        this.#service = service
        makeObservable(this, {
            items: observable,
            currentItem: observable,
            setItems: action,
            setCurrentItem: action
        })
    }
    async getItems() {
        const data = await this.#service.fetchItems()
        this.setItems(data)
    }
    async searchItems(query) {
        const data = await this.#service.searchItems(query)
        this.setItems(data)
    }
    async searchItemById(id) {
        const data = await this.#service.searchItemById(id)
        this.setCurrentItem(data)
    }
    setItems(data) {
        this.items = data.map((el) => {return new Item(el)})
    }
    setCurrentItem(item) {
        this.currentItem = new Item(item)
    }
}

 class Item {
     data = {}
     constructor(data) {
         this.data = data
     }
 }


// on instancie le Store
export const itemsStore = new itemStore(interfaceBackEnd);

// on l'initialize pour pouvoir y accèder partout avec React
export const itemsContext = createContext(itemsStore);