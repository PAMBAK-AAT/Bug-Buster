
import { Link } from "react-router-dom";
import { isLoggedIn, getUser } from "../utils/auth";

const HomePage = () => {
    const loggedIn = isLoggedIn();
    const user = getUser();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 text-center px-4">
            <div className="bg-white shadow-2xl rounded-xl p-10 max-w-3xl w-full">
                <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-6 tracking-tight">
                    Welcome to <span className="text-purple-600">Online Judge</span>
                </h1>

                <p className="text-gray-600 text-lg mb-10 leading-relaxed">
                    Dive into coding challenges, test your problem-solving skills, and rise up the leaderboard. Start your journey to becoming a top programmer!
                </p>

                <div className="flex justify-center">
                    <Link
                        to="/problemList"
                        className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-lg font-semibold px-8 py-3 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl"
                    >
                        🚀 Start Solving Problems
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HomePage;

