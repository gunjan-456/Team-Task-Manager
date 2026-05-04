const Task = require("../models/Task")

exports.createTask = async (req, res) => {
  try {
    if (!req.body.project) {
      return res.status(400).json({ error: "Project ID required" })
    }

    const task = await Task.create({
      title: req.body.title,
      project: req.body.project,
      user: req.user.id,
       assignedTo: req.body.assignedTo || null, 
      status: "todo"
    })

    res.json(task)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      project: req.params.projectId
    }).populate("assignedTo", "name")  

    res.json(tasks)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )

    res.json(task)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id)
    res.json({ message: "Deleted" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}