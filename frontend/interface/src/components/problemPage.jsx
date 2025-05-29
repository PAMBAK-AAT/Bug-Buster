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
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-indigo-100 to-blue-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <>
      {/* Particle Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-900 via-blue-900 to-black -z-20">
        <div className="relative w-full h-full overflow-hidden">
          {[...Array(60)].map((_, i) => (
            <span
              key={i}
              className="particle absolute rounded-full bg-pink-400 opacity-60 animate-float-twirl"
              style={{
                width: `${Math.random() * 6 + 6}px`,  // 6px to 12px
                height: `${Math.random() * 6 + 6}px`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${Math.random() * 4 + 6}s`,  // 6s to 10s
              }}
            />
          ))}
        </div>
      </div>

      {/* Overlay */}
      <div className="fixed inset-0 bg-black/60 -z-10"></div>

      {/* Main Content */}
      <div className="min-h-screen bg-transparent py-10 px-6 relative z-10">
        <h2 className="flex items-center justify-center text-5xl font-extrabold mb-12 text-indigo-200 gap-4 drop-shadow-lg">
          <BookOpen size={44} /> Practice Problems
        </h2>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {problems.map((problem) => (
            <div
              key={problem._id}
              className="bg-white/90 backdrop-blur-xl border border-indigo-200 shadow-xl hover:shadow-[0_10px_30px_rgba(99,102,241,0.4)] rounded-3xl p-6 transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.02]"
            >
              <Link
                to={`/problem/${problem._id}`}
                className="flex items-center text-2xl font-bold text-indigo-700 hover:text-indigo-900 hover:underline gap-2"
              >
                {problem.title}
                <ChevronRight size={22} />
              </Link>

              <p className="mt-3 text-gray-600 text-sm line-clamp-3">{problem.description}</p>

              <div className="mt-6 space-y-3 text-sm text-gray-700">
                <p className="flex items-center gap-2">
                  <Clock size={16} className="text-indigo-500" />
                  <strong>Time Limit:</strong> {problem.timeLimit}s
                </p>
                <p className="flex items-center gap-2">
                  <Database size={16} className="text-indigo-500" />
                  <strong>Memory Limit:</strong> {problem.memoryLimit} MB
                </p>
                <p className="flex items-center gap-2">
                  <Tag size={16} className="text-indigo-500" />
                  <strong>Difficulty:</strong>{' '}
                  <span
                    className={`capitalize font-semibold px-2 py-0.5 rounded-full text-white 
                      ${problem.difficulty === 'easy' ? 'bg-green-500' :
                      problem.difficulty === 'medium' ? 'bg-yellow-500' : 'bg-red-500'}`}
                  >
                    {problem.difficulty}
                  </span>
                </p>

                {problem.sampleInput && (
                  <p className="flex items-center gap-2">
                    <Terminal size={16} className="text-indigo-500" />
                    <strong>Sample Input:</strong> <code className="bg-gray-100 px-2 py-0.5 rounded text-indigo-700">{problem.sampleInput}</code>
                  </p>
                )}
                {problem.sampleOutput && (
                  <p className="flex items-center gap-2">
                    <Terminal size={16} className="text-indigo-500" />
                    <strong>Sample Output:</strong> <code className="bg-gray-100 px-2 py-0.5 rounded text-indigo-700">{problem.sampleOutput}</code>
                  </p>
                )}

                {problem.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {problem.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-indigo-100 text-indigo-800 px-3 py-0.5 rounded-full text-xs font-semibold"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <p className="mt-6 flex items-center text-xs text-gray-500 gap-2">
                <Calendar size={14} />
                Last updated: {problem.updatedAt ? new Date(problem.updatedAt).toLocaleDateString() : 'N/A'}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Particle Animation */}
      <style>{`
        @keyframes float-twirl {
          0% {
            transform: translateY(100vh) rotate(0deg) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          100% {
            transform: translateY(-10vh) rotate(720deg) scale(0.8);
            opacity: 0;
          }
        }
        .animate-float-twirl {
          animation-name: float-twirl;
          animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
          animation-iteration-count: infinite;
          animation-direction: normal;
          animation-fill-mode: forwards;
          will-change: transform, opacity;
        }
      `}</style>
    </>
  );
};

export default ProblemPage;


