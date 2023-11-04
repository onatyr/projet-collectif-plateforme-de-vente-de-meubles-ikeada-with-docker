import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { PropTypes } from 'mobx-react';

export default function ProductCard({ item }) {
  const picSrc =
    item.data.picture ||
    "https://www.arqueselectrodiesel.fr/wp-content/uploads/2022/08/photo-non-disponible-1.jpg";

  const cardImgStyle = {
    objectFit: "cover",
    height: "200px",
    width: "100%",
    borderRadius: 0
  };



  return (
    <Card style={{ width: '18rem', margin: '1rem' }}>
      <Card.Header>Prix : {item.data.price / 100} €</Card.Header>
      <Card.Img variant="top" src={picSrc} style={cardImgStyle} />
      <Card.Body className="d-flex flex-column justify-content-between">
        <Card.Title>{item.data.name}</Card.Title>
        <Card.Text>
          {item.data.desc}
        </Card.Text>
        <Link to={`../${item.data.id}`}><Button className="button">Voir plus</Button></Link>
      </Card.Body>
    </Card >
  );
}

ProductCard.propTypes = {
  item: PropTypes.object
}

