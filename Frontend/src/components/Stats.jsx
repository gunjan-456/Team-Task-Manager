export default function Stats({ tasks }) {
  const total = tasks.length
  const completed = tasks.filter(t => t.status === "done").length
  const pending = tasks.filter(t => t.status === "todo").length
  const inprogress = tasks.filter(t => t.status === "inprogress").length

  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="bg-white/10 p-4 rounded">Total {total}</div>
      <div className="bg-green-600 p-4 rounded">Completed {completed}</div>
      <div className="bg-gray-500 p-4 rounded">Pending {pending}</div>
      <div className="bg-blue-600 p-4 rounded">In Progress {inprogress}</div>
    </div>
  )
}