import { Container, Navbar, Nav, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
// import { HouseDoorFill, PersonFill, GearFill } from "react-bootstrap-icons";
import { Button } from "react-bootstrap";
import { useState } from "react";
import BorderBottom from "./atoms/BorderBottom";

export function NavBar() {
  // on utilise le state pour récupérer ce que l'utilisateur tape dans le champs de recherche
  const [query, setQuery] = useState("");

  return (
    <Navbar fixed="top" sticky="top" expand="lg" className="navbar">
      <Container fluid className="navbar--container">
        <Navbar.Brand href="#">Ikeada</Navbar.Brand>
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: "100px" }}
          navbarScroll
        ></Nav>
        <Nav className="mx-auto d-flex gap-4">
          {/* on peut naviguer vers différentes pages grace aux Routes */}
          <Link to={`/accueil`}>Shop</Link>
          <Link to={`/back-office`}>À Propos</Link>
          <Link to={`/back-office`}>Contact</Link>
        </Nav>
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {/* on insère le contenu du champ ici pour accèder à la page correspondante via une Route */}
          <Link to={`../search/${query}`}>
            <Button variant="outline-success">Search</Button>
          </Link>
        </Form>
        <BorderBottom />
      </Container>
    </Navbar>
  );
}

export default NavBar;
