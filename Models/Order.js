const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customer_name: {
    type: String,
    required: true,
  },
  shipping_address: {
    type: String,
    required: true,
  },
  order_total: {
    type: Number,
    required: true,
  },
  paid_at: {
    type: Date,
  },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
