
import React, { useState, useRef, useEffect } from 'react';
import ProblemDetails from './problemDetails';
import Compiler from './compiler';
import { useParams } from 'react-router-dom';

const SolveProblem = () => {
    // Extract the problem ID from the URL params (React Router)
    const { id } = useParams();

    // Ref to the main container div to measure its width during dragging
    const containerRef = useRef(null);

    // State to track if the user is currently dragging the divider
    const [isDragging, setIsDragging] = useState(false);

    // State to track the width percentage of the left panel (ProblemDetails)
    const [leftWidth, setLeftWidth] = useState(50); // starts at 50% width

    // State to track which panel is in fullscreen mode ('left', 'right', or null for split view)
    const [fullscreen, setFullscreen] = useState(null);

    // Handler for mouse move event when dragging the divider
    const onMouseMove = (e) => {
        // Only update width if dragging is active and containerRef is defined
        if (!isDragging || !containerRef.current) return;

        // Get the total width of the container div in pixels
        const containerWidth = containerRef.current.getBoundingClientRect().width;

        // Calculate the new width of the left panel as a percentage of the container width
        const newLeftWidth = (e.clientX / containerWidth) * 100;

        // Restrict resizing so left panel width stays between 20% and 80%
        if (newLeftWidth > 30 && newLeftWidth < 70) {
            setLeftWidth(newLeftWidth);
        }
    };

    // Handler for mouse up event — stops dragging
    const onMouseUp = () => setIsDragging(false);

    // useEffect to add/remove mouse event listeners dynamically based on dragging state
    useEffect(() => {
        if (isDragging) {
            // When dragging starts, listen for mouseup and mousemove on the whole window
            // This allows tracking even if the mouse leaves the divider area
            window.addEventListener('mouseup', onMouseUp);
            window.addEventListener('mousemove', onMouseMove);
        } else {
            // When dragging stops, remove the event listeners to prevent unnecessary handling
            window.removeEventListener('mouseup', onMouseUp);
            window.removeEventListener('mousemove', onMouseMove);
        }

        // Cleanup function to remove listeners when component unmounts or before re-running effect
        return () => {
            window.removeEventListener('mouseup', onMouseUp);
            window.removeEventListener('mousemove', onMouseMove);
        };
    }, [isDragging]); // This effect runs whenever isDragging changes

    // Button component to toggle fullscreen mode on each panel
    const FullscreenButton = ({ onClick, label }) => (
        <button
            onClick={onClick}
            className="absolute top-4 right-4 z-20 px-4 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md backdrop-blur-sm border border-white/20 hover:scale-105 hover:shadow-indigo-500/50 transition-all duration-300 group"
            title={label} // Tooltip on hover
        >
            <div className="flex items-center gap-2">
                {/* SVG icon for fullscreen */}
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
        // Main container div - uses flexbox, full screen height, light background, disables text selection for smooth dragging
        <div ref={containerRef} className="flex h-screen bg-gray-100 select-none">
            {/* If left panel is fullscreen */}
            {fullscreen === 'left' ? (
                <div className="flex flex-col w-full p-6 bg-white shadow-md overflow-auto relative">
                    {/* Button to exit fullscreen */}
                    <FullscreenButton onClick={() => setFullscreen(null)} label="Exit Fullscreen" />
                    {/* Show only ProblemDetails in fullscreen */}
                    <ProblemDetails />
                </div>
            ) : fullscreen === 'right' ? (
                // If right panel is fullscreen
                <div className="flex flex-col w-full p-6 bg-gradient-to-br from-gray-50 to-blue-100 overflow-auto relative">
                    {/* Button to exit fullscreen */}
                    <FullscreenButton onClick={() => setFullscreen(null)} label="Exit Fullscreen" />
                    {/* Show only Compiler in fullscreen */}
                    <Compiler problemId={id} />
                </div>
            ) : (
                // Split view mode - both panels side by side
                <>
                    {/* Left panel container - width controlled by leftWidth state */}
                    <div
                        className="flex flex-col p-6 border-r border-gray-300 bg-white shadow-md overflow-auto relative"
                        style={{ width: `${leftWidth}%` }}
                    >
                        {/* Fullscreen button to make left panel fullscreen */}
                        <FullscreenButton onClick={() => setFullscreen('left')} label="Fullscreen" />
                        {/* ProblemDetails component showing problem statement */}
                        <ProblemDetails />
                    </div>

                    {/* Divider bar between panels */}
                    <div
                        onMouseDown={() => setIsDragging(true)} // Start dragging when mouse pressed down
                        className="w-1 cursor-col-resize bg-indigo-300 hover:bg-indigo-500 transition"
                        style={{ userSelect: isDragging ? 'none' : 'auto' }} // Prevent text selection while dragging
                    ></div>

                    {/* Right panel container - width is remaining space */}
                    <div
                        className="flex flex-col p-6 bg-gradient-to-br from-gray-50 to-blue-100 overflow-auto relative"
                        style={{ width: `${100 - leftWidth}%` }}
                    >
                        {/* Fullscreen button to make right panel fullscreen */}
                        <FullscreenButton onClick={() => setFullscreen('right')} label="Fullscreen" />
                        {/* Compiler component where users write and run code */}
                        <Compiler problemId={id} />
                    </div>
                </>
            )}
        </div>
    );
};

export default SolveProblem;
