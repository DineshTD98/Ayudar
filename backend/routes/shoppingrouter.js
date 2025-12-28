const express=require('express');
const auth=require('../middleware/authmiddleware');
const { createshopping, getshopping } = require('../controller/shoppingcontroller');
const router=express.Router()

router.post('/createshopping',auth,createshopping)
router.get('/getshopping',auth,getshopping)

module.exports=router;
