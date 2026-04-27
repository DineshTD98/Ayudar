const express = require("express");
const { createuser, getuser, forgotPassword, resetPassword } = require("../controller/usercontroller");
const router = express.Router();

router.post("/login", getuser);
router.post("/createuser", createuser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;
