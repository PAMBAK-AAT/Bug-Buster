


import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Loader2, FileText, Zap, Clock, MemoryStick } from 'lucide-react';

const ProblemDetails = () => {
    const { id } = useParams();
    const [problem, setProblem] = useState(null);

    useEffect(() => {
        const fetchProblem = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/problem/${id}`);
                setProblem(res.data.problem);
            } catch (error) {
                console.error("Error fetching problem:", error);
            }
        };
        fetchProblem();
    }, [id]);

    if (!problem) {
        return (
            <div className="flex items-center justify-center h-screen bg-slate-50">
                <Loader2 className="animate-spin h-8 w-8 text-blue-600" />
                <p className="ml-3 text-blue-600 font-medium">Loading Problem...</p>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-6 py-10 bg-white rounded-3xl shadow-lg border border-gray-200 mt-10 select-text">
            <h1 className="text-4xl font-extrabold text-indigo-700 mb-6 tracking-tight">{problem.title}</h1>
            <p className="text-gray-700 text-lg mb-8 leading-relaxed border-l-4 pl-4 border-blue-400 italic">
                {problem.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-800 mb-10">
                <p><FileText className="inline w-5 h-5 mr-2 text-blue-500" /><strong className="text-gray-900">Input Format:</strong> {problem.inputFormat}</p>
                <p><FileText className="inline w-5 h-5 mr-2 text-blue-500" /><strong className="text-gray-900">Output Format:</strong> {problem.outputFormat}</p>
                <p><Zap className="inline w-5 h-5 mr-2 text-orange-500" /><strong className="text-gray-900">Constraints:</strong> {problem.constraints}</p>
                <p><strong>Difficulty:</strong> <span className={`px-2 py-0.5 rounded-full text-white ${problem.difficulty === 'easy' ? 'bg-green-500' : problem.difficulty === 'medium' ? 'bg-yellow-500' : 'bg-red-500'}`}>
                    {problem.difficulty}
                </span></p>
                <p><strong>Tags:</strong> {problem.tags?.map((tag, idx) => (
                    <span key={idx} className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                        #{tag}
                    </span>
                ))}</p>
                <p><Clock className="inline w-5 h-5 mr-2 text-purple-500" /><strong>Time Limit:</strong> {problem.timeLimit}s</p>
                <p><MemoryStick className="inline w-5 h-5 mr-2 text-pink-500" /><strong>Memory Limit:</strong> {problem.memoryLimit}MB</p>
            </div>
            
            <div className="mt-10">
                <h3 className="text-2xl font-bold text-blue-600 mb-4">🧪 Sample Test Cases</h3>
                {problem.testCases
                  ?.filter(tc => !tc.isHidden)    // Only show visible (sample) test cases
                  .slice(0, 4)                    // max 4 samples to show
                  .map((tc, index) => (
                    <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-6">
                        <h4 className="text-md font-semibold text-gray-800 mb-2">Test Case {index + 1}</h4>
                        
                        <div>
                            <p className="text-gray-600 font-medium">Input:</p>
                            <pre className="bg-white text-sm border rounded p-3 overflow-x-auto whitespace-pre-wrap text-gray-800">{tc.input}</pre>
                        </div>

                        <div className="mt-3">
                            <p className="text-gray-600 font-medium">Expected Output:</p>
                            <pre className="bg-white text-sm border rounded p-3 overflow-x-auto whitespace-pre-wrap text-gray-800">{tc.output}</pre>
                        </div>

                        <p className="mt-2 text-xs text-gray-500 italic">(Sample Test Case)</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProblemDetails;
