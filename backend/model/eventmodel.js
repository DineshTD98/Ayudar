const mongoose=require("mongoose")      


const eventmodelschema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    color:{
        type:String,
        required:true
    },
    user:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model("Events",eventmodelschema);