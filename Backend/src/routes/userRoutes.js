const express = require("express")
const router = express.Router()

const auth = require("../middleware/authMiddleware")
const User = require("../models/User")


router.get("/", auth, async (req, res) => {
  try {
    const users = await User.find().select("name email")
    res.json(users)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router