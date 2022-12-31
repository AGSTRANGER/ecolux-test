const express = require("express");
const router = express.Router();
const passport = require("passport");
const orderServices = require("../../services/orderServices");

// @route  POST api/orders
// @desc   Create a new order
// @access Private

router.post(
  "/order",
  passport.authenticate("normal-request-authentication-strategy", {
    session: false,
  }),
  async (req, res) => {
    const user_id = req.query.user_id;
    const { shipping_address, order_total } = req.body;
    orderServices
      .createOrder(user_id, shipping_address, order_total)
      .then((result) => {
        res.status(200).json({ message: "Order creation was successful" });
      })
      .catch((error) => {
        res.status(500).send("Order creation was unsuccessful");
      });
  }
);

// @route  GET api/orders
// @desc   Get all orders
// @access Private

router.get(
  "/orders",
  passport.authenticate("normal-request-authentication-strategy", {
    session: false,
  }),
  async (req, res) => {
    try {
      const orders = await Order.find({ customer_id: req.params.userId });
      res.send(orders);
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

// @route  Get api/orders
// @desc   Get a specific order by ID
// @access Private

router.get(
  "/orders/:id",
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

// @route  patch api/orders
// @desc   Update an order
// @access Private

router.patch(
  "/orders/:id",
  passport.authenticate("normal-request-authentication-strategy", {
    session: false,
  }),
  async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = [
      "customer_name",
      "shipping_address",
      "order_total",
      "paid_at",
    ];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      return res.status(400).send({ error: "Invalid update(s)" });
    }

    try {
      const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!order) {
        res.status(404).send();
      } else {
        res.send(order);
      }
    } catch (error) {
      res.status(400).send(error);
    }
  }
);

// Delete an order
router.delete(
  "/orders/:id",
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
