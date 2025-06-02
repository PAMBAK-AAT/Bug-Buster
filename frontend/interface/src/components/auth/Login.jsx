


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Lock, Mail } from "lucide-react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/login`, formData);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.user._id);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      toast.success("Welcome Back!");
      window.dispatchEvent(new Event("storage")); // To notify Navbar about login

      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid credentials");
      setFormData({ ...formData, password: "" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="min-h-[70vh] flex items-center justify-center px-6 py-12
        bg-gradient-to-tr from-pink-200 via-purple-200 to-blue-200"
    >
      <div
        className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl p-10 w-full max-w-xl
          border border-white/30"
        style={{ minWidth: "320px" }}
      >
        <h2 className="text-center text-gray-800 text-3xl font-extrabold mb-8 drop-shadow-sm">
          🔒 Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 text-gray-500" size={20} />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-gray-300
                placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400
                transition"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3.5 text-gray-500" size={20} />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-gray-300
                placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400
                transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500
              text-white font-semibold rounded-xl shadow-lg hover:scale-105 transform transition duration-300
              ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;




