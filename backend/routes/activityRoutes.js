// routes/activityRoutes.js
const express = require("express");
const router = express.Router();

// controller functions
const {
  createActivity,
  getAllActivities,
  getActivityById,
  updateActivity,
  deleteActivity,
} = require("../controllers/activityController");

// Create route
router.post("/", createActivity);

// Get all activities route
router.get("/getAll", getAllActivities);

// Get activity by id route
router.get("/:id", getActivityById);

// Update activity route
router.put("/update/:id", updateActivity);

// Delete activity route
router.delete("/delete/:id", deleteActivity);

module.exports = router;
