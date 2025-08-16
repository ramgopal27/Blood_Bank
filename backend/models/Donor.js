import mongoose from "mongoose";

const donorSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  bloodGroup: String,
  contact: String,
  lastDonation: Date,
});

const Donor = mongoose.model("Donor", donorSchema);
export default Donor;
