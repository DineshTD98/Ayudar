const express=require("express")
const router=express.Router()
const auth=require("../middleware/authmiddleware")
const upload=require("../middleware/upload")
const {getuser,uploadprofile,updateusername,updatepassword,updateprofile}=require("../controller/profilecontroller")


router.post("/getuser",auth,getuser)
router.post("/upload",auth,upload.single("profile"),uploadprofile)
router.patch("/updateusername",auth,updateusername)
router.patch("/updatepassword",auth,updatepassword)
router.patch("/updateprofile",auth,updateprofile)

module.exports=router
