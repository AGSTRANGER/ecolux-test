import React from "react";
import { Container, Row, Col } from "reactstrap";

const AppFooter = () => {
  return (
    <footer className="bg-light py-3 mt-5 fixed-bottom">
      <Container>
        <Row>
          <Col md={4}>
            <h5>Contact Us</h5>
            <p>
              23 Rue du Merle
              <br />
              Bretagne, FR
              <br />
              0x xx xx xx xx
            </p>
          </Col>
          <Col md={4}>
            <h5>Eqolux - About Us</h5>
            <p>
              We are the Sustainable Amazon platform offering a large portfolio
              of eco-friendly products to the HORECA sector.{" "}
            </p>
          </Col>
          <Col md={4}>
            <h5>Follow Us</h5>
            <ul className="list-unstyled">
              <li>
                <a href="https://www.facebook.com/eqolux">Facebook</a>
              </li>
              <li>
                <a href="https://www.instagram.com/eqolux/">Instagram</a>
              </li>
              <li>
                <a href="https://www.linkedin.com/company/eqolux/">LinkedIn</a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default AppFooter;
