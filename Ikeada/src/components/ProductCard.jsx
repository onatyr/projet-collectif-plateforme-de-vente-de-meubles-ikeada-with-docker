import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";

export default function ProductCard({ item }) {
  // au cas ou le lien est invalide
  const picSrc =
    item.picture ||
    "https://www.arqueselectrodiesel.fr/wp-content/uploads/2022/08/photo-non-disponible-1.jpg";

  const cardImgStyle = {
    objectFit: "cover",
    height: "200px",
    width: "100%",
    borderRadius: 0,
  };

  return (
    <Card
      className="card--wrapper d-flex flex-column position-relative"
      style={{ width: "18rem", margin: "1rem" }}
    >
      <Card.Img
        variant="top"
        src={picSrc}
        style={cardImgStyle}
        className="portrait-image"
      />
      <Card.Body className="d-flex flex-column justify-content-start card--body text-center">
        {/* <Card.Text>{item.desc}</Card.Text> */}
        <div className="w-100">
          <Card.Title className="card--title text-start">
            {item.name}
          </Card.Title>
          <Card.Text className="card--price text-start">
            Prix : {item.price / 100} €
          </Card.Text>
        </div>
        <Link to={`../${item.id}`} className="fade-link">
          <Button className="btn-outline-custom rounded-0 btn--card--fade">
            Voir plus
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

ProductCard.propTypes = {
  item: PropTypes.object,
};
