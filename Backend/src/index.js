const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const connectDB = require("./config/db")

dotenv.config()
connectDB()

const app = express()

app.use(cors({
  origin:  [
    "http://localhost:5173",
    "https://team-task-manager-livid-tau.vercel.app"
  ],
  credentials: true
}));
app.use(express.json())

app.use("/api/auth", require("./routes/authRoutes"))
app.use("/api/projects", require("./routes/projectRoutes"))
app.use("/api/tasks", require("./routes/taskRoutes"))
app.use("/api/users", require("./routes/userRoutes"))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));