const User = require("../model/usermodel")
const bcrypt=require('bcrypt')


exports.getuser = async (req, res, next) => {

    try {
        const userdetails = await User.findById(req.user.id)
        if (!userdetails) {
            const error = new Error("User not found")
            error.status = 404
            return next(error)
        }
        console.log(userdetails)
        res.status(200).json({
            message: "User details fetched successfully",
            userdetails
        })
    }
    catch (err) {
        next(err)
    }
}

//profile db upload

exports.uploadprofile = async (req, res, next) => {
    try {
        const imageUrl = `uploads/${req.file.filename}`;

        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { $set: { userprofile: imageUrl } },
            { new: true }
        );

        res.json({
            message: "Profile image updated",
            updatedUser
        });
    }
    catch (err) {
        next(err)
    }
} 


// update username

exports.updateusername = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { $set: { username: req.body.newusername } },
            { new: true }
        );

        res.json({
            message: "Username updated successfully",
            updatedUser
        });
    }
    catch (err) {
        next(err)
    }
} 


// update password

exports.updatepassword=async(req,res,next)=>{
    try{
          const {newpassword}=req.body

          const salt=await bcrypt.genSalt(10);
          const newhashedpassword=await bcrypt.hash(newpassword,salt) 
        
         const updatedpassword=await User.findByIdAndUpdate(
            req.user.id,
            {
                $set:{
                    password:newhashedpassword
                },
            },
            {
             new:true
            }
            
         )
    }
    catch(error){
        next(error)
    }
}

