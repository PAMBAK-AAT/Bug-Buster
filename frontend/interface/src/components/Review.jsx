import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia, coy, solarizedlight, tomorrow, twilight } from 'react-syntax-highlighter/dist/esm/styles/prism';



import {
    Sparkles,
    Loader2,
    AlertTriangle,
    RefreshCcw,
    TerminalSquare
} from 'lucide-react';

const Review = () => {
    const location = useLocation();
    const { code, prompt: initialPrompt } = location.state || {};

    const [prompt, setPrompt] = useState(initialPrompt || '');
    const [review, setReview] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchReview = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.post("http://localhost:3000/ai-review", { code, prompt });
            setReview(response.data);
        } catch (err) {
            setError("⚠️ Error while fetching the review. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (code && prompt) fetchReview();
    }, [code]);

    if (!code || !initialPrompt) {
        return (
            <div className="flex items-center justify-center h-screen text-red-600 text-lg font-semibold">
                <AlertTriangle className="mr-2" /> No code or prompt data found.
            </div>
        );
    }

    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white font-mono px-6 py-10">
            {/* Glowing animated blobs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute w-72 h-72 bg-cyan-500 opacity-20 blur-3xl rounded-full animate-pulse top-10 left-20" />
                <div className="absolute w-96 h-96 bg-fuchsia-500 opacity-20 blur-3xl rounded-full animate-ping bottom-10 right-20" />
            </div>

            <div className="relative w-full max-w-5xl mx-auto bg-slate-950 border border-slate-700 rounded-2xl shadow-2xl p-10 backdrop-blur-sm bg-opacity-80">
                <h1 className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400 mb-10 drop-shadow-xl">
                    <Sparkles className="inline-block w-7 h-7 text-cyan-300 mr-2 animate-bounce" />
                    AI Code Review
                </h1>

                {/* Prompt Input */}
                <div className="mb-8">
                    <label className="block text-sm text-gray-300 font-semibold mb-2">
                        🎯 Prompt
                    </label>
                    <textarea
                        className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg p-4 text-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500 shadow-lg"
                        rows="3"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Ask AI something like: Suggest improvements for performance"
                    />
                    <button
                        onClick={fetchReview}
                        disabled={loading}
                        className="mt-4 inline-flex items-center bg-gradient-to-r from-cyan-500 to-fuchsia-500 hover:from-fuchsia-500 hover:to-cyan-500 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-md hover:scale-105 disabled:opacity-50"
                    >
                        <RefreshCcw className="mr-2 h-4 w-4" />
                        Regenerate Review
                    </button>
                </div>

                {/* Error */}
                {error && (
                    <div className="text-red-400 mb-4 text-sm flex items-center">
                        <AlertTriangle className="mr-2" /> {error}
                    </div>
                )}

                {/* Review Output */}
                {loading ? (
                    <div className="flex items-center justify-center h-48">
                        <Loader2 className="animate-spin text-cyan-300 w-6 h-6 mr-2" />
                        <span className="text-gray-300 font-semibold">Analyzing your code...</span>
                    </div>
                ) : (
                    <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 overflow-x-auto shadow-inner">
                        <div className="text-xs text-gray-400 mb-2 flex items-center gap-1">
                            <TerminalSquare className="w-4 h-4 text-cyan-400" />
                            AI Output
                        </div>
                        <SyntaxHighlighter
                            language="cpp"
                            style={okaidia}
                            showLineNumbers
                            customStyle={{
                                borderRadius: '1rem',
                                padding: '1.5rem',
                                fontSize: '0.9rem',
                                background: '#1e1e2f',
                                boxShadow: '0 0 10px rgba(0,255,255,0.2)',
                            }}
                        >
                            {review}
                        </SyntaxHighlighter>


                    </div>
                )}
            </div>
        </div>
    );
};

export default Review;








// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import axios from 'axios';
// import { Sparkles, Loader2, AlertTriangle, RefreshCcw } from 'lucide-react';

// const Review = () => {
//     const location = useLocation();
//     const { code, prompt: initialPrompt } = location.state || {};

//     const [prompt, setPrompt] = useState(initialPrompt || '');
//     const [review, setReview] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');

//     const fetchReview = async () => {
//         setLoading(true);
//         setError('');
//         try {
//             const response = await axios.post("http://localhost:3000/ai-review", { code, prompt });
//             setReview(response.data);
//         } catch (err) {
//             setError("⚠️ Error while fetching the review. Please try again.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         if (code && prompt) fetchReview();
//     }, [code]); // Only run on mount with initial prompt

//     if (!code || !initialPrompt) {
//         return (
//             <div className="flex items-center justify-center h-screen text-red-600 text-lg font-semibold">
//                 <AlertTriangle className="mr-2" /> No code or prompt data found.
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col items-center px-6 py-10">
//             <div className="w-full max-w-5xl bg-gray-950 rounded-2xl shadow-2xl p-8 border border-gray-700">
//                 <h1 className="text-4xl font-extrabold text-center text-cyan-400 mb-10 tracking-wide animate-pulse">
//                     <Sparkles className="inline mr-2 text-cyan-300" /> AI Code Review
//                 </h1>

//                 <div className="mb-6">
//                     <label htmlFor="prompt" className="block text-sm text-gray-300 mb-1 font-medium">
//                         📝 Current Prompt
//                     </label>
//                     <textarea
//                         id="prompt"
//                         className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg p-4 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
//                         rows="3"
//                         value={prompt}
//                         onChange={(e) => setPrompt(e.target.value)}
//                         placeholder="Enter your new prompt here..."
//                     />
//                     <button
//                         onClick={fetchReview}
//                         disabled={loading}
//                         className="mt-4 inline-flex items-center bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                         <RefreshCcw className="mr-2 h-4 w-4" />
//                         Regenerate Review
//                     </button>
//                 </div>

//                 {error && (
//                     <div className="text-red-400 mb-4 text-sm flex items-center">
//                         <AlertTriangle className="mr-2" /> {error}
//                     </div>
//                 )}

//                 {loading ? (
//                     <div className="flex justify-center items-center h-48">
//                         <Loader2 className="animate-spin text-cyan-400 w-6 h-6 mr-2" />
//                         <span className="text-gray-300">Analyzing your code...</span>
//                     </div>
//                 ) : (
//                     <div className="bg-gray-900 rounded-xl p-6 text-green-400 border border-gray-700 shadow-inner overflow-x-auto text-sm leading-relaxed whitespace-pre-wrap">
//                         {review}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Review;




