const {
  expenses,
  subscriptions,
  createbudget,
  Categories,
  Creditcardbudget,
  monthlybudget
} = require("../model/budgetmodel");

// CREATE EXPENSE (Single / Bulk)

exports.createexpense = async (req, res) => {
  try {
    const data = Array.isArray(req.body) ? req.body : [req.body];

    for (let exp of data) {
      const { title, category, amount, date } = exp;

      if (!title || !category || !amount || !date) {
        return res.status(400).json({
          message: "all fields required",
        });
      }

      // Validate category
      const categoryExists = await Categories.findOne({
        _id: category,
        userId: req.user.id,
      });

      if (!categoryExists) {
        return res.status(400).json({
          message: "invalid category",
        });
      }
    }

    const expense = await expenses.insertMany(
      data.map((item) => ({
        ...item,
        userId: req.user.id,
      })),
    );

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
    const categories = await Categories.find().sort({ createdAt: -1 });

    return res.status(200).json(categories);
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
    const subscription = await subscriptions.find({ userId: req.user.id });

    if (subscription.length === 0) {
      return res.status(400).json({
        message: "no subscription",
      });
    }

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

    if (budget.length === 0) {
      return res.status(400).json({
        message: "no budget to get",
      });
    }

    return res.status(200).json({
      message: "data received",
      budget,
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

exports.monthlybudget=async(req,res)=>{
  try{
      const {nettotal}=req.body
      if(!nettotal){
        return res.status(400).json({
          message:'no nettotal to add'
        })
      }
      const activebudget=await monthlybudget.create({
        nettotal,
        userId:req.user.id
      })

      return res.status(200).json({
        message:"successfully added",
        activebudget
      })
  }
  catch(err){
     return res.status(500).json({
      message: err.message,
    });
  }
}

//getting nettotal to add in the total amount

exports.gettotalbudget=async(req,res)=>{
  try{
     const totalbudget=await monthlybudget.find({userId:req.user.id})
     if(totalbudget.length === 0){
        return res.status(400).json({
          message:'no budget created'
        })
     }
     return res.status(200).json({
        message:'successfully received budget',
        totalbudget
     })
  }
  catch(err){
    return res.status(500).json({
      message: err.message,
    });
  }
}
