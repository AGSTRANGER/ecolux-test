import isEmpty from "../utils/isEmpty";

const initialState = {
  sign_up: {
    data: null,
    error: null,
  },
  sign_in: {
    data: null,
    error: null,
  },
  current_user: null,
  isAuthenticated: false,
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
    case "SET_CURRENT_USER":
      return {
        ...state,
        current_user: action.payload,
        // Because, if the payload which is the decoded token is filled that means that the user is authenticated
        // If it's an empty object then we shouldn't be authenticated
        // This way when we want to log-out  we can simply pass an empty object in the payload :)
        // And the user will go back to being an empty object
        isAuthenticated: !isEmpty(action.payload),
      };

    default:
      return state;
  }
}
