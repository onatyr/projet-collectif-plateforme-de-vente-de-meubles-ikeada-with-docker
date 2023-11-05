import { PencilSquare } from "react-bootstrap-icons"
import { Button } from "react-bootstrap"
export default function EditButton() {

    function editItem() {
    }
    return (
        <>
            <Button variant="transparent" onClick={editItem}>
                <PencilSquare size={25} className="text-primary"></PencilSquare>
            </Button>
        </>)
}