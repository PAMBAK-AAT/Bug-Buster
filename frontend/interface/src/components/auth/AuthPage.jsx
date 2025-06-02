


import Register from "./Register.jsx";
import Login from "./Login.jsx";
import { useState } from "react";

const AuthPage = () => {
  const [showRegister, setShowRegister] = useState(true);

  const toggleForm = () => setShowRegister(prev => !prev);

  return (
    <>
      {/* Background + Overlay */}
      <div
        className="fixed inset-0 bg-cover bg-center -z-20"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1470&q=80')",
        }}
      />
      <div className="fixed inset-0 bg-black/70 -z-10" />

      {/* Particle Animation */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        {[...Array(60)].map((_, i) => {
          const colors = ['bg-teal-300', 'bg-purple-400', 'bg-pink-300', 'bg-sky-400'];
          const color = colors[Math.floor(Math.random() * colors.length)];
          return (
            <span
              key={i}
              className={`absolute rounded-full opacity-80 animate-elliptic-glow ${color}`}
              style={{
                width: `${Math.random() * 10 + 8}px`,
                height: `${Math.random() * 10 + 8}px`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${Math.random() * 8 + 6}s`,
              }}
            />
          );
        })}
      </div>

      {/* Auth Card */}
      <div className="min-h-screen flex items-center justify-center px-6 py-12">
        <div
          className="bg-white/10 backdrop-blur-2xl border border-white/30 rounded-3xl shadow-xl p-10 w-full max-w-xl transition-all duration-700 ease-in-out hover:shadow-cyan-500/50"
        >
          <h2 className="text-center text-white text-3xl font-extrabold mb-8 drop-shadow-lg">
            {showRegister ? "Create an Account 🌱" : "Welcome Back 🌞"}
          </h2>

          {/* Using key to remount form is fine here for clean reset */}
          <div className="transition-opacity duration-700 ease-in-out" key={showRegister ? "register" : "login"}>
            {showRegister ? <Register /> : <Login />}
          </div>

          <p className="mt-8 text-center text-white/90 text-lg select-none">
            {showRegister ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              type="button"
              onClick={toggleForm}
              className="text-yellow-400 hover:text-yellow-300 underline underline-offset-4 font-semibold focus:outline-none focus:ring-2 focus:ring-yellow-300 rounded"
              aria-label={showRegister ? "Switch to Login form" : "Switch to Register form"}
            >
              {showRegister ? "Login" : "Register"}
            </button>
          </p>
        </div>
      </div>

      {/* Elliptic Particle Animation Keyframes */}
      <style>{`
        @keyframes elliptic-glow {
          0% {
            transform: translateY(100vh) rotate(0deg) scale(1);
            opacity: 0;
          }
          25% {
            opacity: 1;
          }
          100% {
            transform: translateY(-20vh) rotate(720deg) scale(0.7);
            opacity: 0;
          }
        }

        .animate-elliptic-glow {
          animation-name: elliptic-glow;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          animation-fill-mode: forwards;
          will-change: transform, opacity;
          box-shadow: 0 0 10px rgba(255,255,255,0.2), 0 0 20px rgba(255,255,255,0.1);
        }
      `}</style>
    </>
  );
};

export default AuthPage;








// import Register from "./register.jsx";
// import Login from "./login.jsx";
// import { useState } from "react";

// const AuthPage = () => {
//   const [showRegister, setShowRegister] = useState(true);

//   return (
//     <>
//       {/* Nature Background + Overlay */}
//       <div
//         className="fixed inset-0 bg-cover bg-center -z-20"
//         style={{
//           backgroundImage:
//             "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1470&q=80')",
//         }}
//       ></div>
//       <div className="fixed inset-0 bg-black/70 -z-10"></div>

//       {/* Particle Animation */}
//       <div className="fixed inset-0 -z-10 pointer-events-none">
//         {[...Array(60)].map((_, i) => {
//           const colors = ['bg-teal-300', 'bg-purple-400', 'bg-pink-300', 'bg-sky-400'];
//           const color = colors[Math.floor(Math.random() * colors.length)];
//           return (
//             <span
//               key={i}
//               className={`absolute rounded-full opacity-80 animate-elliptic-glow ${color}`}
//               style={{
//                 width: `${Math.random() * 10 + 8}px`,
//                 height: `${Math.random() * 10 + 8}px`,
//                 left: `${Math.random() * 100}%`,
//                 animationDelay: `${Math.random() * 10}s`,
//                 animationDuration: `${Math.random() * 8 + 6}s`,
//               }}
//             />
//           );
//         })}
//       </div>

//       {/* Auth Card */}
//       <div className="min-h-screen flex items-center justify-center px-6 py-12">
//         <div
//           className="bg-white/10 backdrop-blur-2xl border border-white/30 rounded-3xl shadow-xl p-10 w-full max-w-xl transition-all duration-700 ease-in-out hover:shadow-cyan-500/50"
//         >
//           <h2 className="text-center text-white text-3xl font-extrabold mb-8 drop-shadow-lg">
//             {showRegister ? "Create an Account 🌱" : "Welcome Back 🌞"}
//           </h2>

//           <div
//             className="transition-opacity duration-700 ease-in-out"
//             key={showRegister ? "register" : "login"}
//           >
//             {showRegister ? <Register /> : <Login />}
//           </div>

//           <p className="mt-8 text-center text-white/90 text-lg select-none">
//             {showRegister ? "Already have an account?" : "Don't have an account?"}{" "}
//             <button
//               onClick={() => setShowRegister(!showRegister)}
//               className="text-yellow-400 hover:text-yellow-300 underline underline-offset-4 font-semibold focus:outline-none focus:ring-2 focus:ring-yellow-300 rounded"
//             >
//               {showRegister ? "Login" : "Register"}
//             </button>
//           </p>
//         </div>
//       </div>

//       {/* Elliptic Particle Animation Keyframes */}
//       <style>{`
//         @keyframes elliptic-glow {
//           0% {
//             transform: translateY(100vh) rotate(0deg) scale(1);
//             opacity: 0;
//           }
//           25% {
//             opacity: 1;
//           }
//           100% {
//             transform: translateY(-20vh) rotate(720deg) scale(0.7);
//             opacity: 0;
//           }
//         }

//         .animate-elliptic-glow {
//           animation-name: elliptic-glow;
//           animation-timing-function: ease-in-out;
//           animation-iteration-count: infinite;
//           animation-fill-mode: forwards;
//           will-change: transform, opacity;
//           box-shadow: 0 0 10px rgba(255,255,255,0.2), 0 0 20px rgba(255,255,255,0.1);
//         }
//       `}</style>
//     </>
//   );
// };

// export default AuthPage;




