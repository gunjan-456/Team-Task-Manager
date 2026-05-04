import { useEffect, useState } from "react"
import API from "../api/axios"

export default function ProjectList({ selectedProject, setSelectedProject }) {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    API.get("/projects").then(res => setProjects(res.data))
  }, [])

  return (
    <div>
      {projects.map((p) => (
        <div
          key={p._id}
          onClick={() => setSelectedProject(p)}
          className={`p-3 mb-2 rounded cursor-pointer ${
            selectedProject?._id === p._id
              ? "bg-blue-500"
              : "bg-white/20"
          }`}
        >
          {p.title}
        </div>
      ))}
    </div>
  )
}