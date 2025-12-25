const express = require("express");
const { createuser, getuser } = require("../controller/usercontroller");
const router = express.Router();

router.post("/login", getuser);
router.post("/createuser", createuser);

module.exports = router;
