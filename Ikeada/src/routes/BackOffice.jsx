import { Table } from "react-bootstrap";
import BackOfficeItem from "../components/BackOfficeItem"
import { useContext, useEffect, useState } from "react";
import { itemsContext } from "../stores/itemStore";

export default function BackOffice() {
    // récupère les items stockés dans le store
    const itemsStore = useContext(itemsContext);
    const items = itemsStore.items

    //  met à jour le store
    useEffect(() => {
        itemsStore.getItems()
    })

    const [entries, setEntries] = useState([])

    // crée les lignes du tableau par rapport à la liste des items, et met à jour si ça change
    useEffect(() => {
        setEntries(
            items.map((item) => {
                return (<BackOfficeItem name={item.data.name}
                    status={item.data.status}
                    available={item.data.available}
                    price={item.data.price}
                    key={item.data.name} />)
            }))
    }, [entries, items])

    return (
        <>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <row><h1>Panneau d'administration</h1></row>
            <row><Table bordered striped>
                <thead >
                    <tr >
                        <th className="bg-secondary text-white fs-4">Produit</th>
                        <th className="bg-secondary text-white fs-4 text-center">Prix</th>
                        <th className="bg-secondary text-white fs-4 text-center">Statut</th>
                        <th className="bg-secondary text-white fs-4 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {/* insère les lignes du tableau */}
                    {entries}
                </tbody>
            </Table></row>
        </>
    )
}