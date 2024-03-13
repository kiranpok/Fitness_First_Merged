require("dotenv").config();
const express = require("express");
const router = express.Router();
const Goal = require("../models/goalModel");
const {
    createGoal,
    getGoals,
    getGoal,
    deleteGoal,
    updateGoal
} = require("../controllers/goalController");


//GET all goals
router.get('/', getGoals);

//GET a single goals
router.get('/:id', getGoal);

//POST a new goal
router.post('/', createGoal);

//DELETE a single goal
router.delete('/:id', deleteGoal);

//UPDATE a single goal
router.put('/:id', updateGoal);




module.exports = router