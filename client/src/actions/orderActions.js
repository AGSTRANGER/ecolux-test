import axios from "axios";

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

export const createCart = () => ({
  type: "CREATE_CART",
});

export const createOrder = (orderData, dispatch) => {
  console.log(
    "🚀 ~ file: orderActions.js:23 ~ createOrder ~ dispatch",
    dispatch
  );
  dispatch({
    type: "CREATE_ORDER_LOADING",
  });
  axios
    .post("/api/orders", orderData)
    .then((response) => {
      dispatch({
        type: "CREATE_ORDER_SUCCESS",
        payload: { cart_id: orderData.cart_id, data: response.data },
      });
    })
    .catch((error) => {
      dispatch({
        type: "CREATE_ORDER_ERROR",
        error,
      });
    });
};
