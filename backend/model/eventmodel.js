const mongoose=require("mongoose")      


const eventmodelschema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        default:""
    },
    date:{
        type:String,
        required:true
    },
    time:{
        type:String,
        default:""
    },
    color:{
        type:String,
        required:true
    },
    category:{
        type:String,
        default:"Personal"
    },
    user:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model("Events",eventmodelschema);