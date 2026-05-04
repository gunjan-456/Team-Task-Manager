const express = require("express")
const router = express.Router()

const auth = require("../middleware/authMiddleware")
const role = require("../middleware/roleMiddleware")

const {
  createProject,
  getProjects,
  getProjectById,
  deleteProject   
} = require("../controllers/projectController")


router.post("/", auth, createProject)

router.get("/", auth, getProjects)


router.get("/:id", auth, getProjectById)


router.delete("/:id", auth, role("admin"), deleteProject)

module.exports = router