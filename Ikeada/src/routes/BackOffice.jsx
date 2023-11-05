import { Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { itemsStore } from "../stores/itemStore";
import BackOfficeItem from "../components/BackOfficeItem"

function BackOffice() {
    // récupère les items stockés dans le store
    itemsStore.getItems()
    const items = itemsStore.items
    const [entries, setEntries] = useState(null)

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
    }, [items])

    return (
        <>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <h1>Panneau d'administration</h1>
            <Table bordered striped>
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
            </Table>
        </>
    )
}

export default BackOffice