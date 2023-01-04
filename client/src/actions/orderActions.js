export const addToCart = (product_id, title) => ({
  type: "ADD_TO_CART",
  payload: {
    product_id,
    title,
  },
});

export const removeFromCart = (product_id) => ({
  type: "REMOVE_FROM_CART",
  payload: {
    product_id,
  },
});
