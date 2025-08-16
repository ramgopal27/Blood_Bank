import mongoose from "mongoose";

const stockSchema = new mongoose.Schema({
  bloodGroup: { type: String, required: true },
  units: { type: Number, required: true, default: 0 },
});

// Prevent OverwriteModelError
const stock = mongoose.models.Stock || mongoose.model("Stock", stockSchema);
export default stock;
