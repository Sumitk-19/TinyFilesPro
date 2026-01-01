const mongoose = require("mongoose");

const HistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  fileType: { type: String, enum: ["image", "pdf"], required: true },
  operation: { type: String, required: true },
  originalSize: { type: Number, default: 0 },
  finalSize: { type: Number, default: 0 },
  details: { type: Object, default: {} }
}, { timestamps: true });

module.exports = mongoose.model("History", HistorySchema);
