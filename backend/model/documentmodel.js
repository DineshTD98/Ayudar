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
    fileUrl: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

const Document = mongoose.model("Document", documentSchema);

module.exports = Document;
