import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../actions/api";

import Product from "./Product";
import Cart from "../carts/Cart";

const Products = () => {
  const products = useSelector((state) => state.product.products);

  const dispatch = useDispatch();

  useEffect(() => {
    getProducts(dispatch);
  }, []);
  return (
    <div>
      {!!products.data &&
        products.data.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      <Cart />
    </div>
  );
};

export default Products;
