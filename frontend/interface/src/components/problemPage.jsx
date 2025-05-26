




import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Clock,
  Database,
  Tag,
  Calendar,
  ChevronRight,
  Terminal,
} from 'lucide-react';

const ProblemPage = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const res = await axios.get('http://localhost:3000/problemList');
        setProblems(res.data.problems);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching problems:", error);
        setLoading(false);
      }
    };
    fetchProblems();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-6">
      <h2 className="flex items-center justify-center text-4xl font-extrabold mb-10 text-indigo-700 gap-3">
        <BookOpen size={40} /> All Problems
      </h2>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {problems.map((problem) => (
          <div
            key={problem._id}
            className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-transform hover:-translate-y-1 p-6 border border-gray-200 flex flex-col justify-between"
          >
            <Link
              to={`/problem/${problem._id}`}
              className="flex items-center text-2xl font-semibold text-indigo-700 hover:text-indigo-900 hover:underline gap-2"
            >
              {problem.title} <ChevronRight size={20} />
            </Link>

            <p className="mt-3 text-gray-600 text-sm line-clamp-3">{problem.description}</p>

            <div className="mt-6 space-y-2 text-gray-700 text-sm">
              <p className="flex items-center gap-2">
                <Clock size={16} className="text-indigo-600" />
                <span><strong>Time Limit:</strong> {problem.timeLimit}s</span>
              </p>

              <p className="flex items-center gap-2">
                <Database size={16} className="text-indigo-600" />
                <span><strong>Memory Limit:</strong> {problem.memoryLimit} MB</span>
              </p>

              <p className="flex items-center gap-2">
                <Tag size={16} className="text-indigo-600" />
                <span><strong>Difficulty:</strong> <span className="capitalize">{problem.difficulty}</span></span>
              </p>

              {(problem.sampleInput || problem.sampleOutput) && (
                <>
                  {problem.sampleInput && (
                    <p className="flex items-center gap-2">
                      <Terminal size={16} className="text-indigo-600" />
                      <span><strong>Sample Input:</strong> <code className="bg-gray-100 px-1 rounded">{problem.sampleInput}</code></span>
                    </p>
                  )}
                  {problem.sampleOutput && (
                    <p className="flex items-center gap-2">
                      <Terminal size={16} className="text-indigo-600" />
                      <span><strong>Sample Output:</strong> <code className="bg-gray-100 px-1 rounded">{problem.sampleOutput}</code></span>
                    </p>
                  )}
                </>
              )}

              {problem.tags && problem.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {problem.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-indigo-100 text-indigo-800 px-3 py-0.5 rounded-full text-xs font-medium cursor-default"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <p className="mt-6 flex items-center text-xs text-gray-400 gap-2">
              <Calendar size={14} aria-hidden="true" />
              Last updated: {problem.updatedAt ? new Date(problem.updatedAt).toLocaleDateString() : 'N/A'}
            </p>

          </div>
        ))}
      </div>
    </div>
  );
};

export default ProblemPage;



