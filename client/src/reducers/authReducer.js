const initialState = {
  sign_up: {
    data: null,
    error: null,
  },
  sign_in: {
    data: null,
    error: null,
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "USER_SIGNUP_SUCCESS":
      return {
        ...state,
        sign_up: {
          data: action.payload,
          error: null,
        },
      };
    case "USER_SIGNUP_ERROR":
      return {
        ...state,
        sign_up: {
          data: null,
          error: action.payload,
        },
      };
    case "USER_SIGNIN_SUCCESS":
      return {
        ...state,
        sign_in: {
          data: action.payload,
          error: null,
        },
      };
    case "USER_SIGNIN_ERROR":
      return {
        ...state,
        sign_in: {
          data: null,
          error: action.payload,
        },
      };
    default:
      return state;
  }
}
