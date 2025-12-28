const mongoose=require('mongoose')

const Shoppingschema=new mongoose.Schema({
    productname:{
        type:String,
        required:true
    },
    quantity:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},
    {timestamps:true},
);

module.exports=mongoose.model("Shoppinglist",Shoppingschema)