const express = require("express")
const router = express.Router()

const auth = require("../middleware/authMiddleware")
const {
  createProject,
  getProjects,
  getProjectById 
} = require("../controllers/projectController")

router.post("/", auth, createProject)
router.get("/", auth, getProjects)
router.get("/:id", auth, getProjectById)

module.exports = router