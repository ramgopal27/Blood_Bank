// backend/routes/donors.js
import express from "express";
import Donor from "../models/Donor.js";
// import { authMiddleware } from "../middleware/auth.js"; // Remove or comment out if public

const router = express.Router();

// Public donor submission
router.post("/", async (req, res) => {
  try {
    const donor = new Donor(req.body);
    await donor.save();
    res.status(201).json({ message: "Donor added successfully", donor });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
