const {
  expenses,
  subscriptions,
  createbudget,
  Categories,
  Creditcardbudget,
  monthlybudget
} = require("../model/budgetmodel");
const User = require("../model/usermodel");

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const ensureCategory = async (categoryInput) => {
  if (!categoryInput) return null;

  if (typeof categoryInput === "string") {
    const trimmedValue = categoryInput.trim();

    if (!trimmedValue) return null;

    if (trimmedValue.match(/^[0-9a-fA-F]{24}$/)) {
      const existingById = await Categories.findOne({ _id: trimmedValue });
      if (existingById) return existingById._id;
    }

    const existingByName = await Categories.findOne({
      name: {
        $regex: `^${escapeRegex(trimmedValue)}$`,
        $options: "i",
      },
    });

    if (existingByName) return existingByName._id;

    const created = await Categories.create({ name: trimmedValue });
    return created._id;
  }

  return categoryInput;
};

// CREATE EXPENSE (Single / Bulk)

exports.createexpense = async (req, res) => {
  try {
    const data = Array.isArray(req.body) ? req.body : [req.body];
    const preparedData = [];

    for (let exp of data) {
      const { title, category, amount, date } = exp;

      if (!title || !category || !amount || !date) {
        return res.status(400).json({
          message: "all fields required",
        });
      }

      const categoryId = await ensureCategory(category);

      if (!categoryId) {
        return res.status(400).json({
          message: "invalid category",
        });
      }

      preparedData.push({
        ...exp,
        category: categoryId,
        userId: req.user.id,
      });
    }

    const inserted = await expenses.insertMany(preparedData);

    const expense = await expenses.find({ _id: { $in: inserted.map(e => e._id) } }).populate("category", "name");

    return res.status(200).json({
      message: "expense saved",
      expense,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

// GET ALL EXPENSES

exports.getexpenses = async (req, res) => {
  try {
    const Expense = await expenses
      .find({ userId: req.user.id })
      .populate("category", "name");

    return res.status(200).json({
      Expense,
      message: "request successful",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

//CREATE CATEGORY

exports.createCategory = async (req, res) => {
  try {
    const categories = req.body;

    if (!Array.isArray(categories) || categories.length === 0) {
      return res.status(400).json({
        message: "categories array is required",
      });
    }

    const docs = categories.map((cat) => ({
      name: cat.name,
    }));

    const created = await Categories.insertMany(docs);

    res.status(201).json({
      message: "categories created successfully",
      created,
    });
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
};

//GET CATEGORIES (for dropdown)
exports.getCategories = async (req, res) => {
  try {
    const defaultCategories = [
      "Food",
      "Family purchase",
      "Travel",
      "Shopping",
      "Entertainment",
      "Work",
      "Groceries",
      "Others"
    ];

    const existingCats = await Categories.find({
      name: { $in: defaultCategories.map(name => new RegExp(`^${escapeRegex(name)}$`, "i")) }
    });

    const existingNames = existingCats.map(c => c.name.toLowerCase());
    
    const missingCats = defaultCategories
      .filter(name => !existingNames.includes(name.toLowerCase()))
      .map(name => ({ name }));

    if (missingCats.length > 0) {
      await Categories.insertMany(missingCats);
    }

    const categories = await Categories.aggregate([
      {
        $addFields: {
          safeName: { $ifNull: ["$name", ""] }
        }
      },
      {
        $addFields: {
          isOthers: {
            $cond: [
              { $eq: ["$safeName", "Others"] },
              1,
              0
            ]
          }
        }
      },
      {
        $sort: {
          isOthers: 1,
          safeName: 1
        }
      },
      {
        $project: {
          safeName: 0
        }
      }
    ]);



    return res.status(200).json({
      categories
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

//subscription creation
exports.createsubscription = async (req, res) => {
  try {
    const { name, renewal, duedate, price } = req.body;

    if (!name || !renewal || !duedate || !price) {
      return res.status(400).json({
        message: "invalid credentials",
      });
    }

    const dateOnly = new Date(duedate);
    dateOnly.setHours(0, 0, 0, 0);

    const subscriptionlist = await subscriptions.create({
      name,
      renewal,
      duedate: dateOnly,
      price,
      userId: req.user.id,
    });

    return res.status(201).json({
      message: "subscription created",
      subscriptionlist,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

//get subscription
exports.getsubscription = async (req, res) => {
  try {

    if (!req.user || !req.user.id) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    const subscription = await subscriptions.find({ userId: req.user.id });

    return res.status(200).json({
      subscription,
      message: "request successful",
    });

  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

//delete subscription
exports.deletesubscription = async (req, res) => {
  try {
    const deletedsub = await subscriptions.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!deletedsub) {
      return res.status(400).json({
        message: "nothing to delete",
      });
    }

    return res.status(200).json({
      message: "subscription removed successfully",
      deletedid: deletedsub._id,
    });
  } catch (err) {
    return res.status(500).json({
      message: "server error",
    });
  }
};

//create budget
exports.createbudget = async (req, res) => {
  try {
    const { amount, createddate, source } = req.body;

    if (!amount) {
      return res.status(400).json({
        message: "no budget to add",
      });
    }

    const Createdbudget = await createbudget.create({
      amount,
      createddate,
      source,
      userId: req.user.id,
    });

    return res.status(200).json({
      message: "budget saved",
      Createdbudget,
    });
  } catch (err) {
    return res.status(500).json({
      message: "server error",
    });
  }
};

//get budget
exports.getbudget = async (req, res) => {
  try {
    const budget = await createbudget.find({ userId: req.user.id });
    return res.status(200).json({
      message: "data received",
      budget: budget || [],
    });
  } catch (err) {
    return res.status(500).json({
      message: "server error",
    });
  }
};

//creditcard budget

exports.creditcard = async (req, res) => {
  try {
    const { creditcardname, limit, duedate, interest } = req.body;

    const creditbudget = await Creditcardbudget.create({
      creditcardname,
      limit,
      interest,
      duedate,
      userId: req.user.id,
    });

    return res.status(200).json({
      message: "creditcard budget created",
      creditbudget,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

// monthly total budget to add to the total amount

exports.monthlybudget = async (req, res) => {
  try {
    const { nettotal } = req.body
    if (!nettotal) {
      return res.status(400).json({
        message: 'no nettotal to add'
      })
    }
    const activebudget = await monthlybudget.create({
      nettotal,
      userId: req.user.id
    })

    return res.status(200).json({
      message: "successfully added",
      activebudget
    })
  }
  catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
}

//getting nettotal to add in the total amount

exports.gettotalbudget = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const currentMonthStr = new Date().toISOString().slice(0, 7); // e.g., "2026-07"
    let lastMonthSavings = user?.lastMonthSavings || 0;

    // Process Rollover
    if (user && user.lastRolloverMonth && user.lastRolloverMonth !== currentMonthStr) {
      // Calculate remaining budget based on ALL lifetime data (since previous months tracked lifetime)
      const totalBudgets = await monthlybudget.find({ userId: req.user.id });
      const totalAmount = totalBudgets.reduce((sum, item) => sum + Number(item.nettotal || 0), 0);
      
      const pendingBudgets = await createbudget.find({ userId: req.user.id, status: { $ne: "confirmed" } });
      const totalPendingIncome = pendingBudgets.reduce((sum, item) => sum + Number(item.amount || 0), 0);

      const allExpenses = await expenses.find({ userId: req.user.id });
      const overallExpense = allExpenses.reduce((sum, exp) => sum + Number(exp.amount || 0), 0);
      
      const allSubscriptions = await subscriptions.find({ userId: req.user.id });
      const totalSubMoney = allSubscriptions.reduce((sum, sub) => sum + Number(sub.price || 0), 0);
      
      const remaining = (totalAmount + totalPendingIncome) - (overallExpense + totalSubMoney);
      
      user.lastMonthSavings = remaining > 0 ? remaining : 0;
      user.lastRolloverMonth = currentMonthStr;
      await user.save();
      
      lastMonthSavings = user.lastMonthSavings;

      // Reset monthlybudget to the saved amount
      await monthlybudget.deleteMany({ userId: req.user.id });
      await monthlybudget.create({ nettotal: user.lastMonthSavings, userId: req.user.id });
      
      // Confirm all pending budgets so they are moved to history
      await createbudget.updateMany({ userId: req.user.id, status: "pending" }, { $set: { status: "confirmed" } });
    } else if (user && !user.lastRolloverMonth) {
      user.lastRolloverMonth = currentMonthStr;
      await user.save();
    }

    const totalbudget = await monthlybudget.find({ userId: req.user.id });
    
    return res.status(200).json({
      message: 'successfully received budget',
      totalbudget: totalbudget || [],
      lastMonthSavings
    })
  }
  catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
}

//getting creditcard budget
exports.getcreditbudget = async (req, res) => {
  try {
    const creditbudget = await Creditcardbudget.findOne({ userId: req.user.id }).sort({ _id: -1 });
    return res.status(200).json({
      message: 'successfully received credit budget',
      creditbudget: creditbudget || null
    })
  }
  catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
}

//get salarydate from createbudget

exports.getcreatebudget = async (req, res, next) => {
  try {
    const allcreatebudget = await createbudget.find({ userId: req.user.id })
    return res.status(200).json({
      message: 'successfully received budget',
      allcreatebudget: allcreatebudget || []
    })
  }
  catch (error) {
    next(error)
  }
}


// deleting the budget

exports.deletebudget = async (req, res, next) => {
  try {
    const deleted = await createbudget.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    })
    res.status(201).json({
      message: "item deleted successfully"
    })
  }
  catch (error) {
    next(error)
  }
}

// deleting the total budget history
exports.deletetotalbudget = async (req, res, next) => {
  try {
    await monthlybudget.deleteMany({ userId: req.user.id });
    res.status(200).json({
      message: "Total budget history cleared successfully"
    });
  } catch (error) {
    next(error);
  }
};

// clearing credit card budget
exports.clearcreditcard = async (req, res, next) => {
  try {
    await Creditcardbudget.deleteMany({ userId: req.user.id });
    res.status(200).json({
      message: "Credit card configuration cleared"
    });
  } catch (error) {
    next(error);
  }
};

// deleting a specific monthly budget record
exports.deletemonthlybudget = async (req, res, next) => {
  try {
    const deleted = await monthlybudget.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });
    if (!deleted) return res.status(404).json({ message: "Record not found" });
    res.status(200).json({ message: "Budget record removed successfully" });
  } catch (error) {
    next(error);
  }
};

// clear all pending createbudget entries for a user (after cycle confirm)
exports.clearallcreatebudget = async (req, res, next) => {
  try {
    await createbudget.updateMany(
      { userId: req.user.id, status: "pending" },
      { $set: { status: "confirmed" } }
    );
    res.status(200).json({ message: "All pending budget entries confirmed" });
  } catch (error) {
    next(error);
  }
};

exports.deleteexpense = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedExpense = await expenses.findOneAndDelete({ _id: id, userId: req.user.id });
    if (!deletedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    return res.status(200).json({ message: "Successfully deleted expense", deletedExpense });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
