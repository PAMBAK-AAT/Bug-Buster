




import Register from './register.jsx';
import Login from './login.jsx';
import { useState } from 'react';

const AuthPage = () => {
    const [showRegister, setShowRegister] = useState(true);

    return (
        <div className="min-h-screen w-full bg-gradient-to-tr from-purple-700 via-blue-600 to-indigo-800 flex items-center justify-center px-4">
            <div className="bg-white/10 border border-white/20 backdrop-blur-2xl shadow-2xl rounded-3xl px-10 py-12 w-full max-w-xl transition-all duration-500 ease-in-out">
                
                <h2 className="text-center text-white text-3xl font-bold mb-6">
                    {showRegister ? 'Create an Account 🚀' : 'Welcome Back 👋'}
                </h2>

                {showRegister ? (
                    <>
                        <Register />
                        <p className="mt-6 text-center text-white">
                            Already have an account?{' '}
                            <button
                                className="text-yellow-300 hover:underline font-semibold"
                                onClick={() => setShowRegister(false)}
                            >
                                Login
                            </button>
                        </p>
                    </>
                ) : (
                    <>
                        <Login />
                        <p className="mt-6 text-center text-white">
                            Don’t have an account?{' '}
                            <button
                                className="text-yellow-300 hover:underline font-semibold"
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

