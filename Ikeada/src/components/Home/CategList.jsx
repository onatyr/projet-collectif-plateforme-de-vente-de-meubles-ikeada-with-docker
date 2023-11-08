import CardRowList from "./CategRowList.jsx";
import { useParams } from "react-router";
import { useEffect } from "react";
import { categsStore } from "../../stores/categStore";
import { observer } from "mobx-react-lite";
import { ArrowUpRight } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { ListGroup } from "react-bootstrap";

const CategList = observer(() => {
  const urlParam = useParams();

  const categs = categsStore.categs;

  useEffect(() => {
    categsStore.getCategs();
  }, [urlParam]);

  return (
    <ListGroup variant="flush" className="list-group p-2 bd-highlight">
      <ListGroup.Item
        className="list-group-item d-flex justify-content-between"
        as={Link} // encodeURI("Salle à manger")
        to={`../shop`}
      >
        <p className="categ--text--list fs-3">Toutes les pièces</p>{" "}
        <ArrowUpRight />
      </ListGroup.Item>
      {categs.map((categ) => {
        return <CardRowList key={categ.name} categ={categ} />;
      })}
    </ListGroup>
  );
});

export default CategList;
