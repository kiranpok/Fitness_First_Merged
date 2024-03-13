// controllers/activityController.js
const Activity = require("../models/activityModel");
const mongoose = require("mongoose");

// Create a new activity
const createActivity = async (req, res) => {
  try {
    const {
      activityName,
      startTime,
      date,
      activityType,
      duration,
      distance,
      pace,
      notes,
    } = req.body;
    const newActivity = new Activity({
      activityName,
      startTime,
      date,
      activityType,
      duration,
      distance,
      pace,
      notes,
    });
    await newActivity.save();
    res
      .status(201)
      .json({
        message: "Activity created successfully",
        activity: newActivity,
      });
  } catch (error) {
    console.log("Error creating activity:", error.message);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Get activity by id

const getActivityById = async (req, res) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findById(id);
    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }
    res.status(200).json(activity);
  } catch (error) {
    console.log("Error getting activity by ID:", error.message);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Get all activities
const getAllActivities = async (req, res) => {
  try {
    const activities = await Activity.find();
    res.status(200).json(activities);
  } catch (error) {
    console.log("Error getting activities:", error.message);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Update activity

const updateActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedActivity = req.body;

    // Validate and update the activity
    const result = await Activity.findByIdAndUpdate(id, updatedActivity, {
      new: true,
    });

    if (!result) {
      return res.status(404).json({ message: "Activity not found" });
    }

    res
      .status(200)
      .json({ message: "Activity updated successfully", activity: result });
  } catch (error) {
    console.log("Error updating activity:", error.message);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Delete activity

const deleteActivity = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate and delete the activity
    const result = await Activity.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Activity not found" });
    }

    res.status(200).json({ message: "Activity deleted successfully" });
  } catch (error) {
    console.log("Error deleting activity:", error.message);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  createActivity,
  getAllActivities,
  getActivityById,
  updateActivity,
  deleteActivity,
};
