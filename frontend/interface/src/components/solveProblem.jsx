import React from 'react';
import ProblemDetails from './problemDetails';
import Compiler from './compiler';
import { useParams } from 'react-router-dom';

const SolveProblem = () => {
    const { id } = useParams();

    return (
        <div className="flex flex-col md:flex-row h-screen bg-gray-100">
            {/* Left: Problem Details */}
            <div className="md:w-1/2 overflow-y-auto p-6 border-r border-gray-300 bg-white shadow-md">
                <ProblemDetails />
            </div>

            {/* Right: Compiler */}
            <div className="md:w-1/2 overflow-y-auto p-6 bg-gradient-to-br from-gray-50 to-blue-100">
                <Compiler problemId={id} />
            </div>
        </div>
    );
};

export default SolveProblem;
