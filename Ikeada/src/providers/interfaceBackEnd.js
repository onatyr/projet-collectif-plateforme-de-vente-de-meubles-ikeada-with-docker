class InterfaceBackEnd {
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
}

export const interfaceBackEnd = new InterfaceBackEnd