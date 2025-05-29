



import { Link } from "react-router-dom";
import { isLoggedIn, getUser } from "../utils/auth";

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
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative z-10">
        <div className="bg-white/10 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl p-12 max-w-4xl w-full transition-all duration-700 ease-in-out hover:shadow-purple-500/50">
          <h1 className="text-5xl font-extrabold text-purple-300 mb-8 tracking-tight drop-shadow-lg">
            Welcome to <span className="text-indigo-300">Online Judge</span>
          </h1>

          <p className="text-gray-200 text-xl mb-12 leading-relaxed max-w-3xl mx-auto">
            Dive into coding challenges, test your problem-solving skills, and rise up the leaderboard.
            <br />Start your journey to becoming a top programmer!
          </p>

          <div className="flex justify-center">
            <Link
              to="/problemList"
              className="bg-gradient-to-r from-indigo-600 via-purple-700 to-pink-600 text-white text-xl font-semibold px-12 py-4 rounded-3xl shadow-xl transform transition-transform hover:scale-110 hover:shadow-2xl"
            >
              🚀 Start Solving Problems
            </Link>
          </div>
        </div>
      </div>

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



// import { Link } from "react-router-dom";
// import { isLoggedIn, getUser } from "../utils/auth";

// const HomePage = () => {
//     const loggedIn = isLoggedIn();
//     const user = getUser();

//     return (
//         <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 text-center px-4">
//             <div className="bg-white shadow-2xl rounded-xl p-10 max-w-3xl w-full">
//                 <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-6 tracking-tight">
//                     Welcome to <span className="text-purple-600">Online Judge</span>
//                 </h1>

//                 <p className="text-gray-600 text-lg mb-10 leading-relaxed">
//                     Dive into coding challenges, test your problem-solving skills, and rise up the leaderboard. Start your journey to becoming a top programmer!
//                 </p>

//                 <div className="flex justify-center">
//                     <Link
//                         to="/problemList"
//                         className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-lg font-semibold px-8 py-3 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl"
//                     >
//                         🚀 Start Solving Problems
//                     </Link>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default HomePage;

