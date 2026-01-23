const express = require("express");
const router = express.Router();
const auth = require("../middleware/authmiddleware")


const { createevent, getevents, updateevent, deleteevent } = require("../controller/eventcontroller")

router.post("/createevent", auth, createevent)
router.get("/getevents", auth, getevents)
router.put("/updateevent/:id", auth, updateevent)
router.delete("/deleteevent/:id", auth, deleteevent)


module.exports = router;


