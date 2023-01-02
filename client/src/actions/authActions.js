import axios from "axios";

export const signUp = (newUser, dispatch) => {
  return axios
    .post("/api/users", newUser)
    .then((res) => {
      if (res.data.success) {
        dispatch({
          type: "USER_SIGNUP_SUCCESS",
          payload: res.data.data,
        });
      } else {
        dispatch({
          type: "USER_SIGNUP_ERROR",
          payload: res.data.error,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: "USER_SIGNUP_ERROR",
        payload: error,
      });
    });
};
