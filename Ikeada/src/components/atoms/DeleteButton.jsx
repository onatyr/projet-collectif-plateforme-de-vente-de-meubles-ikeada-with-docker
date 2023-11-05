import { TrashFill } from "react-bootstrap-icons"
import { Button } from "react-bootstrap"
import { itemsStore } from "../../stores/itemStore"
export default function DeleteButton() {
    function deleteItem({ id }) {
        // met à jour le store qui devra lui déclencher la requête post
        itemsStore.delItem(id)
    }
    return (
        <>
            <Button variant="transparent" onClick={deleteItem}>
                <TrashFill size={25} className="text-danger"></TrashFill>
            </Button>
        </>)
}