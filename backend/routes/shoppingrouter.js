const express=require('express');
const auth=require('../middleware/authmiddleware');
const { createshopping, getshopping,createhistory,gethistory} = require('../controller/shoppingcontroller');
const router=express.Router()

router.post('/createshopping',auth,createshopping)
router.get('/getshopping',auth,getshopping)
router.post('/createhistory',auth,createhistory)
router.get("/gethistory",auth,gethistory)


module.exports=router;
