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
    // I thought about removing this field
    // Because it could be concluded from products field
    // But, the price of a product can change one day
    // However, that does not mean that the order_total
    // Of previous orders containing that product should change
    order_total: {
      type: Number,
      required: true,
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Products",
        },
      },
    ],
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
