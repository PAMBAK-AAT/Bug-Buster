

import {useState} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import toast for notifications

const Login = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/login", formData);
            console.log("User login successfully", response.data);
            toast.success("User login successfully!");
        }
        catch (error) {
            console.error("Error in login", error.response?.data || error.message);
            toast.error(error.response?.data || error.message);
        }
    }

    return (

        <section className="min-h-screen bg-gradient-to-tr from-purple-600 via-blue-500 to-indigo-600 flex items-center justify-center p-4">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-10 w-full max-w-md border border-white/20 animate-fade-in">
                <h2 className="text-3xl font-extrabold text-white text-center mb-8 drop-shadow-lg">🔐 Login Page</h2>
                <form className="space-y-6">
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full p-3 bg-white/20 placeholder-white text-white rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:bg-white/30 transition"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full p-3 bg-white/20 placeholder-white text-white rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:bg-white/30 transition"
                    />
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="w-full py-3 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-semibold rounded-xl shadow-lg hover:scale-105 transform transition duration-300"
                    >
                        Login
                    </button>
                </form>
            </div>
        </section>

    )
}


export default Login;