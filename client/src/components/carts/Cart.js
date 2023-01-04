import React from "react";
import { connect } from "react-redux";
import {
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Button,
} from "reactstrap";
import { removeFromCart, createCart } from "../../actions/api";

const Cart = ({ cart, dispatch }) => {
  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleCreateCart = () => {
    dispatch(createCart(cart));
  };

  return (
    <div style={{ position: "fixed", bottom: 0 }}>
      <Container>
        <Row>
          <Col>
            <ListGroup>
              {cart.map((item) => (
                <ListGroupItem key={item._id}>
                  <Row>
                    <Col xs="8">{item.title}</Col>
                    <Col xs="2">{item.quantity}</Col>
                    <Col xs="2">
                      <Button
                        color="danger"
                        onClick={() => handleRemoveFromCart(item._id)}
                      >
                        X
                      </Button>
                    </Col>
                  </Row>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
        </Row>
        {cart.length > 0 && (
          <Row>
            <Col>
              <Button color="primary" onClick={handleCreateCart}>
                Create cart
              </Button>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cart: state.order.cart,
});

export default connect(mapStateToProps)(Cart);
