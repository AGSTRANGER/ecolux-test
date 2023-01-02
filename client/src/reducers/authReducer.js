const initialState = {
  currentUser: null,
  signUpError: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "USER_SIGNUP_SUCCESS":
      return {
        ...state,
        currentUser: action.payload,
        signUpError: null,
      };
    case "USER_SIGNUP_ERROR":
      return {
        ...state,
        currentUser: null,
        signUpError: action.payload,
      };
    default:
      return state;
  }
}
