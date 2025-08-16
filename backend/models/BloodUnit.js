// models/BloodUnit.js
import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      required: true,
    },
    units: { type: Number, required: true, min: 0 },
    expiryDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ["available", "allocated", "expired"],
      default: "available",
    },
  },
  { timestamps: true }
);

const BloodUnit = mongoose.model("BloodUnit", schema);
export default BloodUnit;
