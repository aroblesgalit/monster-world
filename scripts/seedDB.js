const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/monster-world"
);

const userSeed = [
  {
    name: "Ryan Gautier",
    email: "ryangautier2@gmail.com",
    password: "password123"
  },
  {
    name: "John Doe",
    email: "johndoe@gmail.com",
    password: "password456"
  }
];

db.User
  .remove({})
  .then(() => db.User.collection.insertMany(userSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
