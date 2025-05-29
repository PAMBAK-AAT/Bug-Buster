

import React, { useState, useRef, useEffect } from 'react';
import ProblemDetails from './problemDetails';
import Compiler from './compiler';
import { useParams } from 'react-router-dom';

const SolveProblem = () => {
    const { id } = useParams();
    const containerRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [leftWidth, setLeftWidth] = useState(50); // percentage
    const [fullscreen, setFullscreen] = useState(null); // 'left', 'right', or null

    const onMouseMove = (e) => {
        if (!isDragging || !containerRef.current) return;
        const containerWidth = containerRef.current.getBoundingClientRect().width;
        const newLeftWidth = (e.clientX / containerWidth) * 100;
        if (newLeftWidth > 20 && newLeftWidth < 80) {
            setLeftWidth(newLeftWidth);
        }
    };

    const onMouseUp = () => setIsDragging(false);

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mouseup', onMouseUp);
            window.addEventListener('mousemove', onMouseMove);
        } else {
            window.removeEventListener('mouseup', onMouseUp);
            window.removeEventListener('mousemove', onMouseMove);
        }

        return () => {
            window.removeEventListener('mouseup', onMouseUp);
            window.removeEventListener('mousemove', onMouseMove);
        };
    }, [isDragging]);

    const FullscreenButton = ({ onClick, label }) => (
        <button
            onClick={onClick}
            className="absolute top-4 right-4 z-20 px-4 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md backdrop-blur-sm border border-white/20 hover:scale-105 hover:shadow-indigo-500/50 transition-all duration-300 group"
            title={label}
        >
            <div className="flex items-center gap-2">
                <svg
                    className="w-4 h-4 group-hover:scale-110 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 3H5a2 2 0 00-2 2v3m0 8v3a2 2 0 002 2h3m8-18h3a2 2 0 012 2v3m0 8v3a2 2 0 01-2 2h-3" />
                </svg>
                <span>{label}</span>
            </div>
        </button>
    );

    return (
        <div ref={containerRef} className="flex h-screen bg-gray-100 select-none">
            {fullscreen === 'left' ? (
                <div className="flex flex-col w-full p-6 bg-white shadow-md overflow-auto relative">
                    <FullscreenButton onClick={() => setFullscreen(null)} label="Exit Fullscreen" />
                    <ProblemDetails />
                </div>
            ) : fullscreen === 'right' ? (
                <div className="flex flex-col w-full p-6 bg-gradient-to-br from-gray-50 to-blue-100 overflow-auto relative">
                    <FullscreenButton onClick={() => setFullscreen(null)} label="Exit Fullscreen" />
                    <Compiler problemId={id} />
                </div>
            ) : (
                <>
                    <div
                        className="flex flex-col p-6 border-r border-gray-300 bg-white shadow-md overflow-auto relative"
                        style={{ width: `${leftWidth}%` }}
                    >
                        <FullscreenButton onClick={() => setFullscreen('left')} label="Fullscreen" />
                        <ProblemDetails />
                    </div>

                    <div
                        onMouseDown={() => setIsDragging(true)}
                        className="w-1 cursor-col-resize bg-indigo-300 hover:bg-indigo-500 transition"
                        style={{ userSelect: isDragging ? 'none' : 'auto' }}
                    ></div>

                    <div
                        className="flex flex-col p-6 bg-gradient-to-br from-gray-50 to-blue-100 overflow-auto relative"
                        style={{ width: `${100 - leftWidth}%` }}
                    >
                        <FullscreenButton onClick={() => setFullscreen('right')} label="Fullscreen" />
                        <Compiler problemId={id} />
                    </div>
                </>
            )}
        </div>
    );
};

export default SolveProblem;

