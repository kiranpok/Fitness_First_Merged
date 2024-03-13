// models/activity.js
const mongoose = require("mongoose");
const schema = mongoose.Schema;

const activitySchema = new mongoose.Schema({
  activityName: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  activityType: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  distance: {
    type: Number,
    required: true,
  },
  pace: {
    type: Number,
    required: true,
  },
  notes: {
    type: String,
  },
});

module.exports = mongoose.model("Activity", activitySchema);
