const express = require("express");
const router = express.Router();
const passport = require("passport");
const orderServices = require("../../services/orderServices");

// @route  POST api/orders
// @desc   Create a new order
// @access Private

router.post(
  "/",
  passport.authenticate("normal-request-authentication-strategy", {
    session: false,
  }),
  async (req, res) => {
    const user_id = req.user._id;
    const { shipping_address, items } = req.body;
    orderServices
      .createOrder(user_id, shipping_address, items)
      .then((result) => {
        res.status(200).json({
          message: "Order creation was successful",
          result,
        });
      })
      .catch((error) => {
        res.status(500).send("Order creation was unsuccessful");
      });
  }
);

// @route  Get api/orders/:id
// @desc   Get a specific order by ID
// @access Private

router.get(
  "/:id",
  passport.authenticate("normal-request-authentication-strategy", {
    session: false,
  }),
  async (req, res) => {
    const order_id = req.params.id;
    orderServices
      .getOrder(order_id)
      .then((result) => {
        res.status(200).json({
          message: "Order was found.",
          result,
        });
      })
      .catch((error) => {
        res.status(500).send("Order wasn't found");
      });
  }
);

// @route  patch api/orders/:id
// @desc   Update an order
// @access Private

router.patch(
  "/:id",
  passport.authenticate("normal-request-authentication-strategy", {
    session: false,
  }),
  (req, res) => {
    const user_id = req.user._id;
    const order_id = req.params.id;

    const { shipping_address, items } = req.body;
    orderServices
      .updateOrder(order_id, user_id, shipping_address, items)
      .then((result) => {
        res.status(200).json({
          message: "Order update was successful",
          result,
        });
      })
      .catch((error) => {
        res.status(500).send("Order update was unsuccessful");
      });
  }
);

// @route  delete api/orders/:id
// @desc   Delete an order
// @access Private

router.delete(
  "/:id",
  passport.authenticate("normal-request-authentication-strategy", {
    session: false,
  }),
  async (req, res) => {
    const order_id = req.params.id;
    orderServices
      .deleteOrder(order_id)
      .then((result) => {
        res.status(200).json({
          message: "Order was found.",
          result,
        });
      })
      .catch((error) => {
        res.status(500).send("Order wasn't found");
      });
  }
);

module.exports = router;
