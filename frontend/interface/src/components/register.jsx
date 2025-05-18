

import { useState } from 'react';
import axios from 'axios';


const Register = () => {

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNo: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent refreshing of page on submission
        
        try {
            const response = await axios.post("http://localhost:3000/register", formData);
            console.log("Registration Successful: ", response.data);
            alert("User registered successfully");
        } catch (error) {
            console.error("Error during registration:", error.response?.data || error.message);
            alert(error.response?.data || "Something went wrong");
        }
    };

    return (

        <section className="bg-gray-50 min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex gap-4">
                        <input
                            type="text"
                            name="firstName"
                            placeholder="enterFirst Name"
                            className="w-1/2 p-2 border rounded"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="lastName"
                            placeholder="enter Last Name"
                            className="w-1/2 p-2 border rounded"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <input
                        type="text"
                        name="email"
                        placeholder="enter email"
                        className="w-full p-2 border rounded"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="tel"
                        name="phoneNo"
                        placeholder="enter phone no."
                        className="w-full p-2 border rounded"
                        value={formData.phoneNo}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="w-full p-2 border rounded"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        className="w-full p-2 border rounded"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                    >
                        Register
                    </button>

                </form>
            </div>
        </section>
    )
}

export default Register;