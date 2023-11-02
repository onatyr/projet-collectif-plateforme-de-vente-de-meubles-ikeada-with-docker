import { useState, useEffect } from 'react'
import ProductPage from './ProductPage.jsx'

export default function CardList() {

    const [jsonData, setJsonData] = useState(null);

    useEffect(() => {
        fetch('../../public/jsonTest/item.json')
            .then(response => response.json())
            .then(data => setJsonData(data))
            .catch(error => console.error('Erreur de chargement du JSON :', error));
    }, []);

    console.log(jsonData)

    return (
        <>
          {jsonData && 
            <ProductPage data={jsonData} />
          }
        </>
      )  
}
