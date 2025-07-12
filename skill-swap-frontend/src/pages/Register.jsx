import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaLock, FaUser, FaTools } from 'react-icons/fa';
import { MdSwapHoriz } from 'react-icons/md';

const Register = ({ switchToLogin }) => {
    const [step, setStep] = useState(1);
    const [form, setForm] = useState({
        email: '',
        password: '',
        name: '',
        photo: null,
        skills_offered: '',
        skills_wanted: '',
        location: false,
        availability: '',
    });

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === 'checkbox') {
            setForm((f) => ({ ...f, [name]: checked }));
        } else if (type === 'file') {
            setForm((f) => ({ ...f, [name]: files[0] }));
        } else {
            setForm((f) => ({ ...f, [name]: value }));
        }
    };

    const handleEmailPassword = (e) => {
        e.preventDefault();
        setStep(2);
    };

    const handleProfile = async (e) => {
        e.preventDefault();
        // submit form here

        const formData = new FormData();
        // Ensure correct keys are sent to backend
        formData.append('email', form.email);
        formData.append('password', form.password);
        formData.append('name', form.name);
        formData.append('photo', form.photo);
        formData.append('skills_offered', form.skills_offered);
        formData.append('skills_wanted', form.skills_wanted);
        formData.append('location', form.location);
        formData.append('availability', form.availability);

        try {
            const res = await fetch("http://localhost:5000/register", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            console.log(data);
            if (res.ok) {
                // Redirect to login page after successful registration
                switchToLogin();
            }
            // Optionally: show toast or error if needed
        } catch (err) {
            console.error("Registration error:", err);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-violet-50 to-white text-violet-900 px-4">
            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 40, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -40, scale: 0.97 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white p-10 w-full max-w-xl rounded-3xl shadow-xl border border-violet-200"
                >
                    {/* App Header */}
                    <div className="flex flex-col items-center mb-6">
                        <MdSwapHoriz size={50} className="text-violet-600 mb-2 animate-bounce" />
                        <h1 className="text-3xl font-extrabold text-violet-700">
                            {step === 1 ? 'Create Account' : 'Complete Profile'}
                        </h1>
                        <p className="text-sm text-violet-500 mt-1">
                            {step === 1 ? 'Let’s get started' : 'Tell us about your skills'}
                        </p>
                    </div>

                    {/* Step 1: Email & Password */}
                    {step === 1 && (
                        <form className="flex flex-col gap-5" onSubmit={handleEmailPassword}>
                            <div className="relative">
                                <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-violet-400" />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-12 pr-4 py-3 border border-violet-300 rounded-lg focus:outline-none focus:border-violet-500 transition"
                                />
                            </div>
                            <div className="relative">
                                <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-violet-400" />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={form.password}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-12 pr-4 py-3 border border-violet-300 rounded-lg focus:outline-none focus:border-violet-500 transition"
                                />
                            </div>
                            <button
                                type="submit"
                                className="mt-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg py-3 font-semibold shadow-md transition"
                            >
                                Continue
                            </button>
                        </form>
                    )}

                    {/* Step 2: Profile Info */}
                    {step === 2 && (
                        <form className="flex flex-col gap-5" onSubmit={handleProfile}>
                            {/* Profile Image Upload with Avatar Preview */}
                            <div className="flex flex-col items-center gap-2 mb-2">
                                <div className="relative group w-24 h-24">
                                    <div className="w-24 h-24 rounded-full bg-violet-100 border-2 border-violet-300 flex items-center justify-center overflow-hidden shadow">
                                        {form.photo ? (
                                            <img src={URL.createObjectURL(form.photo)} alt="Avatar" className="object-cover w-full h-full" />
                                        ) : (
                                            <span className="text-violet-400 text-4xl">👤</span>
                                        )}
                                    </div>
                                    <label className="absolute bottom-1 right-1 bg-violet-600 hover:bg-violet-700 text-white rounded-full p-2 shadow-lg cursor-pointer transition-opacity opacity-80 group-hover:opacity-100 border-2 border-white">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l1.536 1.536A2 2 0 0120 8.768V17a2 2 0 01-2 2H6a2 2 0 01-2-2V8.768a2 2 0 012-2h2.232a2 2 0 001.414-.586l1.536-1.536a2 2 0 012.828 0z" />
                                            <circle cx="12" cy="13" r="3" />
                                        </svg>
                                        <input
                                            type="file"
                                            name="photo"
                                            accept="image/*"
                                            onChange={handleChange}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                                <span className="text-xs text-violet-500">Profile Photo</span>
                            </div>
                            <div className="relative">
                                <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-violet-400" />
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Full Name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-12 pr-4 py-3 border border-violet-300 rounded-lg focus:outline-none focus:border-violet-500 transition"
                                />
                            </div>

                            

                            <div className="relative">
                                <FaTools className="absolute left-4 top-1/2 transform -translate-y-1/2 text-violet-400" />
                            <input
                                type="text"
                                name="skills_offered"
                                placeholder="Skills You Offer"
                                value={form.skills_offered}
                                onChange={handleChange}
                                required
                                className="w-full pl-12 pr-4 py-3 border border-violet-300 rounded-lg focus:outline-none focus:border-violet-500 transition"
                            />
                            </div>

                            <div className="relative">
                                <FaTools className="absolute left-4 top-1/2 transform -translate-y-1/2 text-violet-400" />
                            <input
                                type="text"
                                name="skills_wanted"
                                placeholder="Skills You Want"
                                value={form.skills_wanted}
                                onChange={handleChange}
                                required
                                className="w-full pl-12 pr-4 py-3 border border-violet-300 rounded-lg focus:outline-none focus:border-violet-500 transition"
                            />
                            </div>

                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    name="location"
                                    checked={form.location}
                                    onChange={handleChange}
                                    className="accent-violet-600"
                                />
                                <span className="text-base text-violet-800">Share my location</span>
                            </label>

                            <select
                                name="availability"
                                value={form.availability}
                                onChange={handleChange}
                                required
                                className="px-4 py-3 border border-violet-300 rounded-lg text-base outline-none focus:border-violet-500 transition"
                            >
                                <option value="" disabled>Select Availability</option>
                                <option value="Weekdays">Weekdays</option>
                                <option value="Weekends">Weekends</option>
                                <option value="Evenings">Evenings</option>
                                <option value="Flexible">Flexible</option>
                            </select>

                            <button
                                type="submit"
                                className="mt-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg py-3 font-semibold shadow-md transition"
                            >
                                Finish Registration
                            </button>
                        </form>
                    )}

                    {/* Footer */}
                    <p className="text-sm text-center text-violet-600 mt-6">
                        Already have an account?
                        <span
                            onClick={switchToLogin}
                            className="ml-1 text-violet-700 font-semibold cursor-pointer hover:underline"
                        >
                            Login
                        </span>
                    </p>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default Register;