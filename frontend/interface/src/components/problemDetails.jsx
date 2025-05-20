


import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // useParams() returns an object of URL parameters: { id: "66019bd8a02a2b001c6fb37a"}

const ProblemDetails = () => {

    const { id } = useParams(); // Extracting the problem ID from the URL
    const [problem, setProblem] = useState(null);

    useEffect(() => {
        const fetchProblem = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/problem/${id}`);
                setProblem(res.data.problem);
            } catch (error) {
                console.error("Error fetching problem:", error);
            }
        };
        fetchProblem();
    }, [id]);

    if (!problem) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="max-w-4xl mx-auto p-8 mt-10 bg-white shadow-lg rounded-lg border border-gray-200">
            <h1 className="text-3xl font-extrabold text-blue-700 mb-4">{problem.title}</h1>
            <p className="text-gray-800 text-base mb-6 leading-relaxed">{problem.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                <p><span className="font-semibold text-gray-900">Input Format:</span> {problem.inputFormat}</p>
                <p><span className="font-semibold text-gray-900">Output Format:</span> {problem.outputFormat}</p>
                <p><span className="font-semibold text-gray-900">Constraints:</span> {problem.constraints}</p>
                <p><span className="font-semibold text-gray-900">Difficulty:</span> {problem.difficulty}</p>
                <p><span className="font-semibold text-gray-900">Tags:</span> {problem.tags?.join(", ")}</p>
                <p><span className="font-semibold text-gray-900">Time Limit:</span> {problem.timeLimit} sec</p>
                <p><span className="font-semibold text-gray-900">Memory Limit:</span> {problem.memoryLimit} MB</p>
            </div>

            {/* <div className="mt-6">
                <p className="font-semibold text-gray-900 mb-1">Sample Input:</p>
                <pre className="bg-gray-100 p-3 rounded overflow-x-auto whitespace-pre-wrap">{problem.sampleInput}</pre>
            </div>

            <div className="mt-4">
                <p className="font-semibold text-gray-900 mb-1">Sample Output:</p>
                <pre className="bg-gray-100 p-3 rounded overflow-x-auto whitespace-pre-wrap">{problem.sampleOutput}</pre>
            </div> */}

            <div className="mt-6">
                <h3 className="text-xl font-semibold text-blue-600 mb-2">Test Cases:</h3>
                {problem.testCases?.slice(0, 4).map((tc, index) => (
                    <div key={index} className="bg-gray-50 border p-4 mb-3 rounded">
                        <p className="font-semibold text-gray-800">Test Case {index + 1}</p>
                        <p><span className="font-medium text-gray-700">Input:</span></p>
                        <pre className="bg-white border rounded p-2 overflow-x-auto whitespace-pre-wrap">{tc.input}</pre>
                        <p className="mt-2"><span className="font-medium text-gray-700">Expected Output:</span></p>
                        <pre className="bg-white border rounded p-2 overflow-x-auto whitespace-pre-wrap">{tc.output}</pre>
                        <p className="text-sm text-gray-500 mt-1">{tc.isHidden ? "(Hidden test case)" : "(Visible test case)"}</p>
                    </div>
                ))}
            </div>
        </div>
    );


};

export default ProblemDetails;