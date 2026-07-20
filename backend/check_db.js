require("dotenv").config();
const mongoose = require("mongoose");
const { monthlybudget, createbudget, Creditcardbudget } = require("./model/budgetmodel");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/ayudar";

mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log("Connected to MongoDB");
    
    const monthlyDocs = await monthlybudget.find({});
    console.log("monthlybudget (nettotals) docs:", monthlyDocs);
    
    const createDocs = await createbudget.find({});
    console.log("createbudget docs:", createDocs);
    
    const creditDocs = await Creditcardbudget.find({});
    console.log("Creditcardbudget docs:", creditDocs);
    
    process.exit(0);
  })
  .catch(err => {
    console.error("Error:", err);
    process.exit(1);
  });
