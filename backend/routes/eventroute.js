const express=require("express");
const router=express.Router();
const auth=require("../middleware/authmiddleware")


const {createevent,getevents}=require("../controller/eventcontroller")

router.post("/createevent",auth,createevent)
router.get("/getevents",auth,getevents)


module.exports=router;


