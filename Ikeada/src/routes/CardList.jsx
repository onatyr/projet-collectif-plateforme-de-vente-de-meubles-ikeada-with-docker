import ProductCard from '../components/ProductCard'
import { useContext } from 'react';
import { itemsContext } from '../stores/itemStore'
import { observer } from 'mobx-react-lite';


const CardList = observer(() => {
  const itemsStore = useContext(itemsContext);
  const items = itemsStore.items
  const cards = items.map((item) => {
    return (<ProductCard key={item.data.name} item={item} />)
  })


  console.log(items)
  return (
    <div className="d-flex justify-content-around flex-wrap">
      {cards}
    </div>
  )
})

export default CardList
