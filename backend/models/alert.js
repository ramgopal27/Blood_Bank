import mongoose from "mongoose";

const alertSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // user reference
  message: String,
  severity: { type: String, enum: ["low", "medium", "high"], default: "low" },
  createdAt: { type: Date, default: Date.now },
});

const Alert = mongoose.models.Alert || mongoose.model("Alert", alertSchema);
export default Alert;
