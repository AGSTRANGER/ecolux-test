const mongoose = require("mongoose");
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
  let result = { updated_order: null };
  const order_search_option = {
    _id: order_id,
    user: user_id,
  };
  const order = await Order.findById(order_search_option);
  if (!order) {
    throw new Error("Order does not exist");
  }
  if (!!shipping_address) {
    order.shipping_address = shipping_address;
  }

  if (items) {
    const has_user_updated_old_items_or_picked_new_items = items.length > 0;
    if (has_user_updated_old_items_or_picked_new_items) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        // Check if the item has an id, which indicates that it is an existing item in the array
        const is_this_old_item = !!item._id;
        if (is_this_old_item) {
          // Find the index of the item in the items array
          const index = order.items.findIndex(
            (i) => i._id.toString() == item._id
          );
          console.log(
            "🚀 ~ file: orderServices.js:56 ~ updateAnOrder ~ index",
            index
          );
          // The item logically should exist
          // Since it's an old item
          // But, we still need to make sure it actually exists
          const does_item_exist = index > -1;
          // If the item exists, update its fields
          if (does_item_exist) {
            if (!!item.quantity) {
              order.items[index].quantity = item.quantity;
            }
          }
        } else {
          // New item
          // Verify that there's still stock
          order.items.push(item);
        }
      }
    } else {
      // User has removed all items from order
      order.items = [];
    }
  }

  result.updated_order = await order.save();

  return result;
};
const deleteAnOrder = () => {};

exports.createOrder = createOrder;
exports.getOrdersOfUser = getOrdersOfUser;
exports.updateAnOrder = updateAnOrder;
exports.deleteAnOrder = deleteAnOrder;
