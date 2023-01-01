const Order = require("../Models/Order");
const orderServicesHelpers = require("../helpers/services/orderServices.helpers");

const createOrder = async (user_id, shipping_address, items) => {
  // Right now I'm working on the backend
  // When I'm working on the frontend
  // I will only allow users to send orders for items
  // Below or equal the available stock
  // However, I will still keep checkIfItemsStocksAreStillAvailable
  // Because, you can't just rely on frontend validation
  const {
    are_items_stocks_still_available,
    available_ordered_items_info,
    order_total,
  } = await orderServicesHelpers.checkIfItemsStocksAreStillAvailable(items);
  if (are_items_stocks_still_available) {
    const order_info = {
      user: user_id,
      shipping_address,
      order_total,
      items: available_ordered_items_info,
    };
    const order = new Order(order_info);
    await order.save();
  } else {
    throw new Error(
      "There is no longer stock available for one or more of the ordered items."
    );
  }
};
const getOrdersOfUser = () => {};
const updateAnOrder = () => {};
const deleteAnOrder = () => {};

Order.find((err, products) => {
  if (err) {
    console.error(err);
  } else {
    console.log(JSON.stringify(products));
  }
});

exports.createOrder = createOrder;
exports.getOrdersOfUser = getOrdersOfUser;
exports.updateAnOrder = updateAnOrder;
exports.deleteAnOrder = deleteAnOrder;
