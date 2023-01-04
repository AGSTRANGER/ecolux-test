const Product = require("../Models/Product");

const getProducts = async () => {
  let response = {
    products: null,
  };
  response.products = await Product.find();
  return response;
};

exports.getProducts = getProducts;
