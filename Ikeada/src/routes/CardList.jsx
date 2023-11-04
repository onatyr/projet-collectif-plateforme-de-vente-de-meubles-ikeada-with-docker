import ProductCard from '../components/ProductCard'
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { itemsStore } from '../stores/itemStore';

function CardList() {
  // récupère le chemin URL
  const urlParams = useParams()
  // récupère les items
  const items = itemsStore.items

  // met à jour le store selon la page ou on est (recherche ou accueil) si celle ci à changé
  useEffect(() => {
    if (urlParams.query) {
      // recherche
      itemsStore.searchItems(urlParams.query)

    } else {
      // tout
      itemsStore.getItems()
    }
  }, [urlParams])

  const [cards, setCards] = useState([])

  // crée les cards et les met à jour si la liste des items a changée
  useEffect(() => {
    setCards(items.map((item) => {
      return (<ProductCard key={item.data.name} item={item} />)
    }))
  }, [items])


  return (
    <div className="d-flex justify-content-around flex-wrap">
      {cards}
    </div>
  )
}

export default CardList
