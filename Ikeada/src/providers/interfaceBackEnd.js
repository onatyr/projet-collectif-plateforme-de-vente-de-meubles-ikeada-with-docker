import { sessionStore } from "../auth/session";

class InterfaceBackEnd {
  // en privé pour faire ça bien
  #sessionStore;
  constructor(sessionStore) {
    this.#sessionStore = sessionStore;
  }

  // récupère tous les items
  async fetchItems() {
    return await fetch("/api/ikeada/items", {
      method: "GET"
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => console.error("Erreur de chargement du JSON :", error));
  }
  async fetchAdminItems() {
    return await fetch("/api/ikeada/items", {
      method: "GET",
      headers: { 'Authorization': `Bearer ${this.#sessionStore.token}` }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => console.error("Erreur de chargement du JSON :", error));
  }

  async fetchItemsByCateg(query) {
    console.log(query)
    return await fetch(`/api/ikeada/itemscateg/${query}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        return data
      })
      .catch((error) => console.error("Erreur de chargement du JSON :", error))
  }

  // récupère un item grace à son nom complet, pas terrible pour la recherche mais certainement pour d'autres choses, comme la page produit
  async searchItems(query) {
    return await fetch(`/api/ikeada/items/${query}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => console.error("Erreur de chargement du JSON :", error));
  }

  // recherche par id
  async searchItemById(id) {
    return await fetch(`/api/ikeada/items/id/${id}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data[0];
      })
      .catch((error) => console.error("Erreur de chargement du JSON :", error));
  }

  async archiveItem(id) {
    fetch('/api/ikeada/admin/archiveItem', {
      method: "POST",
      headers: {
        "Content-Type": "Application/json"
      },
      body: JSON.stringify({ id: id, archived: true }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.error("Erreur lors de l'archivage :", error));
  }

  async editItem(itemData) {
    fetch('/api/ikeada/admin/editItem', {
      method: "POST",
      headers: {
        "Content-Type": "Application/json"
      },
      body: { 'item': itemData },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Erreur : ", error)
      });
  }

  async changeItemStatus(id, status) {
    console.log(id)
    fetch('/api/ikeada/admin/changeItemStatus', {
      method: "POST",
      headers: {
        "Content-Type": "Application/json"
      },
      body: JSON.stringify({ id: id, status: status }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Erreur : ", error)
      });
  }


  async changeItemAv(id, aval) {
    console.log(id)
    fetch('/api/ikeada/admin/changeItemStatus', {
      method: "POST",
      headers: {
        "Content-Type": "Application/json"
      },
      body: JSON.stringify({ id: id, available: aval }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Erreur : ", error)
      });
  }


  async deleteItem(id) {
    fetch('/api/ikeada/admin/archiveItem', {
      method: "POST",
      headers: {
        body: JSON.stringify(id),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Erreur : ", error)
      });
  }


  // ajout d'un item dans la BDD
  async addItem(itemData) {
    fetch(`/api/ikeada/admin/postItem`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(itemData)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Erreur : ", error)
      });
  }

  Categs
  async fetchCategs() {
    return await fetch("/api/ikeada/category", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data
      })
      .catch((error) => console.error("Erreur de chargement du JSON :", error));
  }
}

export const interfaceBackEnd = new InterfaceBackEnd(sessionStore);
