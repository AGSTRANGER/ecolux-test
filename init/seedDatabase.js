const mongoose = require("mongoose");
const User = require("../Models/User");
const Region = require("../Models/Region");
const Product = require("../Models/Product");
const Order = require("../Models/Order");

const seedUsers = async () => {
  const users = [
    {
      email: "user1@example.com",
      password: "password1",
      type: "customer",
    },
    {
      email: "user2@example.com",
      password: "password2",
      type: "admin",
    },
    {
      email: "user3@example.com",
      password: "password3",
      type: "customer_admin",
    },
  ];

  User.deleteMany({}, (err) => {
    if (err) {
      console.error(err);
    } else {
      User.insertMany(users, (err, docs) => {
        if (err) {
          console.error(err);
        } else {
          console.log(`${docs.length} users created`);
        }
      });
    }
  });
};
const seedRegions = async () => {
  const regions = [
    { title: "Vietnam", country: "VN", currency: "VND", tax: 10 },
    { title: "Singapore", country: "SG", currency: "SGD", tax: 7 },
    { title: "United States", country: "US", currency: "USD", tax: 5 },
  ];

  Region.deleteMany({}, (err) => {
    if (err) {
      console.error(err);
    } else {
      Region.insertMany(regions, (err, docs) => {
        if (err) {
          console.error(err);
        } else {
          console.log(`${docs.length} regions created`);
        }
      });
    }
  });
};
const seedProducts = async () => {
  const products = [
    {
      title: "T-Shirt",
      description: "A stylish t-shirt",
      image_url: "https://example.com/tshirt.jpg",
      price: 20,
      sku: "TSHIRT001",
      stock: 100,
    },
    {
      title: "Pants",
      description: "A pair of comfortable pants",
      image_url: "https://example.com/pants.jpg",
      price: 30,
      sku: "PANTS001",
      stock: 50,
    },
    {
      title: "Mug",
      description: "A ceramic mug",
      image_url: "https://example.com/mug.jpg",
      price: 10,
      sku: "MUG001",
      stock: 75,
    },
  ];

  Product.deleteMany({}, (err) => {
    if (err) {
      console.error(err);
    } else {
      Product.insertMany(products, (err, docs) => {
        if (err) {
          console.error(err);
        } else {
          console.log(`${docs.length} products created`);
        }
      });
    }
  });
};
const seedOrders = async () => {
  const orders = [
    {
      customer_name: "User 1",
      shipping_address: "123 Main St",
      order_total: 50,
      paid_at: new Date(),
    },
    {
      customer_name: "User 2",
      shipping_address: "456 Main St",
      order_total: 100,
      paid_at: new Date(),
    },
    {
      customer_name: "User 3",
      shipping_address: "789 Main St",
      order_total: 75,
      paid_at: new Date(),
    },
  ];

  Order.deleteMany({}, (err) => {
    if (err) {
      console.error(err);
    } else {
      Order.insertMany(orders, (err, docs) => {
        if (err) {
          console.error(err);
        } else {
          console.log(`${docs.length} orders created`);
        }
      });
    }
  });
};
const seedDatabase = async () => {
  await Promise.all([seedUsers(), seedRegions(), seedProducts(), seedOrders()]);
};

mongoose.connect("mongodb://localhost:27017/ecommerce", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", seedDatabase);
