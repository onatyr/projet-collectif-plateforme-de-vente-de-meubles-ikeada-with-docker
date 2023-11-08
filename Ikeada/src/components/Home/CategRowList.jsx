import { ArrowUpRight } from "react-bootstrap-icons";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function CategRowList({ categ }) {
  const encodedCateg = encodeURI(categ.name);

  return (
    <ListGroup.Item
      className="list-group-item d-flex justify-content-between"
      as={Link} // encodeURI("Salle à manger")
      to={`../shop/itemscateg/${encodeURI(categ.name)}`}
    >
      <p className="categ--text--list fs-3">{categ.name}</p> <ArrowUpRight />
    </ListGroup.Item>
  );
}
