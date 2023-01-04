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
    productServices
      .getProducts()
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((error) => {
        res.status(500).send("We couldn't retrieve the products.");
      });
  }
);

module.exports = router;
