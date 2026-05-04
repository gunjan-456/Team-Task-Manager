import { useEffect, useState } from "react"
import API from "../api/axios"

export default function TaskList({ selectedProject, tasks, setTasks }) {

  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState("")

  useEffect(() => {
    if (!selectedProject) {
      setTasks([])
      return
    }

    const fetchTasks = async () => {
      const res = await API.get(`/tasks/${selectedProject._id}`)
      setTasks(res.data)
    }

    fetchTasks()
  }, [selectedProject])

 
  const toggleStatus = async (task) => {
    const next =
      task.status === "todo"
        ? "inprogress"
        : task.status === "inprogress"
        ? "done"
        : "todo"

    const res = await API.put(`/tasks/${task._id}`, {
      status: next
    })

    setTasks(prev =>
      prev.map(t => (t._id === task._id ? res.data : t))
    )
  }


  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`)
    setTasks(prev => prev.filter(t => t._id !== id))
  }

 
  const saveEdit = async (id) => {
    const res = await API.put(`/tasks/${id}`, {
      title: editText
    })

    setTasks(prev =>
      prev.map(t => (t._id === id ? res.data : t))
    )

    setEditingId(null)
    setEditText("")
  }

  if (!selectedProject) {
    return <p className="text-center text-white/60 mt-10">
        🚀 Select a project to manage tasks
      </p>
  }

  if (tasks.length === 0) {
  return (
    <div className="text-center text-white/60 mt-10">
      <p className="text-lg">No tasks yet</p>
      <p className="text-sm mt-1">Add your first task 🚀</p>
    </div>
  )
}

  return (
    <div>
      {tasks.map((t) => (
        <div
          key={t._id}
          className="p-4 mb-3 bg-white/20 rounded flex justify-between items-center"
        >

         
          <div>
            {editingId === t._id ? (
              <input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="p-1 rounded text-black"
              />
            ) : (
              <p className="font-semibold">{t.title}</p>
            )}

       
            <span
              className={`text-xs px-2 py-1 rounded mt-1 inline-block
                ${t.status === "todo" && "bg-yellow-400 text-black"}
                ${t.status === "inprogress" && "bg-blue-500"}
                ${t.status === "done" && "bg-green-500"}
              `}
            >
              {t.status}
            </span>
          </div>

       
          <div className="flex gap-2">

           
            <button
              onClick={() => toggleStatus(t)}
              className="bg-purple-500 px-3 py-1 rounded"
            >
              Change
            </button>

            {editingId === t._id ? (
              <button
                onClick={() => saveEdit(t._id)}
                className="bg-green-500 px-3 py-1 rounded"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => {
                  setEditingId(t._id)
                  setEditText(t.title)
                }}
                className="bg-blue-500 px-3 py-1 rounded"
              >
                Edit
              </button>
            )}

          
            <button
              onClick={() => deleteTask(t._id)}
              className="bg-red-500 px-3 py-1 rounded"
            >
              Delete
            </button>

          </div>
        </div>
      ))}
    </div>
  )
}