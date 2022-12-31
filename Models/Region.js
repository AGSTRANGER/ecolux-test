const mongoose = require("mongoose");

const regionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  tax: {
    type: Number,
    required: true,
  },
});

const Region = mongoose.model("Region", regionSchema);
module.exports = Region;
