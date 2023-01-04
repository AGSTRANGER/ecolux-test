const express = require("express");
const router = express.Router();
const passport = require("passport");

const productServices = require("../../services/productServices");

// @route  Get api/products/
// @desc   Get products
// @access Private

router.get(
  "/",
  passport.authenticate("normal-request-authentication-strategy", {
    session: false,
  }),
  async (req, res) => {
    console.log("🚀 ~ file: products.js:17 ~ req", req);
    productServices
      .getProducts()
      .then((response) => {
        console.log("🚀 ~ file: products.js:17 ~ .then ~ response", response);
        res.status(200).json(response);
      })
      .catch((error) => {
        console.log("🚀 ~ file: products.js:23 ~ error", error);
        res.status(500).send("We couldn't retrieve the products.");
      });
  }
);

module.exports = router;
