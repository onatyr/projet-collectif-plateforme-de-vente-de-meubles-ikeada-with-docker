class InterfaceBackEnd {
    // récupère tous les items
    async fetchItems() {
        return await fetch('/api/items', {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                return data
            })
            .catch(error => console.error('Erreur de chargement du JSON :', error));
    }

    // récupère un item grace à son nom complet, pas terrible pour la recherche mais certainement pour d'autres choses, comme la page produit
    async searchItems(query) {
        return await fetch(`/api/items/${query}`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                return data
            })
            .catch(error => console.error('Erreur de chargement du JSON :', error));
    }
    async searchItemById(id) {
        return await fetch(`/api/items/id/${id}`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                return data
            })
            .catch(error => console.error('Erreur de chargement du JSON :', error));
    }
}

export const interfaceBackEnd = new InterfaceBackEnd