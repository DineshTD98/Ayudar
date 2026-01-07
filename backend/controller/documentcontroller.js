const { Document: Documents, Documentcategory } = require("../model/documentmodel");
exports.createdocument = async (req, res) => {
  try {
    const { name, category, date } = req.body;

    if (!name || !category || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
    }

    const exists = await Documents.findOne({
      name,
      category,
      userId: req.user.id,
      fileUrl: req.file.filename,
      fileType: req.file.mimetype,
      fileName: req.file.originalname,
      fileSize: req.file.size,
    });

    if (exists) {
      return res.status(409).json({ message: "File already exists" });
    }

    const newDocument = await Documents.create({
      name,
      category,
      date,
      fileUrl: req.file.filename,
      userId: req.user.id,
      fileType: req.file.mimetype,
      fileName: req.file.originalname,
      fileSize: req.file.size,
    });

    res.status(201).json({
      success: true,
      message: "File uploaded successfully",
      document: newDocument,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

//get documents

exports.getdocument = async (req, res) => {
  try {
    const document = await Documents.find({ userId: req.user.id });
    res.status(200).json({
      message: "document successfully received",
      document,
    });
  } catch (err) {
    res.status(500).json({
      message: "server error",
    });
  }
};

//delete document

exports.deletedocument = async (req, res) => {
  try {
    const newdocument = await Documents.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!newdocument) {
      return res.status(400).json({
        message: "no document found",
      });
    }
    return res.status(200).json({
      message: "file deleted successfully",
      deletedid: newdocument.id,
    });
  } catch (err) {
    res.status(500).json({
      message: "server error",
    });
  }
};


exports.createdocumentcategory = async (req, res, next) => {
  try {
    const category = Array.isArray(req.body) ? req.body : [req.body]

    const data = category.map((cat) => ({
      name: cat.name.toLowerCase(),
      userId: req.user.id
    }))
    const names = data.map(item => item.name)
   
     const exists = await Documentcategory.findOne({
      name: { $in: names },
      userId: req.user.id
    })


    if (exists) {
      const error = new Error("category already exists")
      error.statusCode = 400
      return next(error)
    }
    const newcategory = await Documentcategory.create(data)
    res.status(201).json({
      success: true,
      message: "category created successfully",
      newcategory
    })
  } catch (error) {
    next(error)
  }
}


// get document category

exports.getdocumentcategory=async(req,res,next)=>{
  try {
    const category=await Documentcategory.find({userId:req.user.id})
    if(!category){
      const error=new Error("category not found")
      error.statusCode=404
      return next(error)
    }
    res.status(200).json({
      message:"category successfully received",
      category
    })
  } catch (error) {
    next(error)
  }
}

// get search documents

exports.searchdocument=async(req,res,next)=>{
  try{
      const document=await Documents.find({
      $and:[
       {category:{$regex:req.params.search,$options:"i"}},
       {userId:req.user.id}
      ]})
   if(!document){
      const error=new Error("no document found")
       error.statusCode=400;
       return next(error)
      }

      res.status(201).json({
         message:"successfully received",
         document
      })
  }
  catch(error){
    next(error)
  }
}
