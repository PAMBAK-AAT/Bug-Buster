







import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Cpu, Code, PlayCircle, Terminal, Upload, CheckCircle, XCircle } from 'lucide-react';

// import CodeMirror from '@uiw/react-codemirror';
// import { cpp } from '@codemirror/lang-cpp';
// import { python } from '@codemirror/lang-python';
// import { java } from '@codemirror/lang-java';
// import { javascript } from '@codemirror/lang-javascript';

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

  const languages = [
    { value: 'cpp', name: 'C++' },
    { value: 'python', name: 'Python' },
    { value: 'java', name: 'Java' },
    { value: 'javascript', name: 'JavaScript' },
  ];

  // const getLanguageExtension = () => {
  //   switch (language) {
  //     case 'cpp': return cpp();
  //     case 'python': return python();
  //     case 'java': return java();
  //     case 'javascript': return javascript();
  //     default: return cpp();
  //   }
  // };


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
          <Code size={28} /> Code Editor:
        </label>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          rows={16}
          className="w-full p-5 rounded-xl border border-indigo-400 bg-gray-900 text-green-400 font-mono text-lg resize-none shadow-inner focus:outline-none focus:ring-4 focus:ring-indigo-600 transition"
        />
      </div>

      {/* Input Section */}
      <div className="mb-6">
        <label className="flex items-center mb-2 text-xl font-semibold text-indigo-700 gap-2">
          <Upload size={24} /> Custom Input:
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={6}
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
          <Terminal size={28} /> Output:
        </label>
        <div className="w-full p-5 bg-black text-lime-400 rounded-xl font-mono min-h-[120px] border border-indigo-700 shadow-inner whitespace-pre-wrap select-text">
          {output || <span className="text-indigo-400 italic">Output will appear here...</span>}
        </div>
      </div>

      {/* Verdict and Expected Output (only shown after submission) */}
      {/* {verdict && (
        <div className="mt-4 p-4 rounded-xl border border-green-500 bg-green-50 text-green-700 font-semibold flex items-center gap-3 shadow-md select-text">
          {verdict.toLowerCase() === 'accepted' ? (
            <CheckCircle size={24} className="text-green-600" />
          ) : (
            <XCircle size={24} className="text-red-600" />
          )}
          <span>Verdict: {verdict}</span>
        </div>
      )} */}

      {/* Verdict Display Section */}
      {verdict && (
        <div className="mt-6 p-4 rounded-md border border-indigo-300 bg-gray-100 shadow">
          <h3 className="text-lg font-semibold text-indigo-700">Verdict: <span className={verdict === 'Accepted' ? 'text-green-600' : 'text-red-600'}>{verdict}</span></h3>

          {/* Show detailed test case results if available */}
          {results.length > 0 && (
            <div className="mt-4 overflow-auto max-h-96 rounded-lg border border-indigo-400 shadow">
              <table className="w-full text-left border-collapse">
                <thead className="bg-indigo-100 text-indigo-800 font-semibold sticky top-0">
                  <tr>
                    <th className="p-2 border border-indigo-300">Test Case</th>
                    <th className="p-2 border border-indigo-300">Input</th>
                    <th className="p-2 border border-indigo-300">Expected Output</th>
                    <th className="p-2 border border-indigo-300">Your Output</th>
                    <th className="p-2 border border-indigo-300">Verdict</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((res, index) => (
                    <tr key={index} className={res.verdict === 'Passed' ? 'bg-green-50' : 'bg-red-50'}>
                      <td className="p-2 border border-indigo-300">{res.testCase}</td>
                      <td className="p-2 border border-indigo-300 whitespace-pre-wrap">{res.input}</td>
                      <td className="p-2 border border-indigo-300 whitespace-pre-wrap">{res.expectedOutput}</td>
                      <td className="p-2 border border-indigo-300 whitespace-pre-wrap">{res.userOutput}</td>
                      <td
                        className="p-2 border border-indigo-300 font-semibold"
                        style={{ color: res.verdict === 'Passed' ? 'green' : 'red' }}
                      >
                        {res.verdict}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

    </div>
  );
};

export default Compiler;