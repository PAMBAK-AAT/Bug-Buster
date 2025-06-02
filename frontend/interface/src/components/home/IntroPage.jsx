
import { Link } from 'react-router-dom'
import React, { useEffect, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

import profileImg from "../../assets/profile2.jpg";

const quotes = [
  {
    q: "Study isn't about memorizing facts, it's about wiring your brain to think deeply, solve elegantly, and learn relentlessly. In the end, knowledge fades, but the mindset stays.",
    a: "Mohd Arshad",
  },
  {
    q: "Coding is not about typing lines; it’s about architecting logic. A true developer builds systems the way poets build stanzas — with clarity, rhythm, and intent.",
    a: "Mohd Arshad",
  },
  {
    q: "A software engineer isn't just a coder — he's a thinker, a problem solver, and an artist whose canvas is the IDE and whose brush is logic.",
    a: "Mohd Arshad",
  },
  {
    q: "In both studying and coding, consistency beats talent. The one who shows up every day, however imperfect, will always outrun the one who waits for the perfect moment.",
    a: "Mohd Arshad",
  },
  {
    q: "Every bug teaches you a lesson that theory never could. That’s the beauty of code — it rewards curiosity and punishes carelessness with wisdom.",
    a: "Mohd Arshad",
  },
  {
    q: "When you study with passion and code with purpose, you're not just building software — you're building your mind into a fortress of clarity and discipline.",
    a: "Mohd Arshad",
  },
  {
    q: "Great engineers aren't born with talent — they're built by thousands of hours spent debugging, doubting, failing, and refusing to give up.",
    a: "Mohd Arshad",
  },
  {
    q: "A student's strength lies not in how quickly they understand, but in how relentlessly they pursue understanding. The same applies to code — it’s not how fast you write, but how deeply you think.",
    a: "Mohd Arshad",
  },
  {
    q: "Behind every elegant solution is a series of painful iterations, mental rewrites, and silent perseverance. That’s the untold story of every software engineer.",
    a: "Mohd Arshad",
  },
  {
    q: "In the world of code and study, intelligence can give you a head start — but grit, discipline, and obsession with learning will take you to the finish line.",
    a: "Mohd Arshad",
  },
];

export default function HomePage() {
  const [quote, setQuote] = useState({ q: "", a: "" });

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  }, []);

  return (
    <>
      {/* Background Gradient + Particles */}
      <div className="fixed inset-0 bg-gradient-to-br from-cyan-900 via-sky-800 to-blue-900 -z-20">
        <div className="relative w-full h-full overflow-hidden">
          {[...Array(50)].map((_, i) => {
            const colors = [
              "bg-cyan-400",
              "bg-pink-400",
              "bg-purple-400",
              "bg-blue-300",
            ];
            const color = colors[Math.floor(Math.random() * colors.length)];
            return (
              <span
                key={i}
                className={`absolute rounded-full opacity-80 animate-elliptic-glow ${color}`}
                style={{
                  width: `${Math.random() * 10 + 8}px`,
                  height: `${Math.random() * 10 + 8}px`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 8}s`,
                  animationDuration: `${Math.random() * 6 + 6}s`,
                }}
              />
            );
          })}
        </div>
      </div>
      <div className="fixed inset-0 bg-black/60 -z-10"></div>

      {/* Main Layout */}
      <div className="min-h-screen flex items-center justify-center px-6 py-12">
        <div className="max-w-7xl w-full flex flex-col md:flex-row items-start gap-12">
          {/* Profile Section */}
          <div className="flex-1 bg-white bg-opacity-20 rounded-3xl p-6 backdrop-blur-md border border-white/30 shadow-lg text-white">
            {/* Image + Right Side Info */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Profile Image */}
              <img
                src={profileImg}
                alt="Mohd Arshad"
                className="w-72 h-72 rounded-3xl border-4 border-cyan-400 object-cover shadow-xl"
              />

              {/* Name, Role, Socials */}
              <div className="flex flex-col justify-center text-center md:text-left">
                <h2 className="text-3xl font-extrabold text-white">Mohd Arshad</h2>
                <p className="text-lg text-cyan-300 font-medium mt-1">MERN Stack Developer</p>

                <div className="flex mt-4 space-x-6 justify-center md:justify-start text-cyan-300 text-2xl">
                  <a
                    href="https://github.com/PAMBAK-AAT"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white"
                  >
                    <FaGithub />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/mohd-arshad-292a47278/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white"
                  >
                    <FaLinkedin />
                  </a>
                </div>
              </div>
            </div>

            {/* Description Below */}
            <div className="mt-8 text-base leading-relaxed text-white/90">
              <Link to="/" className="text-xl font-semibold text-cyan-300 mb-2">
                Online Judge Platform
              </Link>
              <p>
                I’m building a powerful and scalable <strong>Online Judge</strong> using the MERN stack with modern tools and infrastructure. It supports real-time code execution, problem solving, and user submissions — currently for C++.
                <br />
                This platform uses <strong>Docker</strong> containers for secure, isolated code execution and is integrated with <strong>AWS</strong> for future scalability. It features a clean UI, protected routes, login state management with localStorage, and a backend that’s optimized for performance.
              </p>
            </div>
          </div>


          {/* Quote Section */}
          <div className="flex-1 bg-white bg-opacity-20 rounded-3xl p-6 backdrop-blur-md border border-white/30 shadow-lg text-white max-w-xl text-center md:text-left">
            <p className="text-2xl font-light border-l-4 border-cyan-400 pl-6 leading-relaxed select-text">
              “{quote.q}”
            </p>
            <p className="mt-4 font-semibold text-cyan-300 text-lg select-text">
              — {quote.a}
            </p>
          </div>
        </div>
      </div>

      {/* Particle Animation CSS */}
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
            transform: translateY(-30vh) rotate(720deg) scale(0.7);
            opacity: 0;
          }
        }
        .animate-elliptic-glow {
          animation-name: elliptic-glow;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          animation-fill-mode: forwards;
          will-change: transform, opacity;
          box-shadow: 0 0 10px rgba(255,255,255,0.3), 0 0 20px rgba(255,255,255,0.1);
        }
      `}</style>
    </>
  );
}



