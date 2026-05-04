import { useState } from "react"
import ProjectList from "../components/ProjectList"
import CreateProject from "../components/CreateProject"
import TaskList from "../components/TaskList"
import AddTask from "../components/AddTask"
import Stats from "../components/Stats"

export default function Dashboard() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [tasks, setTasks] = useState([])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">🚀 Dashboard</h1>

      <Stats tasks={tasks} />

      <div className="grid grid-cols-2 gap-6 mt-6">

        <div className="bg-white/10 p-4 rounded-xl">
          <CreateProject />
          <ProjectList
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
          />
        </div>

        <div className="bg-white/10 p-4 rounded-xl">
          <AddTask
            selectedProject={selectedProject}
            setTasks={setTasks}
          />

          <TaskList
            selectedProject={selectedProject}
            tasks={tasks}
            setTasks={setTasks}
          />
        </div>

      </div>
    </div>
  )
}