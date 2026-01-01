const Events=require("../model/eventmodel")

exports.createevent=async(req,res,next)=>{
    try {
         const {title,description,date,color}=req.body;
         if(!title || !description || !date || !color){
            return next(new Error("All fields are required"))
         };
         const eventdetails=await Events.create({
            title,
            description,
            date,
            color,
            user:req.user.id
         })
         res.status(201).json({
            success:true,
            message:"Event created successfully",
            eventdetails
         })
    } catch (error) {
        next(error)
    }
}


//get events

exports.getevents=async(req,res,next)=>{
    try {
        const events=await Events.find({user:req.user.id})
        res.status(200).json({
            success:true,
            message:"Events fetched successfully",
            events
        })
    } catch (error) {
        next(error)
    }
}
