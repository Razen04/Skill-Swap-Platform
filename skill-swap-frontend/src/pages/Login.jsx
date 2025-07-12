import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { MdSwapHoriz } from 'react-icons/md';
import Register from './Register';

const Login = () => {
    const [showRegister, setShowRegister] = useState(false);
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    if (showRegister) return <Register switchToLogin={() => setShowRegister(false)} />;

    const handleLogin = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("email", loginEmail);
        formData.append("password", loginPassword);

        try {
            const res = await fetch("http://localhost:5000/login", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            console.log(data);
            // Optional: Redirect or set localStorage
        } catch (err) {
            console.error("Login error:", err);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 to-white text-violet-900 px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="bg-white p-10 w-full max-w-md rounded-3xl shadow-xl border border-violet-200"
            >
                <div className="flex flex-col items-center mb-6">
                    <MdSwapHoriz size={50} className="text-violet-600 mb-2 animate-bounce" />
                    <h1 className="text-3xl font-extrabold text-violet-700">SkillSwap</h1>
                    <p className="text-sm text-violet-500 mt-1">Log in to continue</p>
                </div>

                <form className="flex flex-col gap-5">
                    <div className="relative">
                        <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-violet-400" />
                        <input
                            value={loginEmail}
                            type="email"
                            placeholder="Email"
                            className="w-full pl-12 pr-4 py-3 border border-violet-300 rounded-lg focus:outline-none focus:border-violet-500 transition"
                            required
                            onChange={(e) => setLoginEmail(e.target.value)}
                        />
                    </div>

                    <div className="relative">
                        <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-violet-400" />
                        <input
                            value={loginPassword}
                            type="password"
                            placeholder="Password"
                            className="w-full pl-12 pr-4 py-3 border border-violet-300 rounded-lg focus:outline-none focus:border-violet-500 transition"
                            required
                            onChange={(e) => setLoginPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg py-3 font-semibold shadow-md transition"
                        onClick={handleLogin}
                    >
                        Login
                    </button>
                </form>

                <p className="text-sm text-center text-violet-600 mt-6">
                    Don't have an account?
                    <span
                        onClick={() => setShowRegister(true)}
                        className="ml-1 text-violet-700 font-semibold cursor-pointer hover:underline"
                    >
                        Register
                    </span>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;