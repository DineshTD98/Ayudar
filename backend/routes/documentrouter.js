const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const auth = require("../middleware/authmiddleware");

const {
  createdocument,
  getdocument,
  deletedocument,
  createdocumentcategory,
  getdocumentcategory,
  searchdocument,
} = require("../controller/documentcontroller");

router.post("/createdocument", auth, upload.single("image"), createdocument);

router.get("/getdocument", auth, getdocument);

router.delete("/deletedocument/:id", auth, deletedocument);

router.post("/createdocumentcategory", auth, createdocumentcategory);

router.get("/getdocumentcategory", auth, getdocumentcategory);

router.get("/searchdocument/:search", auth, searchdocument);

module.exports = router;
