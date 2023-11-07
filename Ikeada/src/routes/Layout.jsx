import { Container } from "react-bootstrap";
import { Outlet } from "react-router";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

// éléments permanents qui ne sont pas modifiés pendant la navigation
export default function Layout() {
  return (
    <>
      <div className="website--container">
        <div className="website--wrapper">
          <NavBar />
          <Container fluid>
            {/* c'est ici que les pages sont injectées lors de la navigation */}
            <Outlet />
          </Container>
          <Footer />
        </div>
      </div>
    </>
  );
}
