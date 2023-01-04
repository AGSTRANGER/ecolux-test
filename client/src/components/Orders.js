import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  ListGroup,
  ListGroupItem,
  Container,
} from "reactstrap";

import { getOrders } from "../actions/api";

const Orders = ({ orders, dispatch }) => {
  useEffect(() => {
    getOrders(dispatch);
  }, []);

  console.log("🚀 ~ file: Orders.js:16 ~ Orders ~ orders", orders);
  return (
    <Container>
      <br />
      {orders.data.map((order, i) => (
        <div>
          <Card key={order._id} className="order-card">
            <CardBody>
              <CardTitle className="order-title">
                Order {i + 1} Information
              </CardTitle>
              <CardText>Shipping Address: {order.shipping_address}</CardText>
              <CardText className="order-total">
                Order Total: {order.order_total}
              </CardText>
              <CardTitle className="item-title">Items</CardTitle>
              <ListGroup>
                {order.items.map((item) => (
                  <ListGroupItem key={item.product} className="order-item">
                    <CardText className="item-product">
                      Product: {item.product.title}
                    </CardText>
                    <CardText className="item-price">
                      Price: {item.price}
                    </CardText>
                    <CardText className="item-quantity">
                      Quantity: {item.quantity}
                    </CardText>
                  </ListGroupItem>
                ))}
              </ListGroup>
              <CardText>State: {order.state}</CardText>
              <CardText>Created At: {order.createdAt}</CardText>
              <CardText>Updated At: {order.updatedAt}</CardText>
            </CardBody>
          </Card>
          <br />
        </div>
      ))}
    </Container>
  );
};
const mapStateToProps = (state) => ({
  orders: state.order.orders,
});

export default connect(mapStateToProps)(Orders);
