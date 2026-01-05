const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
  {
    name: { type: String },
    category: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
    },
    fileUrl: {
      type: String,
      required: true,
    },

    fileType: {
      type: String,
      required: true,
    },

    fileName: {
      type: String,
      required: true,
    },

    fileSize: {
      type: Number,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

const Document = mongoose.model("Document", documentSchema);

const documentcategorySchema = new mongoose.Schema({
  name: { type: String,
    lowercase:true,
    trim:true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Documentcategory = mongoose.model(
  "Documentcategory",
  documentcategorySchema,
);

module.exports = { Document, Documentcategory };
