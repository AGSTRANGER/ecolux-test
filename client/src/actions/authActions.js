import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";

export const signUp = (newUser, dispatch) => {
  return axios
    .post("/api/users", newUser)
    .then((res) => {
      console.log("🚀 ~ file: authActions.js:7 ~ .then ~ res", res);
      dispatch({
        type: "USER_SIGNUP_SUCCESS",
        payload: res.data,
      });
    })
    .catch((error) => {
      console.log("🚀 ~ file: authActions.js:14 ~ signUp ~ error", error);
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
      console.log("🚀 ~ file: authActions.js:7 ~ .then ~ res", res);
      dispatch({
        type: "USER_SIGNIN_SUCCESS",
        payload: res.data,
      });
      const { token } = res.data;
      console.log("🚀 ~ file: authActions.js:33 ~ .then ~ token", token);
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      console.log("🚀 ~ file: authActions.js:40 ~ .then ~ decoded", decoded);

      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch((error) => {
      console.log("🚀 ~ file: authActions.js:14 ~ signUp ~ error", error);
      dispatch({
        type: "USER_SIGNIN_ERROR",
        payload: error,
      });
    });
};

export const setCurrentUser = (decoded) => {
  return {
    type: "SET_CURRENT_USER",
    payload: decoded,
  };
};
