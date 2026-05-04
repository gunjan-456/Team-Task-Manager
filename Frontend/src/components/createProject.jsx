import { useState } from "react"
import API from "../api/axios"

export default function CreateProject() {
  const [title, setTitle] = useState("")

  const createProject = async () => {
    if (!title) return
    await API.post("/projects", { title })
    setTitle("")
    window.location.reload()
  }

  return (
    <div className="flex gap-2 mb-4">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Project title"
        className="flex-1 p-2 rounded bg-white/20"
      />
      <button
        onClick={createProject}
        className="bg-blue-500 px-4 rounded"
      >
        Create
      </button>
    </div>
  )
}