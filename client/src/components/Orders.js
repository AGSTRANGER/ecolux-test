import React from "react";
import { connect } from "react-redux";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  ListGroup,
  ListGroupItem,
} from "reactstrap";

const Orders = ({ orders }) => {
  console.log("🚀 ~ file: Orders.js:16 ~ Orders ~ orders", orders);
  return (
    <div>
      {orders.map((order) => (
        <Card key={order._id}>
          <CardBody>
            <CardTitle>Order Information</CardTitle>
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
