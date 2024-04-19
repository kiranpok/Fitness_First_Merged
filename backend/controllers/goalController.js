const Goal = require('../models/goalModel');
const mongoose = require('mongoose');
const i18n = require("i18next");

// Get all goals
const getGoals = async (req, res) => {
    try {
        const goals = await Goal.find({}).sort({ createdAt: -1 });
        res.status(200).json(goals);
    } catch (error) {
        console.error("Error fetching goals:", error.message);
        res.status(500).json({ error: i18n.t("error.internal_server_error") });
    }
};

// Get a single goal
const getGoal = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: i18n.t('error.no_goal') });
    }

    try {
        const goal = await Goal.findById(id);

        if (!goal) {
            return res.status(404).json({ error: i18n.t('error.no_goal') });
        }

        res.status(200).json(goal);
    } catch (error) {
        console.error("Error fetching goal:", error.message);
        res.status(500).json({ error: i18n.t("error.internal_server_error") });
    }
};

// Create new goal
const createGoal = async (req, res) => {
    const { name, distance, duration, date } = req.body;

    try {
        const newGoal = new Goal({
            name,
            distance,
            duration,
            date
        });

        const savedGoal = await newGoal.save();
        res.status(201).json(savedGoal);
    } catch (error) {
        console.error("Error creating goal:", error.message);
        res.status(400).json({ error: i18n.t("error.bad_request"), message: error.message });
    }
};

// Update goal
const updateGoal = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: i18n.t('error.no_goal') });
    }

    try {
        const updatedGoal = await Goal.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedGoal) {
            return res.status(404).json({ error: i18n.t('error.no_goal') });
        }
        res.status(200).json(updatedGoal);
    } catch (error) {
        console.error("Error updating goal:", error.message);
        res.status(500).json({ error: i18n.t("error.internal_server_error"), message: error.message });
    }
};

// Delete goal
const deleteGoal = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: i18n.t('error.no_goal') });
    }

    try {
        const deletedGoal = await Goal.findByIdAndDelete(id);
        if (!deletedGoal) {
            return res.status(404).json({ error: i18n.t('error.no_goal') });
        }
        res.status(200).json({ message: i18n.t("success.goal_deleted") });
    } catch (error) {
        console.error("Error deleting goal:", error.message);
        res.status(500).json({ error: i18n.t("error.internal_server_error"), message: error.message });
    }
};

module.exports = {
    createGoal,
    getGoals,
    getGoal,
    deleteGoal,
    updateGoal
};
