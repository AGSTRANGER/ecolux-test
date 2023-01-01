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
      "There is no longer stock available for one or more of the ordered items or the product does not exist."
    );
  }
  return result;
};
const getOrdersOfUser = () => {};

const updateAnOrder = async (
  order_id,
  user_id,
  shipping_address,
  items_to_update
) => {
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

  if (items_to_update) {
    for (let i = 0; i < items_to_update.length; i++) {
      const item_to_update = items_to_update[i];
      // Check if the item has an id, which indicates that it is an existing item in the array

      // Find the index of the item in the items array
      const index = order.items.findIndex(
        (previously_ordered_item) =>
          previously_ordered_item.product.toString() == item_to_update._id
      );
      console.log(
        "🚀 ~ file: orderServices.js:56 ~ updateAnOrder ~ index",
        index
      );
      const is_this_old_item = index > -1;
      // If the item exists, update its fields
      if (is_this_old_item) {
        if (!!item_to_update.quantity) {
          order.items[index].quantity = item_to_update.quantity;
        }
      } else {
        // New item
        // Verify that there's still stock
        const { is_item_stock_still_available, available_ordered_item_info } =
          await orderServicesHelpers.checkIfItemStockIsStillAvailable(
            item_to_update
          );
        if (is_item_stock_still_available) {
          order.items.push(available_ordered_item_info);
        } else {
          throw new Error("New item added with not enough available stock");
        }
      }
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
