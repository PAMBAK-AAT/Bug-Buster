import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { User, Trophy, ListOrdered, CalendarDays } from 'lucide-react';

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/leaderboard`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUsers(res.data);
      } catch (err) {
        setError("Failed to fetch Leaderboard");
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  if (loading) return <p className="text-center mt-10 text-cyan-400">Loading leaderboard...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <>
      {/* Background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <span
            key={i}
            className="floating-icon absolute text-gray-700 animate-float select-none"
            style={{
              fontSize: `${Math.random() * 20 + 14}px`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${Math.random() * 10 + 6}s`,
              top: `${Math.random() * 100}%`,
            }}
          >
            {["🎉", "🎯", "💡", "✨", "🏅", "📈"][Math.floor(Math.random() * 6)]}
          </span>
        ))}
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-10 text-center text-cyan-200 flex items-center justify-center gap-3 drop-shadow-xl">
          <Trophy className="text-yellow-400" size={32} /> Leaderboard
        </h1>

        <div className="rounded-xl overflow-hidden shadow-2xl border border-cyan-800 bg-gray-800/70 backdrop-blur-md">
          <table className="w-full text-sm text-cyan-100">
            <thead className="bg-cyan-900 text-cyan-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold"><ListOrdered size={16} className="inline mr-2" />Rank</th>
                <th className="px-6 py-4 text-left text-sm font-semibold"><User size={16} className="inline mr-2" />Name</th>
                <th className="px-6 py-4 text-center text-sm font-semibold">Questions Solved</th>
                <th className="px-6 py-4 text-left text-sm font-semibold"><CalendarDays size={16} className="inline mr-2" />Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => {
                const rankDisplay = idx === 0
                  ? <span className="text-yellow-400 text-xl">🥇</span>
                  : idx === 1
                  ? <span className="text-gray-300 text-xl">🥈</span>
                  : idx === 2
                  ? <span className="text-orange-400 text-xl">🥉</span>
                  : <span className="font-bold text-cyan-300">{idx + 1}</span>;

                return (
                  <tr
                    key={user._id}
                    className={`cursor-pointer transition-colors duration-300 border-b border-cyan-700 
                    ${idx % 2 === 0 ? 'bg-gray-800/70' : 'bg-gray-900/70'} 
                    hover:bg-cyan-700/40 hover:text-white`}
                  >
                    <td className="px-6 py-4 font-bold">{rankDisplay}</td>
                    <td className="px-6 py-4">{user.firstName} {user.lastName}</td>
                    <td className="px-6 py-4 text-center font-semibold text-cyan-300">{user.noOfQuesSolved || 0}</td>
                    <td className="px-6 py-4 text-sm text-cyan-400">{new Date(user.createdAt).toLocaleDateString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Floating Confetti Animation */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); opacity: 0.3; }
          50% { opacity: 0.6; }
          100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
        .animate-float {
          animation-name: float;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: transform, opacity;
        }
      `}</style>
    </>
  );
};

export default Leaderboard;


