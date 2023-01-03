import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";

export const signUp = (newUser, dispatch) => {
  return axios
    .post("/api/users", newUser)
    .then((res) => {
      dispatch({
        type: "USER_SIGNUP_SUCCESS",
        payload: res.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: "USER_SIGNUP_ERROR",
        payload: error,
      });
    });
};

export const signIn = (newUser, dispatch) => {
  return axios
    .post("/api/users/signin", newUser)
    .then((res) => {
      dispatch({
        type: "USER_SIGNIN_SUCCESS",
        payload: res.data,
      });
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);

      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch((error) => {
      dispatch({
        type: "USER_SIGNIN_ERROR",
        payload: error,
      });
    });
};

export const signOut = (dispatch) => {
  dispatch(setCurrentUser(null));
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
};

export const setCurrentUser = (decoded) => {
  return {
    type: "SET_CURRENT_USER",
    payload: decoded,
  };
};
