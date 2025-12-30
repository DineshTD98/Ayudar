const Shoppinglist=require('../model/shopping')

// shoppinglist creation

exports.createshopping=async(req,res)=>{
    try{
        const data=Array.isArray(req.body)? req.body: [req.body]
        
        for(let list of data){
            const {productname,quantity}=list;

            if(!productname|| !quantity ){
             return res.status(400).json({
                message:'all the fields required'
             })
        }
    }

     const shoppingitems=await Shoppinglist.create(
        data.map((items)=>({
          ...items,
          userId:req.user.id
         })))


       return res.status(200).json({
           message:"successfully saved",
           shoppingitems
       })
    }
    catch(err){
        return res.status(500).json({
            message:err.message
        })
    }
}

// get shopping list 

exports.getshopping=async(req,res)=>{
    try{
         const Getshoppinglist=await Shoppinglist.find({userId:req.user.id})

         if(!Getshoppinglist){
            return res.status(400).json({
                 message:'no list to find'
            })
         }
         return res.status(201).json({
              message:"successfull request",
              Getshoppinglist
         })
    }
    catch(err){
        return res.status(500).json({
            message:err.message
        })
    }
}


// shopping history creation

const History = require("../model/shopping");

exports.createhistory = async (req, res, next) => {
  try {
    const data = Array.isArray(req.body) ? req.body : [req.body];

    if (data.length === 0) {
      const error = new Error("No completed items found");
      error.statuscode = 400;
      return next(error);
    }

    // same date for all the group
    const completedDate = new Date();

    const historyItems = data.map((item) => ({
      productname: item.productname,
      quantity: item.quantity,
      completedDate,
      userId: req.user.id,
    }));

    const savedHistory = await History.insertMany(historyItems);

    res.status(201).json({
      message: "Shopping history saved successfully",
      savedHistory,
    });
  } catch (err) {
    next(err);
  }
};


// get history 

exports.gethistory=async(req,res,next)=>{
  try{
     const historyproducts=await History.find({userId:req.user.id})
      
     if(!historyproducts){
        const error = new Error("No completed items found");
        error.statuscode = 400;
        return next(error);
     }

     return res.status(200).json({
         message:"successfully received",
         historyproducts
     })
  }
  catch(error){
      next(error)
  }
}