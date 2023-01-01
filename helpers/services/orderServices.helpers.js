const Product = require("../../Models/Product");

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

Product.find((err, products) => {
  if (err) {
    console.error(err);
  } else {
    console.log(products);
  }
});

exports.checkIfItemsStocksAreStillAvailable =
  checkIfItemsStocksAreStillAvailable;
exports.checkIfItemStockIsStillAvailable = checkIfItemStockIsStillAvailable;
