// backend/routes/requests.js
import express from "express";
import Request from "../models/Request.js";

const router = express.Router();

// Create a new blood request (no token required)
router.post("/", async (req, res) => {
  try {
    const { bloodGroup, units, recipientName, recipientEmail } = req.body;

    // Validate required fields
    if (!bloodGroup || !units || !recipientName || !recipientEmail) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create new request
    const newRequest = new Request({
      recipientId: null, // no auth, so no user ID
      bloodGroup,
      units,
      recipientName,
      recipientEmail,
      requestDate: new Date(),
    });

    await newRequest.save();

    res.status(201).json({
      message: "Blood request submitted successfully",
      request: newRequest,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all requests (for admin view)
router.get("/", async (req, res) => {
  try {
    const requests = await Request.find().sort({ requestDate: -1 });
    res.json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
