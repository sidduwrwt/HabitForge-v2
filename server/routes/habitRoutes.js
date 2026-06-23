const express = require("express");
const router = express.Router();

const protect = require("../middlewares/authMiddleware");

const {
  createHabit,
  getHabits,
  deleteHabit,
  updateHabit,
} = require("../controllers/habitController");

router.post("/", protect, createHabit);
router.get("/", protect, getHabits);
router.delete("/:id", protect, deleteHabit);
router.put("/:id", protect, updateHabit);

module.exports = router;