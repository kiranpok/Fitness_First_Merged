const Goal = require('../models/goalModel')
const mongoose = require('mongoose')



// get all goals
const getGoals = async (req, res) => {
   const goals = await Goal.find({}).sort({createdAt: -1})

   res.status(200).json(goals)
}

//get a single goal
const getGoal = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({error: 'No such goal'})
    }

    const goal = await Goal.findById(id)

    if (!goal) {
        res.status(404).json({error: 'No such goal'})
    }

    res.status(200).json(goal)
}

//create new gaol
const createGoal = async (req, res) => {
    const {name,distance, duration, date} = req.body

    let emptyFields = []

    if (!name) {
        emptyFields.push('name')
    }
    if (!distance) {
        emptyFields.push('distance')
    }

    if (!duration) {
        emptyFields.push('duration')
    }

    if (!date) {
        emptyFields.push('date')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({error: `Please fill in all the fields: ${emptyFields.join(', ')}`})
    }

    // add doc to db
    try {
        const goal = await Goal.create({
            name,
            distance,
            duration,
            date
        })
        goal.save()
        res.status(201).json(goal)
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}
const updateGoal = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedGoalData = req.body;
  
      // Validate and update the goal
      const updatedGoal = await Goal.findByIdAndUpdate(id, updatedGoalData, {
        new: true,
      });
  
      if (!updatedGoal) {
        return res.status(404).json({ message: "Goal not found" });
      }
  
      res.status(200).json({ message: "Goal updated successfully", updatedGoal });
    } catch (error) {
      console.log("Error updating goal:", error.message);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  };
  
  const deleteGoal = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Validate and delete the goal
      const result = await Goal.findByIdAndDelete(id);
  
      if (!result) {
        return res.status(404).json({ message: "Goal not found" });
      }
  
      res.status(200).json({ message: "Goal deleted successfully" });
    } catch (error) {
      console.log("Error deleting goal:", error.message);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  };
  
  module.exports = {
    createGoal,
    getGoals,
    getGoal,
    deleteGoal,
    updateGoal
  };
  