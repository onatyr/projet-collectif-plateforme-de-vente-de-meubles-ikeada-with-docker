import { Container, Navbar, Nav, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useState } from "react";
import BorderBottom from "./atoms/BorderBottom";

export function NavBar() {
  // on utilise le state pour récupérer ce que l'utilisateur tape dans le champs de recherche
  const [query, setQuery] = useState("");

  return (
    <Navbar
      fixed="top"
      sticky="top"
      expand="lg"
      className="navbar d-flex justify-content-between"
    >
      <Container fluid className="navbar--container">
        <Navbar.Brand href="#">Ikeada</Navbar.Brand>
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: "100px" }}
          navbarScroll
        ></Nav>
        <Nav className="mx-auto d-flex flew-row justify-content-around nowrap gap-4">
          {/* on peut naviguer vers différentes pages grace aux Routes */}
          <Link to={`/shop`} className="navbar--text--link p-2">
            Shop
          </Link>
          <Link to={`/back-office`} className="navbar--text--link p-2">
            À Propos
          </Link>
          <Link to={`/contact`} className="navbar--text--link p-2">
            Contact
          </Link>
        </Nav>
        <Form className="d-flex justify-content-end navbar--form--wrapper">
          <Form.Control
            type="search"
            placeholder="Un møbl à trouver ?"
            className="me-2 navbar--search--textfield p-2"
            aria-label="Un møbl à trouver ?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {/* on insère le contenu du champ ici pour accèder à la page correspondante via une Route */}
          <Link
            to={`../shop/search/${query}`}
            variant="outline-success"
            className="btn btn-outline-custom navbar--search--btn p-2"
          >
            Search
          </Link>
        </Form>
        <BorderBottom />
      </Container>
    </Navbar>
  );
}

export default NavBar;
