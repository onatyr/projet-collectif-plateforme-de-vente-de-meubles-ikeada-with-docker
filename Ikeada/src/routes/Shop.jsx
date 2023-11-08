import { Row, Container } from "react-bootstrap";
import MainTitle from "../components/atoms/MainTitle";
import CardList from "./CardList";
import CategList from "../components/Home/CategList";

export default function Shop() {
  return (
    <Container fluid>
      <Row>
        <div className="col-9 w-100">
          <MainTitle />
          <p className="home--subtitle--text">
            Achetez ce que vous voulez, où que vous soyez !
          </p>
          <hr className="home--border" />
        </div>
        <div className="col-3">
          Colone de filtres et categs
          <CategList />
        </div>
        <div className="col-9 product--grid">
          <CardList />
        </div>
      </Row>
    </Container>
  );
}
