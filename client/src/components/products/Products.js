import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../actions/api";

import Product from "./Product";

const Products = () => {
  const products = useSelector((state) => state.product.products);
  console.log("🚀 ~ file: Products.js:9 ~ Products ~ products", products);

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
    </div>
  );
};

export default Products;
