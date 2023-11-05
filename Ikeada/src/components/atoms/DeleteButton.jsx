import { TrashFill } from "react-bootstrap-icons"
import { Button } from "react-bootstrap"
import { itemsStore } from "../../stores/itemStore"
import { PropTypes } from "mobx-react"
export default function DeleteButton({ id }) {
    function del() {
        console.log(id)
        itemsStore.delItem(id)
    }
    return (
        <>
            <Button variant="transparent" onClick={del}>
                <TrashFill size={25} className="text-danger"></TrashFill>
            </Button>
        </>)
}

DeleteButton.propTypes = {
    id: PropTypes.string
}