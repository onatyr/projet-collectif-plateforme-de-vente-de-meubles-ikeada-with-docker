import { Container, Navbar, Nav, Form } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { HouseDoorFill, PersonFill, GearFill } from 'react-bootstrap-icons';
import { Button } from 'react-bootstrap';
import { useState } from 'react';

export function NavBar() {
  // on utilise le state pour récupérer ce que l'utilisateur tape dans le champs de recherche
  const [query, setQuery] = useState('')
  return (
    <Navbar fixed="top" sticky="top" expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">Ikeada</Navbar.Brand>
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: "100px" }}
          navbarScroll
        ></Nav>
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
          <Link to={`../search/${query}`}><Button variant="outline-success">Search</Button></Link>
        </Form>
        <Nav className="grid gap-3">
          {/* on peut naviguer vers différentes pages grace aux Routes */}
          <Link to={`/accueil`}><HouseDoorFill size={30} className="icon" /></Link>
          <Link to={`/login`}><PersonFill size={30} className="icon" /></Link>
          <Link to={`/back-office`}><GearFill size={30} className="icon" /></Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;




