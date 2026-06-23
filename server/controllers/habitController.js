const Habit = require("../models/Habit");

// Create Habit
exports.createHabit = async (req, res) => {
  try {
    const habit = await Habit.create({
      user: req.user._id,
      title: req.body.title,
      color: req.body.color,
      category: req.body.category,
      frequency: req.body.frequency,
    });

    res.status(201).json(habit);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get My Habits
exports.getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({
      user: req.user._id,
    });

    res.json(habits);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Habit
exports.deleteHabit = async (req, res) => {
  try {
    await Habit.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    res.json({
      message: "Habit deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Habit
exports.updateHabit = async (req, res) => {
  try {
    const habit = await Habit.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!habit) {
      return res.status(404).json({
        message: "Habit not found",
      });
    }

    habit.title = req.body.title || habit.title;
    habit.color = req.body.color || habit.color;
    habit.category = req.body.category || habit.category;
    habit.frequency = req.body.frequency || habit.frequency;

    const updatedHabit = await habit.save();

    res.json(updatedHabit);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};