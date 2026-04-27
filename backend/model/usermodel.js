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
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    userprofile: String,
    language: { type: String, default: "English" },
    currency: { type: String, default: "INR" },
    notifications: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("User", Userschema);
