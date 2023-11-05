import ProductCard from '../components/ProductCard'
import { useParams } from 'react-router';
import { useEffect } from 'react';
import { itemsStore } from '../stores/itemStore';
import { observer } from 'mobx-react-lite'

const CardList = observer(() => {
  // récupère le chemin URL
  const urlParams = useParams()
  // récupère les items
  const items = itemsStore.items

  // s'éxecute toujours la première fois, puis permet de déclencher un re-render si on est pas sur la même page 
  useEffect(() => {
    if (urlParams.query) {
      // page de recherche
      itemsStore.searchItems(urlParams.query)
    } else {
      // page accueil
      itemsStore.getItems()
    }
  }, [urlParams])

  return (
    <div className="d-flex justify-content-around flex-wrap">
      {items.map((item) => {
        return (<ProductCard key={item.name} item={item} />)
      })}
    </div>
  )
})

export default CardList
