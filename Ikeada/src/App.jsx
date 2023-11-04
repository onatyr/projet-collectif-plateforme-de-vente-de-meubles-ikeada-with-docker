import Layout from './routes/Layout'
import CardList from './routes/CardList'
import ProductPage from './routes/ProductPage.jsx'
import BackOffice from './routes/BackOffice.jsx'
import Login from './routes/Login'
import ProtectedRoute from './auth/ProtectedRoute'
import { Routes, Route } from "react-router-dom";
import { sessionStore } from './auth/session.js'
import { Provider } from "mobx-react";
import { itemsStore } from './stores/itemStore.js'

export default function App() {
  return (
    // on fournit à toute l'appli les instances du sessionStore et celle de l'itemsStore, pour éviter de les réinstancier
    <Provider sessionStore={sessionStore}>
      <Provider itemStore={itemsStore}>
        <Routes>
          {/* Route vers "l'interface", seule la navbar est chargée */}
          <Route path="/" element={<Layout />}>
            {/* Routes vers le contenu */}
            <Route path="accueil" element={<CardList />} />
            {/* Route dynamique vers un résultat de recherche, pour l'instant il faut le nom complet du produit */}
            <Route path="search/:query" element={<CardList />} />
            {/* Route dynamique vers chaque page produit selon l'id */}
            <Route path=":productId" element={<ProductPage />} />
            {/* route vers le back office avec un "tampon" protectedroute qui vérifie les données de session*/}
            <Route path="back-office"
              element={
                <ProtectedRoute>
                  <BackOffice />
                </ProtectedRoute>}
            />
            {/* route vers la page de login */}
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </Provider>
    </Provider>
  )
}
