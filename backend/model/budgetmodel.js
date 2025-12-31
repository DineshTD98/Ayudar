const mongoose = require("mongoose");

const Expenseschema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    date: { type: Date, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

const expenses = mongoose.model("expenses", Expenseschema);

//subscription model

const subscriptionschema = new mongoose.Schema(
  {
    name: String,
    renewal: String,
    duedate: {
      type: Date,
      required: true,
    },
    price: Number,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);
const subscriptions = mongoose.model("subscription", subscriptionschema);

//createbudget

const createbudgetschema = new mongoose.Schema(
  {

    amount: Number,
    createddate: String,
    source: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);
const createbudget = mongoose.model("createbudget", createbudgetschema);

//categoryschema
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const Categories = mongoose.model("Category", categorySchema);

//creditcard schema

const Creditcardschema = new mongoose.Schema({
  creditcardname: {
    type: String,
    required: true,
  },
  limit: {
    type: Number,
    required: true,
  },
  interest: {
    type: String,
  },
  duedate: {
    type: Date,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
const Creditcardbudget = mongoose.model("Creditcard", Creditcardschema);

// creating the model for nettotal save

const nettotalschema = new mongoose.Schema({
  nettotal: {
    type: Number,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
});
const monthlybudget = mongoose.model("nettotal", nettotalschema)


module.exports = {
  expenses,
  subscriptions,
  createbudget,
  Categories,
  Creditcardbudget,
  monthlybudget
};
