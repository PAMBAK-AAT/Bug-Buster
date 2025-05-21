

// src/components/Navbar.jsx

import { Link } from "react-router-dom";
import { isLoggedIn, getUser, logout } from "../utils/auth";

const Navbar = () => {
    const loggedIn = isLoggedIn();
    const user = getUser();

    return (
        <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center fixed top-0 left-0 w-full z-50">
            <Link to="/" className="text-2xl font-bold text-blue-700">Online Judge</Link>

            <div className="flex items-center gap-4">
                {loggedIn ? (
                    <>
                        <Link
                            to="/profile"
                            className="text-blue-600 font-semibold hover:underline"
                        >
                            Welcome, {user?.firstName}
                        </Link>
                        <button
                            onClick={() => {
                                logout();
                                window.location.reload();
                            }}
                            className="bg-red-500 px-4 py-2 rounded text-white"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/register" className="text-white bg-gray-600 px-4 py-2 rounded-lg">Register</Link>
                        <Link to="/login" className="text-white bg-blue-600 px-4 py-2 rounded-lg">Login</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
