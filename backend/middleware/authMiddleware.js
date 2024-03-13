// middleware/authMiddleware.js

const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const cookieParser = require("cookie-parser");
const { JWT_SECRET } = require("../utils/config");

const requireAuth = async (req, res, next) => {
  console.log("Token from authMiddleware");
  cookieParser()(req, res, () => {});
  console.log(req.headers.authorization);
  const token = req.headers.authorization;
  console.log("extracted token: ", token);

  if (token) {
    try {
      jwt.verify(token.split(" ")[1], JWT_SECRET, (err, decoded) => {
        if (err) {
          console.error("Token verification failed:", err);
        } else {
          console.log("Token verified successfully:", decoded);
          req.userId = decoded.userId;
          next();
        }
      });
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = { requireAuth };
