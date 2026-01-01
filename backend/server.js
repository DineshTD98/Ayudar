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
  methods: ["GET", "POST", "PUT","PATCH", "DELETE", "OPTIONS"], 
  allowedHeaders: ["Content-Type", "Authorization"] 
}));

app.use(express.json());

const mongoose = require("mongoose");

const userrouter = require("./routes/userrouter");
const Documentrouter = require("./routes/documentrouter");
const Budgetrouter = require("./routes/budgetrouter");
const Shoppingrouter=require("./routes/shoppingrouter")
const profilerouter=require("./routes/profilerouter")
const eventrouter=require("./routes/eventroute")

app.get("/home", (req, res) => {
  res.send("thank you for using backend");
});

app.use("/uploads", express.static("uploads"));

app.use("/user", userrouter);
app.use("/documents", Documentrouter);
app.use("/budget", Budgetrouter);
app.use("/shopping",Shoppingrouter)
app.use('/profile',profilerouter)
app.use("/event",eventrouter)

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

//error handler

const errorhandler=require("./middleware/errorhandler")
 
app.use(errorhandler)

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});