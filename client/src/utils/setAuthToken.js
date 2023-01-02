// What we will do here will prevent us from manually making sure of having the token inside each relevant request
// If we're logged-in, we can call this function and it will always attach that authorization header
import axios from "axios";

const setAuthToken = (token) => {
  if (token) {
    // Apply to every request
    axios.defaults.headers.common = {
      Authorization: token,
    };
  } else {
    // Delete the Auth header
    axios.defaults.headers.common = {
      Authorization: token,
    };
  }
};

export default setAuthToken;
