import React, { useEffect, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

import profileImg from "../assets/profile.jpg";

const quotes = [
  {
    q: "Code is like humor. When you have to explain it, it’s bad.",
    a: "Cory House",
  },
  {
    q: "Programs must be written for people to read, and only incidentally for machines to execute.",
    a: "Harold Abelson",
  },
  {
    q: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    a: "Martin Fowler",
  },
  {
    q: "First, solve the problem. Then, write the code.",
    a: "John Johnson",
  },
  {
    q: "Experience is the name everyone gives to their mistakes.",
    a: "Oscar Wilde",
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
      {/* Background Particle Animation */}
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

      {/* Semi-transparent overlay */}
      <div className="fixed inset-0 bg-black/60 -z-10"></div>

      {/* Main Container */}
      <div className="min-h-screen flex items-center justify-center px-6 py-12">
        <div className="max-w-6xl w-full flex flex-col md:flex-row items-center md:justify-between gap-14">
          {/* Quote Card */}
          <div className="flex-1 bg-white bg-opacity-20 rounded-3xl p-10 backdrop-blur-md border border-white/30 shadow-lg text-white max-w-xl text-center md:text-left">
            <p className="text-3xl font-light border-l-4 border-cyan-400 pl-8 leading-relaxed select-text">
              “{quote.q}”
            </p>
            <p className="mt-6 font-semibold text-cyan-300 text-xl select-text">
              — {quote.a}
            </p>
          </div>

          {/* Profile Card */}
          <div className="flex-1 max-w-sm bg-white bg-opacity-20 rounded-3xl p-10 text-center shadow-xl backdrop-blur-md border border-white/30">
            <img
              src={profileImg}
              alt="Mohd Arshad"
              className="mx-auto w-40 h-40 rounded-full border-4 border-cyan-400 object-cover shadow-lg"
            />
            <h2 className="mt-8 text-3xl font-extrabold text-white drop-shadow-md">
              Mohd Arshad
            </h2>
            <p className="italic text-cyan-300 mt-2 text-lg">Creator & Developer</p>

            {/* Social Icons */}
            <div className="flex justify-center space-x-8 mt-7 text-3xl text-cyan-300">
              <a
                href="https://github.com/PAMBAK-AAT"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/mohd-arshad-292a47278/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                <FaLinkedin />
              </a>
            </div>

            {/* Enter Button */}
            <button
              onClick={() => (window.location.href = "/")}
              className="mt-10 px-10 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-full text-white font-semibold shadow-md hover:shadow-xl transition duration-300"
            >
              Enter the Arena
            </button>
          </div>
        </div>
      </div>

      {/* Particle Animation Styles */}
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

