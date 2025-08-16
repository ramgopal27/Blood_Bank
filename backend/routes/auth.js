import express from "express";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import User from "../models/user.js";

const router = express.Router();

// Multer setup for file upload (ID proof)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // make sure this folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// User Registration
router.post("/register", upload.single("idProof"), async (req, res) => {
  try {
    const {
      role,
      fullName,
      dob,
      gender,
      contactNumber,
      city,
      state,
      zipCode,
      bloodGroup,
      weight,
      lastDonation,
      medicalConditions,
      medications,
      email,
      password,
      emergencyName,
      emergencyPhone,
      agreeTerms,
    } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const user = new User({
      role,
      fullName,
      dob,
      gender,
      contactNumber,
      city,
      state,
      zipCode,
      bloodGroup,
      weight,
      lastDonation,
      medicalConditions,
      medications,
      email,
      password,
      emergencyName,
      emergencyPhone,
      agreeTerms,
      idProof: req.file ? req.file.filename : null,
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// User Login (only email & password)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: "user" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Return token and user details
    res.json({
      token,
      user: {
        role: user.role,
        fullName: user.fullName,
        email: user.email,
        contactNumber: user.contactNumber,
        city: user.city,
        state: user.state,
        zipCode: user.zipCode,
        bloodGroup: user.bloodGroup,
        weight: user.weight,
        lastDonation: user.lastDonation,
        medicalConditions: user.medicalConditions,
        medications: user.medications,
        emergencyName: user.emergencyName,
        emergencyPhone: user.emergencyPhone,
        idProof: user.idProof,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
