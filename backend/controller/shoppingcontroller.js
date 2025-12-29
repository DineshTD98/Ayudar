const {Shoppinglist}=require('../model/shopping')

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