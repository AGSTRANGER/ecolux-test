const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const orderServicesHelpers = require("../helpers/services/orderServices.helpers");

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
    items: [
      {
        // Prevent Mongoose from adding an _id field since the product will be the _id of the item otherwise there will be redundancy
        _id: false,
        product: {
          type: Schema.Types.ObjectId,
          ref: "Products",
        },
        // As I mentioned for the order_total field
        // The price of the product may change in the future
        // So we need to store the price at the time of the order
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
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

// Middleware that triggers the updateOrderState task 1 minute after an Order is created
orderSchema.post("save", function (doc, next) {
  setTimeout(() => orderServicesHelpers.updateOrderState(doc._id), 60000); // 1 minute in milliseconds
  next();
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
