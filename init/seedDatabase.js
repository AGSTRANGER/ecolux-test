const mongoose = require("mongoose");
const User = require("../Models/User");
const Region = require("../Models/Region");
const Product = require("../Models/Product");
const userServicesHelpers = require("../helpers/services/userServices.helpers");

const seedUsers = async () => {
  const users = [
    {
      name: "name1",
      email: "user1@example.com",
      password: "password1",
      type: "customer",
    },
    {
      name: "name2",
      email: "user2@example.com",
      password: "password2",
      type: "admin",
    },
    {
      name: "name3",
      email: "user3@example.com",
      password: "password3",
      type: "customer_admin",
    },
  ];
  // Hashing passwords
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const { password } = user;
    const salt = await userServicesHelpers.genSalt();
    const hash = await userServicesHelpers.genHash(salt, password);
    user.password = hash;
  }

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
  await Region.deleteMany({}).catch((error) => {
    console.error(error);
  });
  const created_regions = await Region.insertMany(regions).catch((error) => {
    console.error(error);
  });

  return created_regions;
};
const seedProducts = async (regions) => {
  const products = [
    {
      title: "T-Shirt",
      description: "A stylish t-shirt",
      image_url: "https://example.com/tshirt.jpg",
      price: 20,
      sku: "TSHIRT001",
      stock: 100,
      region: regions[Math.floor(Math.random() * regions.length)]._id,
    },
    {
      title: "Pants",
      description: "A pair of comfortable pants",
      image_url: "https://example.com/pants.jpg",
      price: 30,
      sku: "PANTS001",
      stock: 50,
      region: regions[Math.floor(Math.random() * regions.length)]._id,
    },
    {
      title: "Mug",
      description: "A ceramic mug",
      image_url: "https://example.com/mug.jpg",
      price: 10,
      sku: "MUG001",
      stock: 75,
      region: regions[Math.floor(Math.random() * regions.length)]._id,
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

const seedDatabase = async () => {
  await seedUsers();
  const regions = await seedRegions();
  await seedProducts(regions);
  // db.close();
};

mongoose.connect("mongodb://localhost:27017/ecommerce", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", seedDatabase);
