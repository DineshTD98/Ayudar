const mongoose = require("mongoose");

const Userschema = new mongoose.Schema(
  {
    firstname: String,
    lastname: String,
    email: String,
    mobileno: Number,
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("User", Userschema);
