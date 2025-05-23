


import { Link } from "react-router-dom";
import { isLoggedIn, getUser, logout } from "../utils/auth";

const Navbar = () => {
    const loggedIn = isLoggedIn();
    const user = getUser();

    return (
        <nav className="backdrop-blur-md bg-white/80 shadow-md px-6 py-4 flex justify-between items-center fixed top-0 left-0 w-full z-50 border-b border-gray-200">
            {/* Logo */}
            <Link
                to="/"
                className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
            >
                🧠 Online Judge
            </Link>

            {/* Right Side */}
            <div className="flex items-center gap-4">
                {loggedIn ? (
                    <>
                        <Link
                            to="/profile"
                            className="text-blue-600 font-medium hover:underline transition duration-200"
                        >
                            👋 Hi, {user?.firstName}
                        </Link>
                        <button
                            onClick={() => {
                                logout();
                                window.location.reload();
                            }}
                            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg transition"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link
                            to="/auth"
                            className="bg-gray-700 text-white font-semibold px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                        >
                            Register
                        </Link>
                        <Link
                            to="/auth"
                            className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            Login
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
