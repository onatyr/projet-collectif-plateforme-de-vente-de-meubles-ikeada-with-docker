import { Table } from "react-bootstrap";
import BackOfficeItem from "../components/BackOfficeItem"
import { useContext } from "react";
import { itemsContext } from "../stores/itemStore";

export default function BackOffice() {
    const itemsStore = useContext(itemsContext);
    const items = itemsStore.items

    const tableEntries = items.map((item) => {
        return (<BackOfficeItem name={item.data.name}
            status={item.data.status}
            available={item.data.available}
            price={item.data.price}
            key={item.data.name} />)
    })

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
                    {/* on génère autant d'items qu'il y a de meubles dans les données */}
                    {tableEntries}
                </tbody>
            </Table></row>
        </>
    )
}