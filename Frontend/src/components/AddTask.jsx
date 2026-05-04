import { useState, useEffect } from "react"
import API from "../api/axios"

export default function AddTask({ selectedProject, setTasks }) {

  
  const [title, setTitle] = useState("")
  const [users, setUsers] = useState([])
  const [assignedTo, setAssignedTo] = useState("")


  useEffect(() => {
    API.get("/users").then(res => setUsers(res.data))
  }, [])

  const addTask = async () => {
    if (!title.trim()) return alert("Enter task")
    if (!selectedProject) return alert("Select project")

    try {
      await API.post("/tasks", {
        title,
        project: selectedProject._id,
        assignedTo   
      })

      const res = await API.get(`/tasks/${selectedProject._id}`)
      setTasks(res.data)

      setTitle("")
      setAssignedTo("")   
    } catch (err) {
      alert("Error adding task")
    }
  }

  return (
    <div className="mb-4">

    
      <select
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
        className="w-full p-2 mb-2 rounded bg-white/20"
      >
        <option value="">Assign user</option>
        {users.map((u) => (
          <option key={u._id} value={u._id}>
            {u.name}
          </option>
        ))}
      </select>

      <div className="flex gap-2">
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

    </div>
  )
}