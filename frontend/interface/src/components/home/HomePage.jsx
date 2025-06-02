import { Link } from "react-router-dom";
import { isLoggedIn, getUser } from "../../utils/auth";

const HomePage = () => {
  const loggedIn = isLoggedIn();
  const user = getUser();

  return (
    <>
      {/* Background Image + Overlay */}
      <div
        className="fixed inset-0 bg-cover bg-center -z-20"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1950&q=80')",
        }}
      ></div>
      <div className="fixed inset-0 bg-black/70 -z-10"></div>

      {/* Particle Animation */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        {[...Array(70)].map((_, i) => {
          const colors = ['bg-indigo-400', 'bg-purple-500', 'bg-pink-500', 'bg-blue-400'];
          const color = colors[Math.floor(Math.random() * colors.length)];
          return (
            <span
              key={i}
              className={`absolute rounded-full opacity-80 animate-float-glow ${color}`}
              style={{
                width: `${Math.random() * 8 + 6}px`,
                height: `${Math.random() * 8 + 6}px`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${Math.random() * 8 + 6}s`,
              }}
            />
          );
        })}
      </div>

      {/* Main Content */}
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white/10 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl p-6 sm:p-10 md:p-12 w-full max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-4xl transition-all duration-700 ease-in-out hover:shadow-purple-500/50">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-purple-300 mb-6 sm:mb-8 tracking-tight drop-shadow-lg">
            Welcome to <span className="text-indigo-300">Bug-Buster</span>
          </h1>

          <p className="text-base sm:text-xl text-gray-200 mb-10 sm:mb-12 leading-relaxed max-w-3xl mx-auto">
            Dive into coding challenges, test your problem-solving skills, and rise up the leaderboard.
            <br />Start your journey to becoming a top programmer!
          </p>

          <div className="flex justify-center">
            <Link
              to="/problemList"
              className="bg-gradient-to-r from-indigo-600 via-purple-700 to-pink-600 text-white text-sm sm:text-xl font-semibold px-6 sm:px-12 py-3 sm:py-4 rounded-3xl shadow-xl transform transition-transform hover:scale-110 hover:shadow-2xl"
            >
              🚀 Start Solving Problems
            </Link>
          </div>
        </div>
      </div>

      {/* Top-Right Button */}
      <Link
        to="/intro"
        className="fixed top-5 right-5 sm:top-20 sm:right-6 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold px-4 py-2 sm:px-5 sm:py-2 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 z-50 text-sm sm:text-base"
      >
        👤 Meet the Creator
      </Link>

      {/* Animation CSS */}
      <style>{`
        @keyframes float-glow {
          0% {
            transform: translateY(100vh) rotate(0deg) scale(1);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% {
            transform: translateY(-10vh) rotate(720deg) scale(0.7);
            opacity: 0;
          }
        }

        .animate-float-glow {
          animation-name: float-glow;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          animation-fill-mode: forwards;
          will-change: transform, opacity;
          box-shadow: 0 0 12px rgba(255,255,255,0.2), 0 0 20px rgba(255,255,255,0.1);
        }
      `}</style>
    </>
  );
};

export default HomePage;

