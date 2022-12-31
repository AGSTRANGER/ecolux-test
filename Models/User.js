const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["customer", "admin", "customer_admin"],
    default: "customer",
  },
});

const User = mongoose.model("users", userSchema);
module.exports = User;
