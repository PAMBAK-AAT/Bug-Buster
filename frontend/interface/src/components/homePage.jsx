import { Link } from "react-router-dom";
import { isLoggedIn, getUser, logout } from "../utils/auth";

const HomePage = () => {
    const loggedIn = isLoggedIn();
    const user = getUser();

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center text-center px-4">
            

            <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-6">
                Welcome to Online Judge
            </h1>
            <p className="text-gray-700 text-lg mb-8 max-w-xl">
                Solve programming problems, improve your skills, and compete with others.
            </p>
            <div className="flex gap-4">
                <Link to="/problemList" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow">
                    View Problems
                </Link>
            </div>
        </div>
    );
};

export default HomePage;
