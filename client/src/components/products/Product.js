import React from "react";
import { connect } from "react-redux";

import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap";
import { addToCart } from "../../actions/api";

const Product = ({ product, dispatch }) => {
  const { _id, image_url, title, description } = product;

  const handleAddToCart = () => {
    dispatch(addToCart(_id, title));
  };

  return (
    <Card
      className="w-25 d-inline-block mr-3 mb-3"
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <img
        src={image_url}
        alt={title}
        style={{
          height: "200px",
          width: "200px",
          objectFit: "cover",
        }}
      />
      <CardBody>
        <CardTitle>{title}</CardTitle>
        <CardText>{description}</CardText>
        <Button color="primary" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </CardBody>
    </Card>
  );
};

export default connect()(Product);
