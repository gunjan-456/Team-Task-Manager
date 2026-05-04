const Project = require("../models/Project");


exports.createProject = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Only admin can create project" });
    }

    const project = await Project.create({
      title: req.body.title,
      owner: req.user.id,
      description: req.body.description,
      createdBy: req.user.id,
      members: req.body.members || []
    });

    res.json(project)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
};


exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("members", "name email")
      .populate("createdBy", "name");

    res.json(projects)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}


exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)

    if (!project) {
      return res.status(404).json({ msg: "Project not found" })
    }

    res.json(project)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}



exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id)

    if (!project) {
      return res.status(404).json({ msg: "Project not found" })
    }

    res.json({ msg: "Project deleted successfully" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}