import React from "react";
import { connect } from "react-redux";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";

const Carts = ({ carts }) => {
  return (
    <Container>
      <Row>
        <Col>
          {carts.map((cart, index) => (
            <ListGroup key={index}>
              <ListGroupItem>
                <h3>Cart {index + 1}</h3>
                {cart.cart.map((item) => (
                  <div key={item._id}>
                    <p>{item.title}</p>
                    <p>{item.quantity}</p>
                  </div>
                ))}
              </ListGroupItem>
            </ListGroup>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  carts: state.order.carts,
});

export default connect(mapStateToProps)(Carts);
