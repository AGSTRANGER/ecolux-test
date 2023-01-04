const initialState = {
  cart: {
    _id: null,
    items: [],
  },
  carts: [],
  order_creation: {
    loading: null,
    data: null,
    error: null,
  },
  orders: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      // Find the product in the cart
      const existingProductIndex = state.cart.items.findIndex(
        (item) => item._id === action.payload.product_id
      );

      if (existingProductIndex >= 0) {
        // Product already in cart, increment quantity by 1
        const updatedCart = { ...state.cart };
        updatedCart.items[existingProductIndex] = {
          ...updatedCart.items[existingProductIndex],
          quantity: updatedCart.items[existingProductIndex].quantity + 1,
        };
        return {
          ...state,
          cart: updatedCart,
        };
      } else {
        // Add product to cart with quantity 1
        return {
          ...state,
          cart: {
            ...state.cart,
            items: [
              ...state.cart.items,
              {
                _id: action.payload.product_id,
                title: action.payload.title,
                quantity: 1,
              },
            ],
          },
        };
      }
    case "REMOVE_FROM_CART":
      // Find the product in the cart
      const productIndex = state.cart.items.findIndex(
        (item) => item._id === action.payload.product_id
      );

      // Remove the product from the cart
      if (productIndex >= 0) {
        return {
          ...state,
          cart: {
            ...state.cart,
            items: [
              ...state.cart.items.slice(0, productIndex),
              ...state.cart.items.slice(productIndex + 1),
            ],
          },
        };
      } else {
        return state;
      }

    case "CREATE_CART":
      // Create the cart and clear the cart
      const newCart = {
        _id: Date.now(), // use current timestamp as unique identifier for cart
        items: state.cart.items,
      };
      return {
        ...state,
        carts: [...state.carts, newCart],
        cart: {
          _id: null,
          items: [],
        },
      };

    case "CREATE_ORDER_LOADING":
      return {
        ...state,
        order_creation: {
          loading: true,
          data: null,
          error: null,
        },
      };

    case "CREATE_ORDER_SUCCESS":
      // Find the index of the cart that was used to create the order
      const cartIndex = state.carts.findIndex(
        (cart) => cart._id === action.payload.cart_id
      );
      console.log("🚀 ~ file: orderReducer.js:103 ~ cartIndex", cartIndex);

      // Remove the cart from the list of carts
      if (cartIndex >= 0) {
        return {
          ...state,
          order_creation: {
            loading: false,
            data: action.payload.data,
            error: null,
          },
          orders: [...state.orders, action.payload.data],
          carts: [
            ...state.carts.slice(0, cartIndex),
            ...state.carts.slice(cartIndex + 1),
          ],
        };
      } else {
        return state;
      }
    case "CREATE_ORDER_ERROR":
      return {
        ...state,
        order_creation: {
          loading: false,
          data: null,
          error: action.payload,
        },
      };

    default:
      return state;
  }
}
