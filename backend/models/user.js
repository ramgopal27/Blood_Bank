import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    role: { type: String, default: "user" },
    fullName: { type: String, required: true },
    dob: { type: Date, required: true },
    gender: { type: String, required: true },
    contactNumber: { type: String, required: true },
    city: { type: String },
    state: { type: String },
    zipCode: { type: String },
    bloodGroup: { type: String },
    weight: { type: Number },
    lastDonation: { type: Date },
    medicalConditions: { type: String },
    medications: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    emergencyName: { type: String },
    emergencyPhone: { type: String },
    idProof: { type: String }, // can store filename or URL
    agreeTerms: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
