import { ArrowUpRight } from "react-bootstrap-icons";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function CategRowList({ categ }) {
  return (
    <ListGroup.Item
      className="list-group-item d-flex justify-content-between"
      as={Link}
      to={`/accueil`}
    >
      <p className="categ--text--list">{categ.name}</p> <ArrowUpRight />
    </ListGroup.Item>
  );
}
