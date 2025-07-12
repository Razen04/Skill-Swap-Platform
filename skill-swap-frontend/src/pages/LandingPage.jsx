
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MdSwapHoriz, MdStar } from 'react-icons/md';
import { FaHandshake, FaSearch } from 'react-icons/fa';

const LandingPage = ({ isLoggedIn, onLoggedOut }) => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-gradient-to-br from-violet-50 to-white">
            {/* Header */}
            <motion.header
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white shadow-md border-b border-violet-200"
            >
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <MdSwapHoriz size={40} className="text-violet-600" />
                        <h1 className="text-2xl font-bold text-violet-700">Skill Swap Platform</h1>
                    </div>
                    <div className="flex gap-3">
                        {isLoggedIn ? (
                            <button
                                onClick={onLoggedOut}
                                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200"
                            >
                                Logout
                            </button>
                        ) : (
                            <>
                                <button
                                    onClick={() => navigate('/login')}
                                    className="text-violet-600 hover:text-violet-700 px-4 py-2 rounded-lg font-semibold transition-colors duration-200"
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => navigate('/register')}
                                    className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200"
                                >
                                    Sign Up
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </motion.header>

            {/* Hero Section */}
            <section className="relative flex flex-col items-center justify-center text-center px-6 py-24 overflow-hidden">
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-5xl md:text-6xl font-extrabold text-violet-700 drop-shadow"
                >
                    Skill Swap Platform
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 1 }}
                    className="text-lg md:text-xl text-gray-600 mt-4 max-w-2xl"
                >
                    Discover and trade skills with people around you. Learn something new or help others grow. All for free.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 1 }}
                    className="mt-8 flex flex-col sm:flex-row gap-4"
                >
                    <button
                        onClick={() => navigate('/login')}
                        className="bg-violet-600 hover:bg-violet-700 text-white text-lg px-8 py-3 rounded-xl shadow-md font-semibold transition-colors duration-200"
                    >
                        Get Started
                    </button>
                </motion.div>

                {/* Animated Background */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.1 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0 bg-gradient-radial from-violet-100 via-white to-transparent"
                ></motion.div>
            </section>

            {/* Features Section */}
            <section className="px-8 py-16 max-w-6xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl md:text-4xl font-bold text-center text-violet-700 mb-12"
                >
                    How It Works
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="bg-white border shadow-lg rounded-2xl p-6 text-center hover:shadow-xl transition-shadow duration-300"
                    >
                        <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FaHandshake className="h-8 w-8 text-violet-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mt-4">Swap Skills</h3>
                        <p className="text-gray-600 mt-2">Offer your skills and request what you want to learn. Create meaningful exchanges with others.</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="bg-white border shadow-lg rounded-2xl p-6 text-center hover:shadow-xl transition-shadow duration-300"
                    >
                        <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FaSearch className="h-8 w-8 text-violet-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mt-4">Find & Connect</h3>
                        <p className="text-gray-600 mt-2">Search by skills, availability, and location. Connect with people who match your learning goals.</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="bg-white border shadow-lg rounded-2xl p-6 text-center hover:shadow-xl transition-shadow duration-300"
                    >
                        <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <MdStar className="h-8 w-8 text-violet-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mt-4">Build Trust</h3>
                        <p className="text-gray-600 mt-2">Rate and review your skill swap experiences to build a trusted community network.</p>
                    </motion.div>
                </div>
            </section>

            {/* Skills Categories Section */}
            <section className="bg-violet-50 px-8 py-16">
                <div className="max-w-6xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-4xl font-bold text-center text-violet-700 mb-12"
                    >
                        Popular Skill Categories
                    </motion.h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { name: "Programming", icon: "💻", count: "250+ skills" },
                            { name: "Design", icon: "🎨", count: "180+ skills" },
                            { name: "Languages", icon: "🗣️", count: "120+ skills" },
                            { name: "Music", icon: "🎵", count: "90+ skills" },
                            { name: "Photography", icon: "📸", count: "75+ skills" },
                            { name: "Cooking", icon: "👨‍🍳", count: "140+ skills" },
                            { name: "Sports", icon: "⚽", count: "110+ skills" },
                            { name: "Crafts", icon: "✂️", count: "85+ skills" }
                        ].map((category, index) => (
                            <motion.div
                                key={category.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                                className="bg-white rounded-xl p-4 text-center shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                                onClick={() => navigate('/home')}
                            >
                                <div className="text-3xl mb-2">{category.icon}</div>
                                <h3 className="font-semibold text-violet-700">{category.name}</h3>
                                <p className="text-sm text-gray-500">{category.count}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="px-8 py-16">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-4xl font-bold text-violet-700 mb-6"
                    >
                        Ready to Start Learning?
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="text-lg text-gray-600 mb-8"
                    >
                        Join thousands of learners and skill sharers in our growing community.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <button
                            onClick={() => navigate('/login')}
                            className="bg-violet-600 hover:bg-violet-700 text-white text-lg px-8 py-3 rounded-xl shadow-md font-semibold transition-colors duration-200"
                        >
                            Join Now - It's Free!
                        </button>
                        <button
                            onClick={() => navigate('/home')}
                            className="border-2 border-violet-600 text-violet-700 hover:bg-violet-50 px-8 py-3 rounded-xl font-semibold transition-colors duration-200"
                        >
                            Explore Skills
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-violet-700 text-white px-8 py-12">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <MdSwapHoriz size={32} className="text-white" />
                                <h3 className="text-xl font-bold">Skill Swap</h3>
                            </div>
                            <p className="text-violet-200">Connecting learners and skill sharers worldwide.</p>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-3">Platform</h4>
                            <ul className="space-y-2 text-violet-200">
                                <li><button onClick={() => navigate('/home')} className="hover:text-white transition-colors">Explore Skills</button></li>
                                <li><button onClick={() => navigate('/register')} className="hover:text-white transition-colors">Sign Up</button></li>
                                <li><button onClick={() => navigate('/login')} className="hover:text-white transition-colors">Login</button></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-3">Community</h4>
                            <ul className="space-y-2 text-violet-200">
                                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Guidelines</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Safety</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-3">Connect</h4>
                            <ul className="space-y-2 text-violet-200">
                                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-violet-600 mt-8 pt-8 text-center text-violet-200">
                        <p>&copy; 2025 Skill Swap Platform. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;