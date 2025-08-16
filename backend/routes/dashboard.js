// routes/dashboard.js
import express from "express";
import Alert from "../models/alert.js";
import BloodUnit from "../models/BloodUnit.js";
import Donor from "../models/Donor.js";
import Recipient from "../models/Recipient.js";
import Request from "../models/Request.js";
import Stock from "../models/stock.js";
import User from "../models/user.js";

const router = express.Router();

// 1️⃣ Donors
router.get("/donors", async (req, res) => {
  try {
    const donors = await Donor.find();
    res.json(donors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch donors" });
  }
});

// 2️⃣ Recipients
router.get("/recipients", async (req, res) => {
  try {
    const recipients = await Recipient.find();
    res.json(recipients);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch recipients" });
  }
});

// 3️⃣ Requests
router.get("/requests", async (req, res) => {
  try {
    const requests = await Request.find().populate("recipientId");
    res.json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch requests" });
  }
});

// 4️⃣ Stock
router.get("/stock", async (req, res) => {
  try {
    const stock = await Stock.find();
    res.json(stock);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch stock" });
  }
});
/* -----------------------------
   Get All Users
------------------------------ */
router.get("/users", async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

/* -----------------------------
   Delete User
------------------------------ */
router.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.deleteOne();
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete user" });
  }
});
// 5️⃣ Blood Units (optional, can combine with stock)
router.get("/blood-units", async (req, res) => {
  try {
    const units = await BloodUnit.find();
    res.json(units);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch blood units" });
  }
});

// 6️⃣ Alerts
router.get("/alerts", async (req, res) => {
  try {
    const alerts = await Alert.find().sort({ createdAt: -1 }).limit(50);
    res.json(alerts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch alerts" });
  }
});

// 7️⃣ Dashboard Summary (optional overview)
router.get("/summary", async (req, res) => {
  try {
    const donorsCount = await Donor.countDocuments();
    const recipientsCount = await Recipient.countDocuments();
    const pendingRequests = await Request.countDocuments({ status: "pending" });
    const emergencyRequests = await Request.countDocuments({
      status: "pending",
      isEmergency: true,
    });
    const stockData = await Stock.find();
    const bloodStock = {};
    stockData.forEach((s) => (bloodStock[s.bloodGroup] = s.units));
    const totalUnits = Object.values(bloodStock).reduce((a, b) => a + b, 0);
    const lowStock = stockData
      .filter((s) => s.units <= 5)
      .map((s) => s.bloodGroup);

    res.json({
      donorsCount,
      recipientsCount,
      pendingRequests,
      emergencyRequests,
      totalUnits,
      stockByGroup: bloodStock,
      lowStock,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch dashboard summary" });
  }
});

export default router;
