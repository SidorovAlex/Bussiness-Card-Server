const mongoose = require("mongoose");
const Image = require("./Image");
const Address = require("./Address");

const cardSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: 2,
    required: true,
  },
  subtitle: {
    type: String,
    minLength: 2,
    required: true,
  },
  description: {
    type: String,
    minLength: 2,
    required: true,
  },
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
  web: {
    type: String,
    match: RegExp(
      /^(https?:\/\/)?([a-zA-Z0-9.-]+)(:[0-9]{1,4})?(\/[a-zA-Z0-9-%@:;.,~#&+_=?]*\b(?:\/[a-zA-Z0-9-%@:;.,~#&+_=?]+)*\/?)?$/
    ),
  },
  image: Image,
  address: Address,
  bizNumber: {
    type: Number,
    min: 100_000_000,
    max: 999_999_999,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  likes: [String],
});

const Card = mongoose.model("card", cardSchema);

module.exports = Card;
