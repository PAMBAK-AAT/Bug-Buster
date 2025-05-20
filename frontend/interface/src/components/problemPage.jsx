

import {useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProblemPage = () => {

    const [problems, setProblems] = useState([]);
    const [Loading, setLoading] = useState(true);

    useEffect(  () => {

        const fetchProblems = async () => {
            try {
                const res = await axios.get('http://localhost:3000/problemList');
                setProblems(res.data.problems);
                setLoading(false);
            } catch (error) {
                console.error("Error in fetching problems:", error);
                setLoading(false);
            }
        }
        fetchProblems();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">All Problems</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {problems.map((problem) => (
                    <div
                        key={problem._id}
                        className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition duration-300"
                    >
                        <Link
                            to={`/problem/${problem._id}`}
                            className="text-xl font-semibold text-blue-600 hover:underline"
                        >
                            {problem.title}
                        </Link>
                        <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                            {problem.description}
                        </p>

                        <div className="mt-4 text-sm text-gray-700 space-y-1">
                            <p><strong>Difficulty:</strong> {problem.difficulty}</p>
                            <p><strong>Tags:</strong> {problem.tags?.join(", ") || "None"}</p>
                            <p><strong>Time Limit:</strong> {problem.timeLimit}s</p>
                            <p><strong>Memory Limit:</strong> {problem.memoryLimit}MB</p>
                            <p><strong>Sample Input:</strong> {problem.sampleInput}</p>
                            <p><strong>Sample Output:</strong> {problem.sampleOutput}</p>
                        </div>

                        <p className="mt-3 text-xs text-gray-500">
                            Last updated: {new Date(problem.updatedAt).toLocaleDateString()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProblemPage;