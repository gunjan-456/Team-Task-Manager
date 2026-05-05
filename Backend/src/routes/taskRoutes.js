const express = require("express")
const router = express.Router()

const auth = require("../middleware/authMiddleware")

const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getDashboardStats 
} = require("../controllers/taskController")

router.post("/", auth, createTask)
router.get("/:projectId", auth, getTasks)
router.put("/:id", auth, updateTask)
router.delete("/:id", auth, deleteTask)
router.get("/dashboard/stats", auth, getDashboardStats)
router.get("/:projectId", auth, getTasks)

module.exports = router