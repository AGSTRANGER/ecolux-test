import axios from "axios";

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
