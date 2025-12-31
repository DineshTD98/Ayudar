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
      unique:true
    },
    password: {
      type: String,
      required: true,
    },
    userprofile: String,
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("User", Userschema);
