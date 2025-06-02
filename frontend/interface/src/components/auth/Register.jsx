

import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { User, Mail, Phone, Lock } from "lucide-react";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return false;
    }
    // Add more validations if needed
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/register`, formData);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.user._id);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      toast.success("User registered successfully!");
      // Option 1: Redirect to homepage after registration (auto login assumed)
      // navigate("/");

      // Option 2: If you want them to login manually, navigate to "/auth" with login toggle
      navigate("/auth");
    } catch (error) {
      // Show backend error message if available, fallback to generic
      toast.error(error.response?.data?.message || error.response?.data || "Something went wrong");
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
          📝 Create Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div className="flex gap-5">
            <div className="relative w-1/2">
              <User className="absolute left-3 top-3.5 text-gray-500" size={20} />
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-gray-300
                  placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400
                  transition"
              />
            </div>
            <div className="relative w-1/2">
              <User className="absolute left-3 top-3.5 text-gray-500" size={20} />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-gray-300
                  placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400
                  transition"
              />
            </div>
          </div>

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
            <Phone className="absolute left-3 top-3.5 text-gray-500" size={20} />
            <input
              type="tel"
              name="phoneNo"
              placeholder="Phone Number"
              value={formData.phoneNo}
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
              minLength={6}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-gray-300
                placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400
                transition"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3.5 text-gray-500" size={20} />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              minLength={6}
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
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Register;




