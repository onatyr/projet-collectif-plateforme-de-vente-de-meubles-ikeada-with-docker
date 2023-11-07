import ProductCard from "../ProductCard";
import { useParams } from "react-router";
import { useEffect } from "react";
import { itemsStore } from "../../stores/itemStore";
import { observer } from "mobx-react-lite";

const CardListBS = observer(() => {
  // récupère le chemin URL
  const urlParams = useParams();
  // récupère les items
  const items = itemsStore.items;

  const minRandom = 0;
  const maxRandom = items.length - 4; // Garantit une différence maximale de 4

  // Génère un indice de début aléatoire entre minRandom et maxRandom inclus
  const startIndex =
    Math.floor(Math.random() * (maxRandom - minRandom + 1)) + minRandom;

  const endIndex = startIndex + 3;

  // s'éxecute toujours la première fois, puis permet de déclencher un re-render si on est pas sur la même page
  useEffect(() => {
    if (urlParams.query) {
      // page de recherche
      itemsStore.searchItems(urlParams.query);
    } else {
      // page accueil
      itemsStore.getItems();
    }
  }, [urlParams]);

  return (
    <div className="d-flex justify-content-around flex-wrap">
      {items.slice(startIndex, endIndex).map((item) => {
        return <ProductCard key={item.name} item={item} />;
      })}
    </div>
  );
});

export default CardListBS;
