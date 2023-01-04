import axios from "axios";

export const getProducts = (dispatch) => {
  dispatch({
    type: "GET_PRODUCTS_LOADING",
  });
  return axios
    .get("/api/products")
    .then((res) => {
      dispatch({
        type: "GET_PRODUCTS",
        payload: res.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: "GET_PRODUCTS_ERROR",
        payload: error,
      });
    });
};
