const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const auth = require("../middleware/authmiddleware");

const {
  createdocument,
  getdocument,
  deletedocument,
} = require("../controller/documentcontroller");

router.post("/createdocument", auth, upload.single("image"), createdocument);

router.get("/getdocument", auth, getdocument);

router.delete("/deletedocument/:id", auth, deletedocument);

module.exports = router;
