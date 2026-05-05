const Task = require("../models/Task")
const User = require("../models/User")


exports.createTask = async (req, res) => {
  try {
    const { title, project, assignedTo } = req.body

    const task = await Task.create({
      title,
      project,
      user: req.user.id,
      assignedTo: assignedTo || null,
      status: "todo"
    })

    res.json(task)
  } catch (err) {
    console.log("CREATE TASK ERROR:", err) 
    res.status(500).json({ error: err.message })
  }
}





exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      project: req.params.projectId
    })
      .populate("assignedTo", "name")
      .populate("user", "name") 

    res.json(tasks)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}



exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)

    if (!task) return res.status(404).json({ msg: "Not found" })

    if (
      task.user?.toString() !== req.user.id &&
      task.assignedTo?.toString() !== req.user.id
    ) {
      return res.status(403).json({ msg: "Not allowed" })
    }

    const updated = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("assignedTo", "name")

    res.json(updated)
  } catch (err) {
    console.log("UPDATE ERROR:", err) 
    res.status(500).json({ error: err.message })
  }
}



exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)

    if (!task) return res.status(404).json({ msg: "Not found" })

    if (
      task.user?.toString() !== req.user.id &&
      task.assignedTo?.toString() !== req.user.id
    ) {
      return res.status(403).json({ msg: "Not allowed" })
    }

    await task.deleteOne()

    res.json({ msg: "Deleted" })
  } catch (err) {
    console.log("DELETE ERROR:", err)
    res.status(500).json({ error: err.message })
  }
}



exports.getDashboardStats = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id })

    const total = tasks.length
    const completed = tasks.filter(t => t.status === "done").length
    const pending = tasks.filter(t => t.status === "todo").length
    const inprogress = tasks.filter(t => t.status === "inprogress").length

    res.json({
      total,
      completed,
      pending,
      inprogress
    })
  } catch (err) {
    res.status(500).json({ error: "Stats error" })
  }
}