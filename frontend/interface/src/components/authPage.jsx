

import Register from './register.jsx';
import Login from './login.jsx';


import { useState } from 'react';

const AuthPage = () => {
    const [showRegister, setShowRegister] = useState(true);

    return (
        <div className="min-h-screen w-full bg-gradient-to-tr from-purple-600 via-blue-500 to-indigo-600 flex items-center justify-center p-2">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl px-8 py-10 w-full max-w-lg border border-white/20">
                {showRegister ? (
                    <>
                        <Register />
                        <p className="mt-4 text-center text-white">
                            Already have an account?{' '}
                            <button
                                className="text-yellow-300 hover:underline"
                                onClick={() => setShowRegister(false)}
                            >
                                Login
                            </button>
                        </p>
                    </>
                ) : (
                    <>
                        <Login />
                        <p className="mt-4 text-center text-white">
                            Don't have an account?{' '}
                            <button
                                className="text-yellow-300 hover:underline"
                                onClick={() => setShowRegister(true)}
                            >
                                Register
                            </button>
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};


export default AuthPage;
