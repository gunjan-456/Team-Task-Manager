import { useState } from "react"
import API from "../api/axios"

export default function AddTask({ selectedProject, setTasks }) {
  const [title, setTitle] = useState("")

  const addTask = async () => {
    if (!title.trim()) return alert("Enter task")
    if (!selectedProject) return alert("Select project")

    try {
      await API.post("/tasks", {
        title,
        project: selectedProject._id
      })

   
      const res = await API.get(`/tasks/${selectedProject._id}`)
      setTasks(res.data)

      setTitle("")
    } catch (err) {
      alert("Error adding task")
    }
  }

  return (
    <div className="flex gap-2 mb-4">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task title..."
        className="flex-1 p-2 bg-white/20 rounded"
      />

      <button
        onClick={addTask}
        className="bg-pink-500 px-4 rounded"
      >
        Add
      </button>
    </div>
  )
}