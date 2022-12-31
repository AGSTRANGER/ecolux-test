const User = require("../Models/User");
const userServicesHelpers = require("../helpers/services/userServices.helpers");

const signupUser = async (email, password) => {
  const newUser = new User({
    email,
    password,
    type: "customer",
  });
  const salt = await userServicesHelpers.genSalt();
  const hash = await userServicesHelpers.genHash(salt, password);
  newUser.password = hash;
  await newUser.save();
};

const signinUser = async (email, password) => {
  let result = {
    sign_in_token: null,
  };
  const user = await User.findOne({
    email: {
      $regex: new RegExp(email, "i"),
    },
  });
  if (!user) {
    throw new Error("User does not exist");
  }
  const user_password = user.password;
  const sign_in_password = password;
  const { sign_in_token, does_password_match } =
    await userServicesHelpers.verifyPassword(
      user_password,
      sign_in_password,
      user._id,
      email
    );

  if (!does_password_match) {
    throw new Error("User has entered wrong password");
  } else {
    result.sign_in_token = sign_in_token;
  }
  return result;
};

exports.signupUser = signupUser;
exports.signinUser = signinUser;
