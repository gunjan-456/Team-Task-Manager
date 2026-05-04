import { useState } from "react"
import API from "../api/axios"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed ❌");
    }
  };

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">

      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 6 }}
        className="absolute w-[500px] h-[500px] bg-cyan-400 blur-3xl opacity-20 top-[-100px] left-[-100px]"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ repeat: Infinity, duration: 8 }}
        className="absolute w-[400px] h-[400px] bg-blue-500 blur-3xl opacity-20 bottom-[-100px] right-[-100px]"
      />

    
      <motion.form
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        onSubmit={handleSubmit}
        className="relative bg-white/10 backdrop-blur-2xl border border-white/20 p-10 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] w-80"
      >
        <h2 className="text-2xl mb-6 text-center font-semibold tracking-wide">
          Welcome Back
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-cyan-400 transition"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

     
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-400 transition"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

    
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 p-3 rounded-lg font-semibold shadow-[0_0_20px_rgba(59,130,246,0.6)] hover:shadow-[0_0_30px_rgba(59,130,246,0.9)] transition duration-300"
        >
          Login
        </motion.button>

       
        <p className="text-sm mt-5 text-center text-gray-300">
          Don't have an account?{" "}
          <span
            className="text-cyan-400 cursor-pointer hover:underline"
            onClick={() => navigate("/signup")}
          >
            Signup
          </span>
        </p>
      </motion.form>
    </div>
  );
}