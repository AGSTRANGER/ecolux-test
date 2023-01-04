import React from "react";
import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap";

const Product = ({ product }) => {
  const { image_url, title, description } = product;
  console.log("🚀 ~ ========================================");
  console.log("🚀 ~ file: Product.js:6 ~ Product ~ description", description);
  console.log("🚀 ~ file: Product.js:6 ~ Product ~ title", title);
  console.log("🚀 ~ file: Product.js:6 ~ Product ~ image_url", image_url);
  console.log("🚀 ~ ========================================");

  return (
    <Card
      className="w-25 d-inline-block mr-3 mb-3"
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <img
        src={product.image_url}
        alt={product.title}
        style={{
          height: "200px",
          width: "200px",
          objectFit: "cover",
        }}
      />
      <CardBody
        style={
          {
            // display: "flex",
            // justifyContent: "center",
          }
        }
      >
        <CardTitle>{product.title}</CardTitle>
        <CardText>{product.description}</CardText>
        <Button color="primary">Add to Cart</Button>
      </CardBody>
    </Card>
  );
};

export default Product;
