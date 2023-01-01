const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const Cors = require("cors");

require("dotenv").config();

const app = express();

const users = require("./routes/api/users");
const products = require("./routes/api/products");
const orders = require("./routes/api/orders");
const regions = require("./routes/api/regions");

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Now we should be able to access request.body.whatever

const { MONGO_URI } = process.env;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected!");
  })
  .catch((err) => {
    console.log(err);
  });

// Passport middleware
app.use(passport.initialize());

require("./config/passport-config.js")(passport);

app.use(Cors());

app.use("/api/users", users);
app.use("/api/products", products);
app.use("/api/orders", orders);
app.use("/api/regions", regions);

// Server static assets if in production
// Check if we are in production

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static(path.join(__dirname, "client", "build")));
  app.get("*", (req, res) => {
    // __dirname is the current directory name
    //We will tell the server if none of those routes are being hit then look into the build folder index.html
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else {
  const port = process.env.PORT || 5000;

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}
