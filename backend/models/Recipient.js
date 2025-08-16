import mongoose from "mongoose";

const recipientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  bloodGroup: String,
  contact: String,
  requestDate: Date,
});

const Recipient = mongoose.model("Recipient", recipientSchema);
export default Recipient;
