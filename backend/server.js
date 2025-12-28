require("dotenv").config();
const express = require("express");
const app = express();

const cors = require("cors");

const allowedOrigins = [
  "http://localhost:5173",
  "https://ayudar-delta.vercel.app"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], 
  allowedHeaders: ["Content-Type", "Authorization"] 
}));

app.use(express.json());

const mongoose = require("mongoose");

const userrouter = require("./routes/userrouter");
const Documentrouter = require("./routes/documentrouter");
const Budgetrouter = require("./routes/budgetrouter");
const Shoppingrouter=require("./routes/shoppingrouter")


app.get("/home", (req, res) => {
  res.send("thank you for using backend");
});

app.use("/uploads", express.static("uploads"));

app.use("/user", userrouter);
app.use("/documents", Documentrouter);
app.use("/budget", Budgetrouter);
app.use("/shopping",Shoppingrouter)

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