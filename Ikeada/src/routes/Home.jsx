import MainTitle from "../components/atoms/MainTitle";
import CardListBS from "../components/Home/CardListBestSell";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home--background--container">
      <MainTitle />
      <div className="home--subtitle--content">
        <Link
          to={`/accueil`}
          className="btn btn-outline-custom rounded-0 home--subtitle--btn d-flex align-items-center justify-content-center"
          type="button"
        >
          Voir tout les meubles
        </Link>
        <p className="home--subtitle--text">
          Découvrez l'élégance abordable pour votre intérieur avec notre
          sélection exclusive de meubles.
        </p>
      </div>
      <hr className="home--border" />
      <div className="home--main--img">
        <img
          src="https://www.ikea.com/images/salon-lumineux-domine-par-un-canape-deux-places-paerup-en-ve-669c47233a051d4c168983630fd4ff1d.jpg?f=sg"
          alt="home image"
        />
      </div>

      <div className="home--bestsell--container">
        <h2 className="home--title display-4 h2">Nos Meilleures Ventes</h2>
        <div className="home--bestsell--cadlist">
          <CardListBS />
        </div>
        <div className="btn--container d-flex justify-content-center align-items-center home--bestsell--btn--container">
          <Link
            to={`/accueil`}
            type="button"
            className="btn btn-outline-custom rounded-0 home--bestsell--btn d-flex align-items-center justify-content-center"
          >
            Explorer
          </Link>
        </div>
      </div>

      <div className="home--categ--container d-flex justify-content-between">
        <div className="d-flex flex-column bd-highlight mb-3">
          <h2 className="home--title display-4 h2 fw-bold">
            Achetez par pièces
          </h2>
          <div className="home--bestsell--cadlist p-2 bd-highlight">
            <ul className="list-group p-2 bd-highlight">
              <li className="list-group-item">An item</li>
              <li className="list-group-item">A second item</li>
              <li className="list-group-item">A third item</li>
              <li className="list-group-item">A fourth item</li>
              <li className="list-group-item">And a fifth one</li>
            </ul>
          </div>
        </div>

        <img
          className="home--categ--img flex-end"
          src="https://www.ikea.com/ext/ingkadam/m/3223ad96ac50a09b/original/PH190402.jpg?f=xxxl"
          alt="Image Categ"
        />
      </div>
    </div>
  );
}
