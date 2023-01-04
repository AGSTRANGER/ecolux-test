import React from "react";
import { connect } from "react-redux";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";

const Orders = ({ orders }) => {
  return (
    <Container>
      <Row>
        <Col>
          {orders.map((order, index) => (
            <ListGroup key={index}>
              <ListGroupItem>
                <h3>Order {index + 1}</h3>
                {order.cart.items.map((item) => (
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
  orders: state.order.orders,
});

export default connect(mapStateToProps)(Orders);
