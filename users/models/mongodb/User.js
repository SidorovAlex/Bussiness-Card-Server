const mongoose = require("mongoose");
const Name = require("./Name");
const Image = require("./Image");
const Address = require("./Address");

const userSchema = new mongoose.Schema({
  name: Name,
  phone: {
    type: String,
    match: RegExp(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/),
    required: true,
  },
  email: {
    type: String,
    match: RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/),
    required: true,
  },
  password: {
    type: String,
    match: RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*-]).{9,}$/),
    required: true,
  },
  image: Image,
  address: Address,
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isBusiness: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("user", userSchema);
module.exports = User;
