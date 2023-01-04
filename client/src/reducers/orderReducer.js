const initialState = {
  cart: [],
  orders: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      // Find the product in the cart
      const existingProductIndex = state.cart.findIndex(
        (item) => item._id === action.payload.product_id
      );

      if (existingProductIndex >= 0) {
        // Product already in cart, increment quantity by 1
        const updatedCart = [...state.cart];
        updatedCart[existingProductIndex] = {
          ...updatedCart[existingProductIndex],
          quantity: updatedCart[existingProductIndex].quantity + 1,
        };
        return {
          ...state,
          cart: updatedCart,
        };
      } else {
        // Add product to cart with quantity 1
        return {
          ...state,
          cart: [
            ...state.cart,
            {
              _id: action.payload.product_id,
              title: action.payload.title,
              quantity: 1,
            },
          ],
        };
      }
    case "REMOVE_FROM_CART":
      // Find the product in the cart
      const productIndex = state.cart.findIndex(
        (item) => item._id === action.payload.product_id
      );

      // Remove the product from the cart
      if (productIndex >= 0) {
        return {
          ...state,
          cart: [
            ...state.cart.slice(0, productIndex),
            ...state.cart.slice(productIndex + 1),
          ],
        };
      } else {
        return state;
      }

    case "CREATE_ORDER":
      // Create the order and clear the cart
      return {
        ...state,
        orders: [...state.orders, { cart: state.cart }],
        cart: [],
      };
    default:
      return state;
  }
}
