const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const connectDB = require("./config/db")

dotenv.config()
connectDB()

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/auth", require("./routes/authRoutes"))
app.use("/api/projects", require("./routes/projectRoutes"))
app.use("/api/tasks", require("./routes/taskRoutes"))

app.listen(5000, () => console.log("Server running on port 5000"))