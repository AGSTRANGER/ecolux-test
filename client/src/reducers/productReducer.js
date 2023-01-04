const initialState = {
  products: {
    loading: null,
    data: null,
    error: null,
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "GET_PRODUCTS_LOADING":
      return {
        ...state,
        products: {
          loading: true,
          data: null,
          error: null,
        },
      };

    case "GET_PRODUCTS":
      return {
        ...state,
        products: {
          loading: false,
          data: action.payload.products,
          error: null,
        },
      };

    case "GET_PRODUCTS_ERROR":
      return {
        ...state,
        products: {
          loading: false,
          data: null,
          error: action.payload,
        },
      };

    default:
      return state;
  }
}
