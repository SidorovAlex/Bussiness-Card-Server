const mongoose = require("mongoose");

const Name = new mongoose.Schema({
  first: {
    type: String,
    minLength: 2,
    required: true,
  },
  last: {
    type: String,
    minLength: 2,
    required: true,
  },
});

module.exports = Name;
