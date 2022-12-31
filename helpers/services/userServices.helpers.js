const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { AUTH_SECRET } = process.env;

// first generate a random salt
const genSalt = () => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        reject(err);
      } else {
        resolve(salt);
      }
    });
  });
};

// hash the password with the salt
const genHash = (salt, password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, salt, function (err, hash) {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
};

const verifyPassword = async (
  user_password,
  sign_in_password,
  user_id,
  email
) => {
  let result = { does_password_match: null, sign_in_token: null };
  const does_password_match = await bcrypt.compare(
    sign_in_password,
    user_password
  );
  result.does_password_match = does_password_match;

  if (does_password_match) {
    //Sign Token
    /**First we need to create a jwt payload, you can put whatever userinformation here except for the pwd */
    const payload = {
      id: user_id,
      email: email,
    };

    const expiry_date = { expiresIn: 3600 * 24 * 356 };
    result.sign_in_token =
      "Bearer " + jwt.sign(payload, AUTH_SECRET, expiry_date);
  }

  return result;
};

exports.genSalt = genSalt;
exports.genHash = genHash;
exports.verifyPassword = verifyPassword;
