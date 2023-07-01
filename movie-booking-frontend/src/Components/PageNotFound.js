import { Container } from "react-bootstrap";
import Footer from "./footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGhost } from "@fortawesome/free-solid-svg-icons"


export default function PageNotFound(props) {
  return (
    <>
      <Container className="mt-5 pt-5 text-center" style={{ height: "50vh" }}>
        <h2 className="text-secondary">
          <FontAwesomeIcon icon={faGhost} className="mb-3 mt-4 mt-md-5 mx-3 fa-2x"/>
          <br />
          Seems like you seek a ghost
        </h2>
      </Container>
      <Footer />
    </>
  );
}