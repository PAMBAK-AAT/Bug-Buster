

import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import toast for notifications

import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection


const Register = () => {

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNo: "",
        password: "",
        confirmPassword: "",
    });

    const navigate = useNavigate(); // To redirect user after registration
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent refreshing of page on submission

        try {
            const response = await axios.post("http://localhost:3000/register", formData);
            console.log("Registration Successful: ", response.data);
            navigate("/login"); // Redirect to login page after successful registration
            toast.success("User registered successfully");
        } catch (error) {
            console.error("Error during registration:", error.response?.data || error.message);
            toast.error(error.response?.data || "Something went wrong");
        }
    };

    return (

        <section className="min-h-screen bg-gradient-to-tr from-purple-600 via-blue-500 to-indigo-600 flex items-center justify-center p-4">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-10 w-full max-w-md border border-white/20 animate-fade-in">
                <h2 className="text-3xl font-extrabold text-white text-center mb-8 drop-shadow-lg">📝 Register</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex gap-4">
                        <input
                            type="text"
                            name="firstName"
                            placeholder="Enter First Name"
                            className="w-1/2 p-3 bg-white/20 placeholder-white text-gray-800 rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:bg-white/30 transition"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Enter Last Name"
                            className="w-1/2 p-3 bg-white/20 placeholder-white text-gray-800 rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:bg-white/30 transition"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        className="w-full p-3 bg-white/20 placeholder-white text-gray-800 rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:bg-white/30 transition"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="tel"
                        name="phoneNo"
                        placeholder="Enter Phone No."
                        className="w-full p-3 bg-white/20 placeholder-white text-gray-800 rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:bg-white/30 transition"
                        value={formData.phoneNo}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="w-full p-3 bg-white/20 placeholder-white text-gray-800 rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:bg-white/30 transition"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        className="w-full p-3 bg-white/20 placeholder-white text-gray-800 rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:bg-white/30 transition"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />

                    <button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-semibold rounded-xl shadow-lg hover:scale-105 transform transition duration-300"
                    >
                        Register
                    </button>
                </form>
            </div>
        </section>

    )
}

export default Register;