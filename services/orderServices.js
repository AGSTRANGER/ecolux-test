const Order = require("../Models/Order");
const orderServicesHelpers = require("../helpers/services/orderServices.helpers");

const createOrder = async (user_id, shipping_address, items) => {
  const result = { created_order: null };
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
    result.created_order = await order.save();
  } else {
    throw new Error(
      "There is no longer stock available for one or more of the ordered items."
    );
  }
  return result;
};
const getOrdersOfUser = () => {};

const updateAnOrder = async (order_id, user_id, shipping_address, items) => {
  // Find the Order document to update
  const order_search_option = {
    _id: order_id,
    user: user_id,
  };
  const order = await Order.findById(order_search_option);
  if (!order) {
    throw new Error("Order does not exist");
  }
  // Update the shipping_address field
  if (!!shipping_address) {
    order.shipping_address = shipping_address;
  }

  if (items) {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      // Check if the item has an id, which indicates that it is an existing item in the array
      if (item._id) {
        // Find the index of the item in the items array
        const index = order.items.findIndex((i) => i._id == item._id);
        // If the item exists, update its fields
        if (index > -1) {
          order.items[index].product = item.product;
          order.items[index].price = item.price;
          order.items[index].quantity = item.quantity;
        }
      } else {
        // If the item does not have an id, it is a new item, so push it to the items array
        order.items.push(item);
      }
    }
  }

  // Save the updated Order document
  await order.save();

  // Return the updated Order document to the client
  return order;
};
const deleteAnOrder = () => {};

exports.createOrder = createOrder;
exports.getOrdersOfUser = getOrdersOfUser;
exports.updateAnOrder = updateAnOrder;
exports.deleteAnOrder = deleteAnOrder;
