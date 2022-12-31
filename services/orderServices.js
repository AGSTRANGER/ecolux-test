const Order = require("../Models/Order");

const createOrder = async (user_id, shipping_address, order_total) => {
  const order_info = {
    user: user_id,
    shipping_address,
    order_total,
  };
  const order = new Order(order_info);
  await order.save();
};
const getOrdersOfUser = () => {};
const updateAnOrder = () => {};
const deleteAnOrder = () => {};

exports.createOrder = createOrder;
exports.getOrdersOfUser = getOrdersOfUser;
exports.updateAnOrder = updateAnOrder;
exports.deleteAnOrder = deleteAnOrder;
