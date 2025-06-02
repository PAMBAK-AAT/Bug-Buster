


import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import { Trophy } from "lucide-react";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // On mount, read user from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Listen to storage event (in case login/logout happens in another tab)
    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem("user");
      setUser(updatedUser ? JSON.parse(updatedUser) : null);
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/auth");
  };

  return (
    <nav className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl
      fixed top-4 left-4 right-4 max-w-6xl mx-auto px-8 py-4 flex justify-between items-center
      shadow-md text-white font-semibold select-none z-50"
    >
      <Link
        to="/"
        className="hover:brightness-110 transition cursor-pointer text-2xl font-extrabold tracking-tight"
      >
        🧠 Online Judge
      </Link>

      <Link
        to="/leaderboard"
        className="flex items-center gap-2 px-4 py-2 rounded-xl text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
          hover:scale-105 hover:brightness-110 transition duration-300 shadow-md"
      >
        <Trophy size={18} />
        Leaderboard
      </Link>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <Link
              to="/profile"
              className="flex items-center gap-2 cursor-pointer hover:brightness-110 transition"
            >
              <User size={20} />
              <span>{user.firstName}</span>
            </Link>
            <button
              onClick={handleLogout}
              className="text-yellow-400 hover:text-yellow-300 font-semibold px-3 py-1
                rounded-lg border border-yellow-400 hover:border-yellow-300 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/auth"
            className="px-6 py-2 rounded-xl bg-gradient-to-r from-pink-400 via-red-500 to-yellow-400
              text-white font-semibold cursor-pointer hover:scale-105 transition"
          >
            Login / Register
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;




