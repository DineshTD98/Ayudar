require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");

const mongoose = require("mongoose");
const userrouter = require("./routes/userrouter");
const Documentrouter = require("./routes/documentrouter");
const Budgetrouter = require("./routes/budgetrouter");
app.use(express.json());
app.use(cors());
const port = 3000;
app.get("/home", (req, res) => {
  res.send("thank you for using backend");
});
app.use("/uploads", express.static("uploads"));

app.use("/user", userrouter);
app.use("/documents", Documentrouter);
app.use("/budget", Budgetrouter);
//db connection
mongoose.connect("mongodb://127.0.0.1:27017/ayudar").then(() => {
  console.log("mongodb connected");
});

// log whether JWT secret is loaded
if (process.env.JWT_SECRET) {
  console.log("JWT_SECRET is set");
} else {
  console.warn("JWT_SECRET is NOT set. auth will fail without it.");
}

app.listen(port, () => {
  console.log("server is running");
});

// Error handling middleware for multer and other errors
app.use((err, req, res, next) => {
  console.error(err);
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({ message: "File too large" });
  }
  return res.status(400).json({ message: err.message });
});
