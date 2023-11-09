import { Table } from "react-bootstrap";
import { itemsStore } from "../stores/itemStore";
import BackOfficeItem from "../components/BackOfficeItem"
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { sessionStore } from "../auth/session";

// observer met à jour le rendu si items change
const BackOffice = observer(() => {
    const token = sessionStore.token
    // récupère les items stockés dans le store 
    const items = itemsStore.adminItems
    // si y'en a pas, màj
    useEffect(() => {
        if (items.length < 1) {
            itemsStore.getAdminItems()
        }
    }, [token, items.length])


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
                    {items.map((item) => {
                        return (<BackOfficeItem item={item} key={item.id}
                        />)
                    })}
                </tbody>
            </Table>
        </>
    )
})

export default BackOffice