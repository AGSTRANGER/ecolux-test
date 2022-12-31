const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    shipping_address: {
      type: String,
      required: true,
    },
    order_total: {
      type: Number,
      required: true,
    },
    state: {
      type: String,
      enum: ["paid", "unpaid"],
      default: "unpaid",
    },
    paid_at: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
