const Documents = require("../model/documentmodel");

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
      userId:  req.user.id,
      fileUrl:  req.file.filename,
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
