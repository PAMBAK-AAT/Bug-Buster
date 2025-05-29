



import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Cpu, Code, PlayCircle, Terminal, Upload, CheckCircle, XCircle, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Editor } from "@monaco-editor/react";




const Compiler = ({ problemId }) => {

  const [language, setLanguage] = useState('cpp');
  const [code, setCode] = useState('// Write your code here...');
  const [output, setOutput] = useState('');
  const [runLoading, setRunLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [input, setInput] = useState('');
  const [verdict, setVerdict] = useState('');
  const [expectedOutput, setExpectedOutput] = useState('');
  const [showPromptBox, setShowPromptBox] = useState(false);
  const [prompt, setPrompt] = useState('');

  const navigate = useNavigate();

  const languages = [
    { value: 'cpp', name: 'C++' },
    { value: 'python', name: 'Python' },
    { value: 'java', name: 'Java' },
    { value: 'javascript', name: 'JavaScript' },
  ];


  const handleReview = async () => {
    if (!prompt.trim()) return;
    navigate('/ai-review', { state: { code, prompt } });
  }


  const handleRun = async () => {

    setRunLoading(true);
    setVerdict('');
    try {
      const res = await axios.post('http://localhost:3000/runWithInput', { language, code, input });
      setOutput(res.data.output || "No output");
    } catch (error) {
      setOutput("❌ Error during execution: " + error.message);
    }
    setRunLoading(false);
  };


  const handleSubmit = async () => {

    setSubmitLoading(true);
    setVerdict('');
    setResults([]); // clear previous results
    try {
      const res = await axios.post('http://localhost:3000/submit', {
        problemId: problemId,
        language,
        code
      });
      setOutput(res.data.output || "Scroll down to see the results");
      setVerdict(res.data.verdict || "No verdict");
      setExpectedOutput(res.data.expectedOutput || "All expected outputs are correct");
      setResults(res.data.results || []);

      if (res.data.verdict === 'Accepted') {
        setShowPromptBox(true);  // ✅ Only show prompt if code was Accepted
      }

    } catch (error) {
      setOutput("❌ Error during submission: " + error.message);
    }
    setSubmitLoading(false);
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl shadow-xl">

      {/* Language Select */}
      <div className="mb-6">
        <label className="flex items-center mb-2 text-xl font-semibold text-indigo-700 gap-2">
          <Cpu size={28} /> Select Language:
        </label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full p-3 border border-indigo-300 rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:ring-indigo-400 bg-white text-indigo-900 font-semibold transition"
        >
          {languages.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>


      {/* Code Editor */}

      <div className="mb-6">
        <label className="flex items-center mb-2 text-xl font-semibold text-indigo-700 gap-2">
          <Code size={24} /> Code Editor:
        </label>

        {/* Editor Container with shadow, rounded corners, and subtle border */}
        <div className="rounded-3xl overflow-hidden shadow-xl ring-1 ring-indigo-300 bg-gray-900 border border-indigo-700">
          <Editor
            height="400px"
            defaultLanguage={language}
            defaultValue={code}
            value={code}
            onChange={(value) => setCode(value || '')}
            theme="vs-dark"
            options={{
              fontSize: 16,
              fontFamily: '"Fira Code", "Fira Mono", monospace',
              minimap: { enabled: false },
              automaticLayout: true,
              scrollBeyondLastLine: false,
              wordWrap: "on",
              lineNumbers: "on",
              tabSize: 2,
              formatOnType: true,
              formatOnPaste: true,
              renderLineHighlight: "all",
              roundedSelection: true,
              cursorSmoothCaretAnimation: true,
              // smooth scrolling for a better experience
              smoothScrolling: true,
              // subtle cursor blinking style
              cursorBlinking: "phase",
              // nicer cursor style
              cursorStyle: "line",
              // enable selection highlight
              selectionHighlight: true,
            }}
          />
        </div>
      </div>



      {/* Input Section */}
      <div className="mb-6">
        <label className="flex items-center mb-2 text-xl font-semibold text-indigo-700 gap-2">
          <Upload size={15} /> Custom Input:
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={3}
          placeholder="Enter input for the program..."
          className="w-full p-4 rounded-xl border border-indigo-400 bg-gray-100 text-gray-800 font-mono text-md resize-none shadow-inner focus:outline-none focus:ring-4 focus:ring-indigo-300 transition"
        />
      </div>

      {/* Buttons: Run and Submit */}
      <div className="mb-6 flex justify-end gap-4">
        <button
          onClick={handleRun}
          disabled={runLoading}
          className="inline-flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg hover:bg-indigo-700 active:scale-95 transition duration-300 disabled:opacity-50"
        >
          {runLoading ? (
            <>
              <PlayCircle className="animate-spin" size={20} /> Running...
            </>
          ) : (
            <>
              <PlayCircle size={20} /> Run
            </>
          )}
        </button>

        <button
          onClick={handleSubmit}
          disabled={submitLoading}
          className="inline-flex items-center gap-2 px-8 py-3 bg-green-600 text-white font-bold rounded-xl shadow-lg hover:bg-green-700 active:scale-95 transition duration-300 disabled:opacity-50"
        >
          {submitLoading ? (
            <>
              <CheckCircle className="animate-spin" size={20} /> Submitting...
            </>
          ) : (
            <>
              <CheckCircle size={20} /> Submit
            </>
          )}
        </button>
      </div>

      {/* Output Section */}
      <div>
        <label className="flex items-center mb-2 text-xl font-semibold text-indigo-700 gap-2">
          <Terminal size={15} /> Output:
        </label>
        <div className="w-full p-5 bg-black text-lime-400 rounded-xl font-mono min-h-[120px] border border-indigo-700 shadow-inner whitespace-pre-wrap select-text">
          {output || <span className="text-indigo-400 italic">Output will appear here...</span>}
        </div>
      </div>


      {/* Verdict Display Section */}
      {verdict && (
        <div className="mt-6 p-4 rounded-md border border-indigo-300 bg-gray-100 shadow">
          <h3 className="text-lg font-semibold text-indigo-700">Verdict: <span className={verdict === 'Accepted' ? 'text-green-600' : 'text-red-600'}>{verdict}</span></h3>

          {/* Show detailed test case results if available */}

          {results.length > 0 && (
            <div className="mt-4">
              <div className="flex flex-wrap gap-2 mb-4">
                {results.map((res, index) => (
                  <div
                    key={index}
                    className={`px-4 py-2 rounded-lg font-semibold shadow ${res.verdict === 'Passed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}
                  >
                    Test Case {res.testCase}
                  </div>
                ))}
              </div>

              {/* If a failed test case exists, show its input/output/expected */}
              {results.find(r => r.verdict === "Failed") && (
                <div className="p-4 bg-red-50 border border-red-300 rounded-xl">
                  <h4 className="text-lg font-bold text-red-700 mb-2">❌ Failed Test Case Details</h4>
                  <div className="mb-2">
                    <strong className="text-red-600">Input:</strong>
                    <pre className="bg-white border border-red-200 p-2 rounded text-sm">{results.find(r => r.verdict === "Failed").input}</pre>
                  </div>
                  <div className="mb-2">
                    <strong className="text-red-600">Expected Output:</strong>
                    <pre className="bg-white border border-red-200 p-2 rounded text-sm">{results.find(r => r.verdict === "Failed").expectedOutput}</pre>
                  </div>
                  <div>
                    <strong className="text-red-600">Your Output:</strong>
                    <pre className="bg-white border border-red-200 p-2 rounded text-sm">{results.find(r => r.verdict === "Failed").userOutput}</pre>
                  </div>
                </div>
              )}
            </div>
          )}


        </div>
      )}

      {/* {showPromptBox && (
        <div className="mt-6 p-4 bg-white border border-indigo-300 rounded-xl shadow">
          <h3 className="text-lg font-semibold text-indigo-800 mb-2">AI Review Prompt:</h3>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt (e.g., Suggest optimizations)"
            rows={3}
            className="w-full p-3 rounded-lg border border-indigo-400 bg-gray-100 text-gray-900 font-medium"
          />
          <button
            onClick={handleReview}
            className="mt-4 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
          >
            Get AI Review
          </button>
        </div>
      )} */}

      {showPromptBox && (
        <div className="mt-8 p-6 bg-white/60 backdrop-blur-md border border-indigo-200 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="text-indigo-600 w-6 h-6" />
            <h3 className="text-xl font-bold text-indigo-900">AI Review Prompt</h3>
          </div>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="💡 Enter your prompt (e.g., Suggest optimizations, review logic)..."
            rows={4}
            className="w-full p-4 rounded-xl border-2 border-indigo-300 bg-indigo-50 focus:bg-white focus:border-indigo-500 outline-none transition placeholder:text-indigo-400 text-indigo-900 font-medium shadow-inner resize-none"
          />
          <button
            onClick={handleReview}
            className="mt-5 w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-md hover:from-indigo-700 hover:to-purple-700 transition duration-300 transform hover:scale-[1.02]"
          >
            ✨ Get AI Review
          </button>
        </div>
      )}


    </div>
  );
};

export default Compiler;