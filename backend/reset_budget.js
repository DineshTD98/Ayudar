require("dotenv").config();
const mongoose = require("mongoose");
const { monthlybudget, createbudget, Creditcardbudget } = require("./model/budgetmodel");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/ayudar";

mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log("Connected to MongoDB at " + MONGODB_URI);
    
    // Clear the monthlybudget (nettotals) collection
    const res1 = await monthlybudget.deleteMany({});
    console.log(`Cleared monthlybudget (nettotal) collection: deleted ${res1.deletedCount} documents.`);
    
    // Clear createbudget (pending) collection
    const res2 = await createbudget.deleteMany({});
    console.log(`Cleared createbudget collection: deleted ${res2.deletedCount} documents.`);
    
    // Clear Creditcardbudget collection
    const res3 = await Creditcardbudget.deleteMany({});
    console.log(`Cleared Creditcardbudget collection: deleted ${res3.deletedCount} documents.`);

    console.log("Active budget and allocations reset to zero successfully.");
    process.exit(0);
  })
  .catch(err => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  });
