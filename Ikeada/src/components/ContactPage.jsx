import { Container, FormControl } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function ContactForm() {
  return (
    <>
    <Container className="d-flex justify-content-around flex-wrap p-5">
        <h1 className="p-5">Contactez nous</h1>
      <p>Chez Ikeada, nous attachons une grande importance à votre opinion et à votre expérience. Vos commentaires, vos questions et vos suggestions sont essentiels pour nous aider à améliorer nos produits et nos services. Nous sommes là pour vous écouter et vous assister de la meilleure manière possible.

Que ce soit pour discuter de nos produits, obtenir de l'aide avec un projet, signaler un problème ou partager des idées, nous sommes à votre disposition. Votre voix compte, et nous sommes impatients de vous entendre.

N'hésitez pas à nous contacter en utilisant le formulaire ci-dessous. Notre équipe dévouée se fera un plaisir de vous répondre dans les plus brefs délais. Vous pouvez également nous appeler au numéro de téléphone indiqué ci-dessous pour une assistance immédiate.

Votre satisfaction est notre priorité, et nous sommes là pour vous accompagner à chaque étape de votre expérience Ikeada. Merci de faire partie de la famille Ikeada, et nous sommes impatients de vous lire.</p>
    </Container>
    <Form className="mx-auto p-2"
      style={{ minHeight: "60vh", width: "50vw", marginTop: "10px" }}
      >
      <Form.Group className="mb-3 justify-content text-align flex" controlId="formBasicEmail">
        <Form.Label>Prénom</Form.Label>
        <Form.Control type="text" placeholder="Prénom" />
        <Form.Label>Nom</Form.Label>
        <Form.Control type="text" placeholder="Nom" />
        <Form.Label>E-mail</Form.Label>
        <Form.Control type="email" placeholder="example@email.com" />
        <Form.Label>Votre message :</Form.Label>
        <Form.Control type="text" placeholder="Ecrivez quelque chose ..." />
        <Form.Text className="text-muted">
          Well never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="En cochant cette case, j'accepte les conditions générales d'utilisation." />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    
    </>
  );
}

