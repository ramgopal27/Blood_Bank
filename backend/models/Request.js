import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  recipientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recipient",
    default: null,
  },
  recipientName: { type: String, required: true },
  recipientEmail: { type: String, required: true },
  bloodGroup: { type: String, required: true },
  units: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  requestDate: { type: Date, default: Date.now },
});

const Request = mongoose.model("Request", requestSchema);
export default Request;
