const mongoose = require("mongoose");

const Image = new mongoose.Schema({
  url: {
    type: String,
    match: RegExp(
      /^(https?:\/\/)?([a-zA-Z0-9.-]+)(:[0-9]{1,4})?(\/[a-zA-Z0-9-%@:;.,~#&+_=?]*\b(?:\/[a-zA-Z0-9-%@:;.,~#&+_=?]+)*\/?)?$/
    ),
  },
  alt: {
    type: String,
    minLength: 2,
  },
});

module.exports = Image;
