const Product = require("../../Models/Product");
const Order = require("../../Models/Order");
const User = require("../../Models/User");

console.log("🚀 ~ file: orderServices.helpers.js:3 ~ Product", Product);
// For some weird reason order doesn't get imported here correctly
// It gets imported as an empty object
// Whereas the Product model gets imported correctly
// And Order gets imported correctly in orderServices file
console.log("🚀 ~ file: orderServices.helpers.js:2 ~ Order", Order);
console.log("🚀 ~ file: orderServices.helpers.js:4 ~ User", User);

const checkIfItemsStocksAreStillAvailable = async (ordered_items) => {
  let result = {
    are_items_stocks_still_available: true,
    available_ordered_items_info: [],
    order_total: 0,
  };
  for (let i = 0; i < ordered_items.length; i++) {
    const ordered_item = ordered_items[i];
    const product_id = ordered_item._id;
    const { quantity } = ordered_item;

    const product_search_option = {
      _id: product_id,
      stock: { $gte: quantity },
    };
    const available_item = await Product.findOne(product_search_option).catch(
      (error) => {}
    );
    if (!!available_item) {
      result.available_ordered_items_info = [
        ...result.available_ordered_items_info,
        {
          product: available_item._id,
          price: available_item.price,
          quantity: ordered_item.quantity,
        },
      ];
      result.order_total += available_item.price;
    } else {
      result.are_items_stocks_still_available = false;
    }
  }
  return result;
};

const checkIfItemStockIsStillAvailable = async (ordered_item) => {
  let result = {
    is_item_stock_still_available: true,
    available_ordered_item_info: [],
  };
  const product_id = ordered_item._id;
  const { quantity } = ordered_item;

  const product_search_option = {
    _id: product_id,
    stock: { $gte: quantity },
  };
  const available_item = await Product.findOne(product_search_option).catch(
    (error) => {}
  );
  if (!!available_item) {
    result.available_ordered_item_info = {
      product: available_item._id,
      price: available_item.price,
      quantity: ordered_item.quantity,
    };
  } else {
    result.is_item_stock_still_available = false;
  }
  return result;
};

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

exports.checkIfItemsStocksAreStillAvailable =
  checkIfItemsStocksAreStillAvailable;
exports.checkIfItemStockIsStillAvailable = checkIfItemStockIsStillAvailable;
exports.makePayment = makePayment;
exports.updateOrderState = updateOrderState;
