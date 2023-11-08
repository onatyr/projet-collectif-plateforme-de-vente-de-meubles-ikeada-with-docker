import Layout from "./routes/Layout";
import CardList from "./routes/CardList";
import ProductPage from "./routes/ProductPage.jsx";
import BackOffice from "./routes/BackOffice.jsx";
import Login from "./routes/Login";
import ProtectedRoute from "./auth/ProtectedRoute";
import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import ScrollToTop from "./components/ScrollToTop";

import "./custom.css";
import ContactForm from "./components/ContactPage";
import Shop from "./routes/Shop";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Route vers "l'interface", seule la navbar est chargée */}
        <Route path="/" element={<Layout />}>
          {/* Routes vers le contenu */}
          <Route path="/" element={<Home />} />
          {/* Route dynamique vers un résultat de recherche, pour l'instant il faut le nom complet du produit */}
          <Route path="shop" element={<Shop />} />
          {/* Route dynamique vers un résultat de recherche, pour l'instant il faut le nom complet du produit */}
          <Route path="search/:query" element={<CardList />} />
          {/* Route dynamique vers tous les items d'une catégorie*/}
          <Route path="itemscateg/:query" element={<CardList />} />
          {/* Route dynamique vers chaque page produit selon l'id */}
          <Route path=":productId" element={<ProductPage />} />
          {/* Route dynamique vers la page de contact */}
          <Route path="contact" element={<ContactForm />} />
          {/* route vers le back office avec un "tampon" protectedroute qui vérifie les données de session*/}
          <Route
            path="back-office"
            element={
              <ProtectedRoute>
                <BackOffice />
              </ProtectedRoute>
            }
          />
          {/* route vers la page de login */}
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </>
  );
}
