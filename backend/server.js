require("dotenv").config();
const express = require("express");
const app = express();

const cors = require("cors");

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://ayudar-delta.vercel.app"
  ],
  credentials: true
}));

const mongoose = require("mongoose");

const userrouter = require("./routes/userrouter");
const Documentrouter = require("./routes/documentrouter");
const Budgetrouter = require("./routes/budgetrouter");

app.use(express.json());



app.get("/home", (req, res) => {
  res.send("thank you for using backend");
});

app.use("/uploads", express.static("uploads"));

app.use("/user", userrouter);
app.use("/documents", Documentrouter);
app.use("/budget", Budgetrouter);

// NO LOCAL FALLBACK
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI not set");
}

mongoose.connect(MONGODB_URI)
  .then(() => console.log("MongoDB Atlas connected"))
  .catch(err => console.error("MongoDB error:", err));

if (!process.env.JWT_SECRET) {
  console.warn("JWT_SECRET is missing");
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});