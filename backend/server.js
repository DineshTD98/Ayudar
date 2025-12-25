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

const port = process.env.PORT || 3000; // CHANGED: Use Render's port

app.get("/home", (req, res) => {
  res.send("thank you for using backend");
});
app.use("/uploads", express.static("uploads"));

app.use("/user", userrouter);
app.use("/documents", Documentrouter);
app.use("/budget", Budgetrouter);

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ayudar';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Log whether JWT secret is loaded
if (process.env.JWT_SECRET) {
  console.log("✅ JWT_SECRET is set");
} else {
  console.warn("⚠️ JWT_SECRET is NOT set. Auth will fail without it.");
}

// CHANGED: Listen on 0.0.0.0 for Render
app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Server is running on port ${port}`);
});

// Error handling middleware for multer and other errors
app.use((err, req, res, next) => {
  console.error(err);
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({ message: "File too large" });
  }
  return res.status(400).json({ message: err.message });
});