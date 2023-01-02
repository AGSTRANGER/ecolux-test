const express = require("express");
const router = express.Router();
const userServices = require("../../services/userServices");

// @route  POST api/users/
// @desc   Sign up user
// @access Public

router.post("/", (req, res) => {
  const { name, email, password } = req.body;
  userServices
    .signupUser(name, email, password)
    .then((result) => {
      res.status(200).json({ message: "Sign-up was successful" });
    })
    .catch((error) => {
      res.status(500).send("Sign-up was unsuccessful");
    });
});

// @route  POST api/users/signin
// @desc   Sign in user
// @access Public

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  userServices
    .signinUser(email, password)
    .then((result) => {
      const { sign_in_token } = result;
      res.status(200).json({ token: sign_in_token });
    })
    .catch((error) => {
      res.status(500).send("Sign-in was unsuccessful");
    });
});

module.exports = router;
