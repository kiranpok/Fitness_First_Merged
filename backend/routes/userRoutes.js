// user.js
const console = require("console");
const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/authMiddleware");

// Import controller functions for user operations
const {
  signinUser,
  signupUser,
  forgotPassword,
  signOutUser,
  resetPassword,
  // Import the new controller
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
} = require("../controllers/userController");

// Import the new controller functions

/* router.get("/", (req, res) => {
  res.send("Hello, Express!");
}); */
// Sign-in route
router.post("/signin", signinUser);

// Sign-up route
router.post("/signup", signupUser);

// Forgot password route
router.post("/forgotpassword", forgotPassword);

// Reset password route
router.post("/resetpassword", resetPassword);

// Sign-out route
router.post("/signout", signOutUser);

// Get user profile route
router.get("/profile", requireAuth, getUserProfile);

// Update user profile route
router.put("/profile", requireAuth, updateUserProfile);

//delete user profile route
router.delete("/profile", requireAuth, deleteUserProfile);

module.exports = router;
