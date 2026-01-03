const express = require("express");
const auth = require("../middleware/authmiddleware.js");
const router = express.Router();
const {
  createexpense,
  getexpenses,
  getsubscription,
  createsubscription,
  deletesubscription,
  createbudget,
  getbudget,
  createCategory,
  getCategories,
  creditcard,
  gettotalbudget,
  monthlybudget,
  getcreatebudget,
  getcreditbudget
} = require("../controller/budgetcontroller");
router.post("/createexpense", auth, createexpense);
router.get("/getexpense", auth, getexpenses);

router.post("/createcategory", auth, createCategory);
router.get("/categories", auth, getCategories);

router.post("/createbudget", auth, createbudget);
router.get("/getbudget", auth, getbudget);
router.get("/getcreatebudget", auth, getcreatebudget);

router.post("/createsubscription", auth, createsubscription);
router.get("/getsubscription", auth, getsubscription);
router.delete("/deletesubscription/:id", auth, deletesubscription);

router.post("/creditbudget", auth, creditcard);
router.get("/getcreditbudget", auth, getcreditbudget);
router.post('/monthlybudget', auth, monthlybudget)
router.get('/gettotalbudget', auth, gettotalbudget)
module.exports = router;
