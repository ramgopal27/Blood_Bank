import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

import adminRoutes from "./routes/admin.js";
import userRoutes from "./routes/auth.js";
import dashboardRoutes from "./routes/dashboard.js";
import donorRoutes from "./routes/donor.js";
import RequestRoutes from "./routes/request.js";
import userDashboardRoutes from "./routes/userDashboard.js";
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Routes

app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use("/admin/dashboard", dashboardRoutes);
app.use("/user/dashboard", userDashboardRoutes);
app.use("/donors", donorRoutes);
app.use("/requests", RequestRoutes);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
