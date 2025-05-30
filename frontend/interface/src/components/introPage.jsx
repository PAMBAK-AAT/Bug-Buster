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
    // Pick a random quote on component mount
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-800 to-purple-900 text-white p-6">
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center md:justify-between gap-12">

        {/* Quote Section */}
        <div className="flex-1 text-center md:text-left">
          <p className="text-2xl leading-relaxed font-light border-l-4 border-indigo-400 pl-6">
            “{quote.q}”
            <br />
            <span className="block mt-4 font-semibold text-indigo-200">
              — {quote.a}
            </span>
          </p>
        </div>

        {/* Profile Section */}
        <div className="flex-1 max-w-sm bg-white bg-opacity-10 rounded-3xl p-8 text-center shadow-lg backdrop-blur-md border border-white/20">
          <img
            src={profileImg}
            alt="Mohd Arshad"
            className="mx-auto w-36 h-36 rounded-full border-4 border-white object-cover"
          />
          <h2 className="mt-6 text-2xl font-semibold text-white">Mohd Arshad</h2>
          <p className="italic text-indigo-200 mt-1">Creator & Developer</p>

          {/* Social Icons */}
          <div className="flex justify-center space-x-6 mt-5 text-2xl">
            <a
              href="https://github.com/PAMBAK-AAT"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 transition-colors"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/mohd-arshad-292a47278/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-300 transition-colors"
            >
              <FaLinkedin />
            </a>
          </div>

          {/* CTA Button */}
          <button
            onClick={() => (window.location.href = "/")}
            className="mt-8 px-8 py-3 bg-green-500 hover:bg-green-600 rounded-full text-white font-semibold shadow-md hover:shadow-lg transition duration-300"
          >
            Enter the Arena
          </button>
        </div>
      </div>
    </div>
  );
}
