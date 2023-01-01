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
        console.log("🚀 ~ file: orders.js:24 ~ error", error);
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
    try {
      const order = await Order.findById(req.params.id);
      if (!order) {
        res.status(404).send();
      } else {
        res.send(order);
      }
    } catch (error) {
      res.status(500).send(error);
    }
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
    console.log("🚀 ~ file: orders.js:68 ~ order_id", order_id);
    console.log("🚀 ~ file: orders.js:86 ~ user_id", user_id);
    const { shipping_address, items } = req.body;
    orderServices
      .updateAnOrder(order_id, user_id, shipping_address, items)
      .then((result) => {
        res.status(200).json({
          message: "Order update was successful",
          result,
        });
      })
      .catch((error) => {
        console.log("🚀 ~ file: orders.js:24 ~ error", error);
        res.status(500).send("Order update was unsuccessful");
      });
  }
);

// Delete an order
router.delete(
  "/:id",
  passport.authenticate("normal-request-authentication-strategy", {
    session: false,
  }),
  async (req, res) => {
    try {
      const order = await Order.findByIdAndDelete(req.params.id);
      if (!order) {
        res.status(404).send();
      } else {
        res.send(order);
      }
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

module.exports = router;
