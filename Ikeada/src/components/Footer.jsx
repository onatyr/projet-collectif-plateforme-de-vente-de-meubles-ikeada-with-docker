export default function App() {
  return (
    <footer className="text-center text-lg-start text-muted blockquote-footer">
      <section className="container">
        <div className="text-center text-md-start mt-5">
          <div className="mt-3 row">
            {/* Première colonne */}
            <div className="col-md-4 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Ikeada</h6>
              <p>
                Here you can use rows and columns to organize your footer
                content. Lorem ipsum dolor sit amet, consectetur adipisicing
                elit.
              </p>
            </div>

            {/* Deuxième colonne */}
            <div className="col-md-4 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Liens</h6>
              <p>
                <a href="accueil" className="text-reset">
                  Accueil
                </a>
              </p>
              <p>
                <a href="accueil#/accueil" className="text-reset">
                  Produits
                </a>
              </p>
              <p>
                <a href="accueil#/login" className="text-reset">
                  À Propos
                </a>
              </p>
              <p>
                <a href="accueil#/contact" className="text-reset">
                  Contact
                </a>
              </p>
            </div>

            {/* Troisième colonne */}
            <div className="col-md-4 mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Suivez-nous</h6>
              <p>
                <a href="#!" className="text-reset">
                  Instagram
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Pinterest
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Facebook
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  LinkedIn
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  GitHub
                </a>
              </p>
            </div>

            {/* Quatrième colonne */}
            <div className="col-md-4 mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p>New York, NY 10012, US</p>
              <p>info@example.com</p>
              <p></p>
              <p>
                <a href="#/login" className="text-reset">
                  Administrateur
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="text-center p-4 footer--copyright--container">
        © 2023 Copyright:
        <a className="text-reset fw-bold" href="https://mdbootstrap.com/">
          Ikeada. Tous droits réservés.
        </a>
      </div>
    </footer>
  );
}
