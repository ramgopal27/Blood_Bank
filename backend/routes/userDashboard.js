import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import Alert from "../models/alert.js";
import Request from "../models/Request.js";
import User from "../models/user.js";

const router = express.Router();

router.get("/summary", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).lean();
    if (!user) return res.status(404).json({ message: "User not found" });

    // Stats
    const stats = [
      {
        title: "Requests Submitted",
        value: await Request.countDocuments({ user: req.user.id }),
        icon: "📝",
        color: "red",
      },
      {
        title: "Donations Made",
        value: user.donationsMade || 0,
        icon: "💉",
        color: "green",
      },
      {
        title: "Alerts",
        value: await Alert.countDocuments({ user: req.user.id }),
        icon: "⚠️",
        color: "orange",
      },
    ];

    // Recent alerts (ensure uniqueness)
    const alertsRaw = await Alert.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();
    // const alerts = [
    //   ...new Map(alertsRaw.map((a) => [a._id.toString(), a])).values(),
    // ];
    // console.log("Alerts:", alertsRaw);
    // Recent activity placeholder
    const recentActivity = [
      { action: "Logged in", date: new Date() },
      { action: "Updated profile", date: new Date() },
    ];

    res.json({
      user: {
        ...user,
        badges: user.badges || [],
        recommendedEvents: user.recommendedEvents || [],
      },
      stats,
      alerts: alertsRaw,
      recentActivity,
    });
  } catch (err) {
    console.error("Dashboard Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
