import React, { useState } from "react";
import { connect } from "react-redux";
import { createOrder } from "../../actions/api";
import {
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

const Carts = ({ carts, dispatch }) => {
  console.log("🚀 ~ file: Carts.js:22 ~ Carts ~ dispatch", dispatch);
  const [modal, setModal] = useState(false);
  const [shipping_address, setShippingAddress] = useState("");

  const toggle = () => setModal(!modal);

  const handleAddressChange = (event) => {
    setShippingAddress(event.target.value);
  };

  const showModal = () => {
    toggle();
  };

  const submitOrder = (cart) => {
    const order_data = {
      items: cart,
      shipping_address,
    };
    console.log("🚀 ~ file: Carts.js:43 ~ submitOrder ~ dispatch", dispatch);

    createOrder(order_data, dispatch);
    toggle();
  };

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
                <Button onClick={() => showModal(cart)}>Create Order</Button>
                <Modal isOpen={modal} toggle={toggle}>
                  <ModalHeader toggle={toggle}>
                    Enter Shipping Address
                  </ModalHeader>
                  <ModalBody>
                    <Form>
                      <FormGroup>
                        <Label for="shipping_address">Address</Label>
                        <Input
                          type="text"
                          name="shipping_address"
                          id="shipping_address"
                          placeholder="Enter shipping address"
                          value={shipping_address}
                          onChange={handleAddressChange}
                        />
                      </FormGroup>
                    </Form>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={() => submitOrder(cart)}>
                      Submit
                    </Button>{" "}
                    <Button color="secondary" onClick={toggle}>
                      Cancel
                    </Button>
                  </ModalFooter>
                </Modal>
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
