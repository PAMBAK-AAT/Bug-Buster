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

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/login", formData);
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      window.dispatchEvent(new Event("login")); // Update navbar immediately

      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data || "Login failed");
    }
  };

  return (
    <section className="min-h-[70vh] flex items-center justify-center px-6 py-12
      bg-gradient-to-tr from-pink-200 via-purple-200 to-blue-200">
      <div
        className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl p-10 w-full max-w-xl
        border border-white/30"
        style={{ minWidth: "320px" }}
      >
        <h2 className="text-center text-gray-800 text-3xl font-extrabold mb-8 drop-shadow-sm">
          🔐 Sign In to Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 text-gray-500" size={20} />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Email Address"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-gray-300
                placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400
                transition"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3.5 text-gray-500" size={20} />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Password"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-gray-300
                placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400
                transition"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500
              text-white font-semibold rounded-xl shadow-lg hover:scale-105 transform transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-gray-700">
          Don’t have an account?{" "}
          <a
            href="/auth"
            className="text-pink-600 hover:underline font-semibold hover:text-pink-500 transition"
          >
            Register here
          </a>
        </p>
      </div>
    </section>
  );
};

export default Login;

// import { useNavigate } from 'react-router-dom';
// import {useState} from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify'; // Import toast for notifications

// const Login = () => {

//     const [formData, setFormData] = useState({
//         email: "",
//         password: "",
//     });

//     const navigate = useNavigate(); // To redirect user after login

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post("http://localhost:3000/login", formData);
            
//             const { token, user } = response.data;
//             localStorage.setItem("token", token); // Store token in local storage
//             localStorage.setItem("user", JSON.stringify(user)); // Store user data in local storage

//             toast.success("User login successfully!");
//             navigate("/"); // Redirect to home page after successful login

//             // console.log("User login successfully", response.data);
//         }
//         catch (error) {
//             console.error("Error in login", error.response?.data || error.message);
//             toast.error(error.response?.data || error.message);
//         }
//     }

//     return (

//         <section className="min-h-screen bg-gradient-to-tr from-purple-600 via-blue-500 to-indigo-600 flex items-center justify-center p-4">
//             <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-10 w-full max-w-md border border-white/20 animate-fade-in">
//                 <h2 className="text-3xl font-extrabold text-white text-center mb-8 drop-shadow-lg">🔐 Login</h2>
//                 <form className="space-y-6">
//                     <input
//                         type="email"
//                         name="email"
//                         placeholder="Enter email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         required
//                         className="w-full p-3 bg-white/20 placeholder-white text-white rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:bg-white/30 transition"
//                     />
//                     <input
//                         type="password"
//                         name="password"
//                         placeholder="Enter password"
//                         value={formData.password}
//                         onChange={handleChange}
//                         required
//                         className="w-full p-3 bg-white/20 placeholder-white text-white rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:bg-white/30 transition"
//                     />
//                     <button
//                         type="submit"
//                         onClick={handleSubmit}
//                         className="w-full py-3 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-semibold rounded-xl shadow-lg hover:scale-105 transform transition duration-300"
//                     >
//                         Login
//                     </button>
//                 </form>
//             </div>
//         </section>

//     )
// }


// export default Login;