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

//
// Fake payment gateway
const makePayment = (order_id) => {
  // Simulate a payment being made
  console.log(`Simulating payment for order ${order_id}...`);
  const paymentSuccess = Math.random() >= 0.5; // Randomly decide if the payment is successful
  return paymentSuccess;
};

// Task that is triggered 1 minute after an Order is created
const updateOrderState = async (order_id) => {
  try {
    console.log(`Updating state of order ${order_id}...`);
    // Find the Order document
    console.log(
      "🚀 ~ file: orderServices.helpers.js:80 ~ updateOrderState ~ Order",
      Order
    );

    const order = await Order.findById(order_id);
    if (!order) {
      throw new Error(`Order with id ${order_id} not found.`);
    }
    // Make a payment
    const paymentSuccess = makePayment(order_id);
    if (paymentSuccess) {
      // Update the state of the Order to paid
      order.state = "paid";
      order.paid_at = Date.now();
      console.log(`Order ${order_id} was successfully paid.`);
    } else {
      // Update the state of the Order to unpaid
      order.state = "unpaid";
      console.log(`Payment for order ${order_id} failed.`);
    }
    // Save the updated Order document
    await order.save();
  } catch (err) {
    console.error(err);
  }
};
// Middleware that triggers the updateOrderState task 1 minute after an Order is created
orderSchema.post("save", function (doc, next) {
  setTimeout(() => updateOrderState(doc._id), 60000); // 1 minute in milliseconds
  next();
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
