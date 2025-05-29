

import { Link } from "react-router-dom";
import { isLoggedIn, getUser, logout } from "../utils/auth";
import { LogIn, LogOut, UserPlus } from "lucide-react";

const Navbar = () => {
  const loggedIn = isLoggedIn();
  const user = getUser();

  return (
    <nav className="backdrop-blur-xl bg-white/70 shadow-md px-6 py-4 flex justify-between items-center fixed top-0 left-0 w-full z-50 border-b border-gray-200">
      {/* Logo */}
      <Link
        to="/"
        className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent animate-text-glow drop-shadow-md tracking-tight"
      >
        🧠 Online Judge
      </Link>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {loggedIn ? (
          <>
            <Link
              to="/profile"
              className="text-indigo-700 font-semibold hover:text-indigo-900 transition duration-200 underline-offset-2 hover:underline"
            >
              👋 Hi, {user?.firstName}
            </Link>
            <button
              onClick={() => {
                logout();
                window.location.reload();
              }}
              className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 hover:brightness-110 text-white px-4 py-2 rounded-lg font-semibold shadow-md transition"
            >
              <LogOut size={18} /> Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/auth"
              className="flex items-center gap-2 bg-gradient-to-r from-gray-700 to-gray-900 text-white px-4 py-2 rounded-lg hover:scale-105 font-medium shadow hover:shadow-xl transition"
            >
              <UserPlus size={18} /> Register
            </Link>
            <Link
              to="/auth"
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:scale-105 font-medium shadow hover:shadow-xl transition"
            >
              <LogIn size={18} /> Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

