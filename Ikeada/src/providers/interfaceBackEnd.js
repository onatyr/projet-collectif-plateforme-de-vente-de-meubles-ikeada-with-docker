class InterfaceBackEnd {
    async fetchItems() {
        return await fetch('/jsonTest/item.json')
            .then(response => response.json())
            .then(data => {
                return data
            })
            .catch(error => console.error('Erreur de chargement du JSON :', error));
    }
}

export const interfaceBackEnd = new InterfaceBackEnd