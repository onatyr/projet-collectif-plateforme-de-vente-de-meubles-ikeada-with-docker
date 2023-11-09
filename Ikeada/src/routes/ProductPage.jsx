import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { itemsStore } from "../stores/itemStore";
import {
  Container,
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Stack,
  Badge,
  Modal,
  Figure,
  Card
} from "react-bootstrap";
import { observer } from "mobx-react-lite";
import MainTitle from "../components/atoms/MainTitle";
import { FileX, Hr } from "react-bootstrap-icons";
const ProductPage = observer(() => {
  // on récupère l'id depuis l'URL créée par le routeur
  const itemId = useParams().productId;
  // et l'item depuis le store
  const item = itemsStore.currentItem;
  // on vérifie juste si la page à changée (ça évite de boucler)
  useEffect(() => {
    if (itemId) {
      itemsStore.searchItemById(itemId);
    }
  }, [itemId]);
  // obligé d'utiliser useEffect pour ne pas appeler map avant que .materials n'existe et causer une erreur
  const [materials, setMaterials] = useState([]);
  useEffect(() => {
    if (item.materials) {
      setMaterials(
        item.materials.map((material) => {
          return (
            <ListGroup.Item disabled pill bg="secondary" key={material} style={{ color: 'black', textTransform: 'uppercase', borderColor: '#464543', textAlign: 'center' }}>
              {material}
            </ListGroup.Item>
          );
        })
      );
    }
  }, [item.materials]);
  const [colors, setColors] = useState([]);
  useEffect(() => {
    if (item.colors) {

      setColors(
        item.colors.map((color) => {
          return (
            <>
              <ListGroup horizontal key={color} style={{ width: '100%' }}  >
                <ListGroup.Item disabled style={{ marginBottom: '8px', color: 'black', border: `1px solid black` }}>{color.name}
                </ListGroup.Item>
                <div style={{ marginBottom: '8px', backgroundColor: color.rgb, width: '20%', border: `1px solid black`, borderLeft: 'none', borderRadius: '0 0.375rem 0.375rem 0' }}></div>
              </ListGroup>
            </>
          );
        })
      );
    }
  }, [item.colors]);

  const [dimensions, setDimensions] = useState([]);
  useEffect(() => {
    if (item.dimensions) {
      setDimensions(
        item.dimensions.map((dimension) => {
          return (
            <ListGroup.Item disabled bg="secondary" key={dimension} style={{ color: 'black', borderColor: '#464543', textAlign: 'center' }}>
              {dimension}
            </ListGroup.Item>
          );
        })
      );
    }
  }, [item.dimensions]);
  const [zoomImg, setZoomImg] = useState(false);
  const handleClose = () => setZoomImg(false);
  const handleShow = () => setZoomImg(true);
  // si on a pas d'image, on met le placeholder
  const picSrc =
    item.picture ||
    "https://www.arqueselectrodiesel.fr/wp-content/uploads/2022/08/photo-non-disponible-1.jpg";



  return (
    <Row fluid style={{ padding: "32px 0", alignItems: 'center', margin: '50px 0 50px 0' }}>
      <Col fluid style={{ maxWidth: "50%", padding: "0 16px" }}>
        <Image fluid style={{ border: '1px solid #464543' }}
          src={picSrc}
        />
      </Col>
      <Col className="d-flex flex-column justify-content-center" style={{ border: '1px solid #464543', padding: '16px' }}>
        <Row className="text-center">
          <h2>{item.name}</h2>
          <p style={{ fontSize: 'large' }}>{item.desc}</p>
        </Row>
        <Row>
          <Col>
            <h4 style={{ fontSize: 'larger', textAlign: 'center', marginTop: '16px' }}>Matériaux</h4>
            <ListGroup horizontal>
              {materials}
            </ListGroup>
          </Col>
          <Col>
            <h4 style={{ fontSize: 'larger', textAlign: 'center', marginTop: '16px' }} >Dimensions</h4>
            <ListGroup horizontal>
              {dimensions}
            </ListGroup>
          </Col>
          <Col>
            <h4 style={{ fontSize: 'larger', textAlign: 'center', marginTop: '16px' }}>Couleurs</h4>
            {colors}
          </Col>
        </Row>
        <Container style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', }}>

          <Button style={{ whiteSpace: 'nowrap', padding: '0', display: 'flex', border: '2px solid #1F7A8C', backgroundColor: 'transparent', borderRadius: '0', color: '#1F7A8C', height: 'fit-content', width: 'fit-content', fontSize: '24px', textTransform: 'uppercase', alignItems: 'center' }}>
            <span style={{ padding: '2px 16px', fontSize: '32px', height: '100%', backgroundColor: '#1F7A8C', color: 'white' }}>{item.price / 100} €</span><span style={{ padding: '2px 16px' }}>Ajouter au panier</span>
          </Button>
        </Container>
      </Col>
    </Row >
  );
});

export default ProductPage;
{/*<>
        <Container
          className="d-flex flex-column justify-content-between align-items-center"
          style={{ minHeight: "90vh", width: "90vw" }}
          fluid
        >
         <Row>
          <Col>
            <Image
              src={picSrc}
              fluid
              style={{ width: "400px", marginBottom: "20px" }}
              thumbnail
              onClick={handleShow}
            />
          </Col>
        </Row>
        <Row>
          <Col style={{ width: "25vw" }}>
            <h4>{item.name}</h4>
            <p>{item.desc}</p>

            {/* Afficher les matériaux du produit *

            <ListGroup>
              <ListGroup.Item className="d-flex flex-column justify-content-center align-items-center">
                Matériaux :
                <Stack
                  direction="horizontal"
                  gap={2}
                  className="d-flex flex-row justify-content-center"
                >
                  {materials}
                </Stack>
              </ListGroup.Item>

              {/* Afficher la disponibilité du produit *

              <ListGroup.Item className="d-flex flex-column justify-content-center align-items-center">
                Disponibilité :
                {item.available ? (
                  <Badge pill bg="success">
                    En stock
                  </Badge>
                ) : (
                  <Badge pill bg="danger">
                    Épuisé
                  </Badge>
                )}
              </ListGroup.Item>

              {/* Afficher la dimension du produit conversion mm vers cm *
              <ListGroup.Item className="d-flex flex-row justify-content-evenly align-items-center">
                Dimensions :
                {item.dimensions
                  ? item.dimensions.map((dimension, index) => (
                    <span key={index}>
                      {`${dimension * 0.1} cm`}
                      {index < item.dimensions.length - 1 ? " x " : ""}
                    </span>
                  ))
                  : "Aucune dimension disponible"}
              </ListGroup.Item>

              {/* Afficher la couleur du produit */}
{/* <ListGroup.Item className='d-flex flex-column justify-content-center align-items-center'>
                Couleurs :
                <Stack direction="horizontal" gap={2} className="d-flex flex-row justify-content-center">
                  {item.colors.map((color) => (
                    <Badge pill style={bgColor} key={color.name}>{color.name}</Badge>
                  ))}
                </Stack>
              </ListGroup.Item> *
            </ListGroup>
          </Col>
          
        </Row>
      </Container>

      <Modal show={zoomImg} onHide={handleClose} animation={false} size="lg">
        <Modal.Body>
          <Image src={picSrc} fluid />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </> */}