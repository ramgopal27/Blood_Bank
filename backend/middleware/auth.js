// middleware/auth.js
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);

    req.userId = decoded.id;
    req.role = decoded.role; // ✅ attach role info for later use

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export function verifyJWT(req, res, next) {
  return verifyToken(req, res, next);
}

export function requireRole(...roles) {
  return (req, res, next) => {
    verifyToken(req, res, () => {
      if (!roles.includes(req.role)) {
        return res
          .status(403)
          .json({ message: "Access denied. Insufficient permissions." });
      }
      next();
    });
  };
}

// ✅ Shortcut specifically for admin
export const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization;
  // Dummy check: in real app, verify JWT
  if (token === "Bearer admin-token") {
    next();
  } else {
    res.status(403).json({ message: "Not authorized" });
  }
};
// backend/middleware/auth.js
import User from "../models/user.js";

export const authMiddleware = async (req, res, next) => {
  let token;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");
      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      next();
    } else {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }
  } catch (err) {
    console.error("Auth error:", err);
    res.status(401).json({ message: "Token is not valid" });
  }
};
