import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  ListGroup,
  ListGroupItem,
} from "reactstrap";

import { getOrders } from "../actions/api";

const Orders = ({ orders, dispatch }) => {
  useEffect(() => {
    getOrders(dispatch);
  }, []);

  console.log("🚀 ~ file: Orders.js:16 ~ Orders ~ orders", orders);
  return (
    <div>
      {orders.data.map((order, i) => (
        <Card key={order._id}>
          <CardBody>
            <CardTitle>Order {i + 1} Information</CardTitle>
            <CardText>Shipping Address: {order.shipping_address}</CardText>
            <CardText>Order Total: {order.order_total}</CardText>
            <CardTitle>Items</CardTitle>
            <ListGroup>
              {order.items.map((item) => (
                <ListGroupItem key={item.product}>
                  <CardText>Product: {item.product.title}</CardText>
                  <CardText>Price: {item.price}</CardText>
                  <CardText>Quantity: {item.quantity}</CardText>
                </ListGroupItem>
              ))}
            </ListGroup>
            <CardText>State: {order.state}</CardText>
            <CardText>Created At: {order.createdAt}</CardText>
            <CardText>Updated At: {order.updatedAt}</CardText>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};
const mapStateToProps = (state) => ({
  orders: state.order.orders,
});

export default connect(mapStateToProps)(Orders);
