import CardRowList from "./CategRowList.jsx";
import { useParams } from "react-router";
import { useEffect } from "react";
import { categsStore } from "../../stores/categStore";
import { observer } from "mobx-react-lite";
import ListGroup from "react-bootstrap/ListGroup";

const CategList = observer(() => {
  const urlParam = useParams();

  const categs = categsStore.categs;

  useEffect(() => {
    categsStore.getCategs();
  }, [urlParam]);

  return (
    <ListGroup variant="flush" className="list-group p-2 bd-highlight">
      {categs.map((categ) => {
        return <CardRowList key={categ.name} categ={categ} />;
      })}
    </ListGroup>
  );
});

export default CategList;
