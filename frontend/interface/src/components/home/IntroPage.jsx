



import { Link } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si"; // Import LeetCode icon

import profileImg from "../../assets/profile2.jpg";

const quotes = [
  {
    q: "Study isn't about memorizing facts; it's about training your mind to think deeply, solve elegantly, and learn relentlessly. Knowledge fades, but the mindset lasts.",
    a: "Mohd Arshad",
  },
  {
    q: "Coding isn’t typing lines—it’s architecting logic. A true developer crafts systems like poets compose verses: with clarity, rhythm, and purpose.",
    a: "Mohd Arshad",
  },
  {
    q: "A software engineer is a thinker and problem solver, an artist whose canvas is the IDE and brush is logic.",
    a: "Mohd Arshad",
  },
  {
    q: "Consistency beats talent. Showing up daily, imperfectly, always outpaces waiting for perfection.",
    a: "Mohd Arshad",
  },
  {
    q: "Every bug teaches lessons theory can’t. Code rewards curiosity and punishes carelessness with wisdom.",
    a: "Mohd Arshad",
  },
  {
    q: "Coding with purpose builds not just software, but a mind fortified with clarity and discipline.",
    a: "Mohd Arshad",
  },
  {
    q: "Great engineers aren’t born; they’re forged by hours of debugging, doubting, failing, and never quitting.",
    a: "Mohd Arshad",
  },
  {
    q: "True strength is not how fast you code, but how deeply you think and relentlessly pursue understanding.",
    a: "Mohd Arshad",
  },
  {
    q: "Behind every elegant solution lies silent perseverance and painful iterations.",
    a: "Mohd Arshad",
  },
  {
    q: "Intelligence may start you off, but grit, discipline, and obsession with learning finish the race.",
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
      <div className="min-h-screen flex flex-col items-center justify-center  px-6 py-12 space-y-12 max-w-5xl mx-auto">
      
        {/* Intro Card - Full Width */}
        <div className="w-full max-w-5xl bg-white bg-opacity-20 rounded-3xl p-8 backdrop-blur-md border border-white/30 shadow-lg text-white flex flex-row items-start gap-8">
          {/* Profile Image */}
          <img
            src={profileImg}
            alt="Mohd Arshad"
            className="w-64 h-64 rounded-3xl border-4 border-cyan-400 object-cover shadow-xl"
          />

          {/* Info */}
          <div className="flex flex-col justify-start text-left max-w-2xl">
            <h2 className="text-4xl font-extrabold text-white">Mohd Arshad</h2>
            <p className="text-lg text-cyan-300 font-medium mt-1 mb-4">
              MERN Developer & DSA Problem Solver
            </p>

            <p className="text-white/90 text-base leading-relaxed mb-6">
              I am Mohd Arshad, a passionate MERN Stack Developer dedicated to building scalable and efficient web applications. I created an Online Judge platform where users can practice some of the most challenging and top-rated DSA interview problems, helping them sharpen their problem-solving skills.
              <br />
              <br />
              With a strong foundation in JavaScript, React, Node.js, Express, and MongoDB, I focus on writing clean, maintainable code that delivers great user experiences. I am also proficient in Docker and AWS, enabling me to containerize applications and deploy them securely and reliably to the cloud.
              <br />
              <br />
              Beyond coding, I am deeply interested in algorithms, data structures, Operating Systems, Computer Networking, and system design.
            </p>

            <div className="flex space-x-8 justify-start text-cyan-300 text-3xl">
              <a
                href="https://leetcode.com/u/Pam_Bak_786/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                <SiLeetcode />
              </a>
              <a
                href="https://github.com/PAMBAK-AAT"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/mohd-arshad-292a47278/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>


        {/* Quote Card - Below, Single Line */}
        <div className="w-full max-w-xl bg-white bg-opacity-20 rounded-3xl p-6 backdrop-blur-md border border-white/30 shadow-lg text-white text-center">
          <p className="text-xl font-light border-l-4 border-cyan-400 pl-6 leading-relaxed select-text italic">
            “{quote.q}”
          </p>
          <p className="mt-3 font-semibold text-cyan-300 text-lg select-text">
            — {quote.a}
          </p>
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




