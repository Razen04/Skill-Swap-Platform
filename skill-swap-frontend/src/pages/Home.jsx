import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import { MdSwapHoriz } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import SwapRequest from './SwapRequest';
import UserCard from './UserCard';
import SentRequests from './SentRequests';
import UserFilters from './UserFilters';
import AcceptedRequests from './AcceptedRequests';

const Home = ({ isLoggedIn, onLoggedOut, setReceiverId, receiverId }) => {
    const [availability, setAvailability] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState([]);
    const [pendingFilter, setPendingFilter] = useState(false);
    const [showSentRequests, setShowSentRequests] = useState(false);
    const [pendingRequestUserIds, setPendingRequestUserIds] = useState([]);
    const [pendingRequests, setPendingRequests] = useState([]); // incoming
    const [sentRequests, setSentRequests] = useState([]); // requests made by me
    const [acceptedRequests, setAcceptedRequests] = useState([]); // accepted requests
    const [loading, setLoading] = useState(true);
    const [swapDialogOpen, setSwapDialogOpen] = useState(false);

    const navigate = useNavigate()
    

    useEffect(() => {
        fetch("http://localhost:5000/users", { credentials: "include" })
            .then((res) => res.json())
            .then((data) => {
                setUsers(data.users || []);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error loading users:", err);
                setLoading(false);
            });
    }, []);

    // Fetch pending request user ids when filter is toggled on
    useEffect(() => {
        if (pendingFilter) {
            fetch("http://localhost:5000/incoming-requests", { credentials: "include" })
                .then((res) => res.json())
                .then((data) => {
                    setPendingRequests(data.requests || []);
                    setPendingRequestUserIds((data.requests || []).map(r => r.sender_id));
                })
                .catch((err) => {
                    setPendingRequests([]);
                    setPendingRequestUserIds([]);
                    console.error("Error loading incoming requests:", err);
                });
        } else {
            setPendingRequests([]);
            setPendingRequestUserIds([]);
        }
    }, [pendingFilter]);

    // Fetch sent requests when toggled
    useEffect(() => {
        if (showSentRequests) {
            fetch("http://localhost:5000/sent-requests", { credentials: "include" })
                .then((res) => res.json())
                .then((data) => {
                    setSentRequests(data.sent_requests || []);
                })
                .catch((err) => {
                    setSentRequests([]);
                    console.error("Error loading sent requests:", err);
                });
        } else {
            setSentRequests([]);
        }
    }, [showSentRequests]);

    // Always fetch accepted requests
    useEffect(() => {
        fetch("http://localhost:5000/accepted-requests", { credentials: "include" })
            .then((res) => res.json())
            .then((data) => {
                setAcceptedRequests(data.requests || []);
            })
            .catch((err) => {
                setAcceptedRequests([]);
                console.error("Error loading accepted requests:", err);
            });
    }, []);


    const filteredUsers = users.filter(user => {
        // If pending filter is on, only show users who have sent a pending request
        if (pendingFilter) {
            if (!pendingRequestUserIds.includes(user.user_id)) return false;
        }
        const matchesAvailability =
            !availability || (user.availability && user.availability.toLowerCase() === availability.toLowerCase());

        const query = searchQuery.toLowerCase();

        const matchesSearch =
            !searchQuery ||
            user.name?.toLowerCase().includes(query) ||
            (Array.isArray(user.skills_offered) &&
                user.skills_offered.some(skill => skill?.toLowerCase().includes(query))) ||
            (Array.isArray(user.skills_wanted) &&
                user.skills_wanted.some(skill => skill?.toLowerCase().includes(query)));

        return matchesAvailability && matchesSearch;
    });

    // Pagination state for filteredUsers
    const USERS_PER_PAGE = 3;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);

    // Reset to first page if filters change and current page is out of range
    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(1);
        }
    }, [filteredUsers.length, totalPages, currentPage]);

    const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * USERS_PER_PAGE,
        currentPage * USERS_PER_PAGE
    );

    // Accept/Decline handlers
    const handleAccept = (requestId) => {
        fetch(`http://localhost:5000/accept-request/${requestId}`, {
            method: 'POST',
            credentials: 'include',
        })
            .then(res => res.json())
            .then(() => {
                // Remove the accepted request from the UI
                setPendingRequests(prev => prev.filter(r => r.request_id !== requestId));
                setPendingRequestUserIds(prev => prev.filter(uid => {
                    const req = pendingRequests.find(r => r.request_id === requestId);
                    return req ? req.sender_id !== uid : true;
                }));
            });
    };

    const handleDecline = (requestId) => {
        fetch(`http://localhost:5000/decline-request/${requestId}`, {
            method: 'POST',
            credentials: 'include',
        })
            .then(res => res.json())
            .then(() => {
                // Remove the declined request from the UI
                setPendingRequests(prev => prev.filter(r => r.request_id !== requestId));
                setPendingRequestUserIds(prev => prev.filter(uid => {
                    const req = pendingRequests.find(r => r.request_id === requestId);
                    return req ? req.sender_id !== uid : true;
                }));
            });
    };

    const handleRequest = (userId) => {
        console.log("user.id: ", userId)
        setReceiverId(userId);
        setSwapDialogOpen(true);
    };

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        const stars = [];

        for (let i = 0; i < fullStars; i++) {
            stars.push(<FaStar key={i} className="text-yellow-400" />);
        }

        if (hasHalfStar) {
            stars.push(<FaStar key="half" className="text-yellow-400 opacity-50" />);
        }

        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<FaStar key={`empty-${i}`} className="text-gray-300" />);
        }

        return stars;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-violet-50 to-white flex items-center justify-center">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 border-4 border-violet-600 border-t-transparent rounded-full"
                />
            </div>
        );
    }

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
                        <button
                            onClick={() => navigate('/')}
                            className="text-2xl font-bold text-violet-700 hover:text-violet-800 transition-colors duration-200"
                        >
                            Skill Swap Platform
                        </button>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => isLoggedIn ? navigate('/profile') : navigate('/login')}
                            className="bg-violet-100 hover:bg-violet-200 text-violet-700 px-5 py-2 rounded-lg font-semibold border border-violet-300 transition-colors duration-200"
                        >
                            Profile
                        </button>
                        {isLoggedIn ? (
                            <button
                                onClick={onLoggedOut}
                                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200"
                            >
                                Logout
                            </button>
                        ) : (
                            <button
                                onClick={() => navigate('/login')}
                                className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200"
                            >
                                Login
                            </button>
                        )}
                    </div>
                </div>
            </motion.header>

            {/* Search and Filter Section */}
            <motion.section
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="max-w-4xl mx-auto px-4 py-8"
            >
                <div className="bg-white/80 shadow-xl rounded-2xl p-6 border border-violet-100 mb-4">
                    <h2 className="text-2xl font-bold text-violet-700 mb-4 tracking-tight flex items-center gap-2">
                        <span className="inline-block bg-violet-100 text-violet-600 rounded-full px-3 py-1 text-base font-semibold">Filters</span>
                    </h2>
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <UserFilters
                            availability={availability}
                            setAvailability={setAvailability}
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            pendingFilter={pendingFilter}
                            setPendingFilter={setPendingFilter}
                            showSentRequests={showSentRequests}
                            setShowSentRequests={setShowSentRequests}
                        />
                    </div>
                </div>
            </motion.section>

            {/* User Cards Section */}
            {/* Main Section: Sent Requests or User List, always show accepted requests below incoming requests if any */}
            {showSentRequests ? (
                <motion.main
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="max-w-3xl mx-auto px-4 pb-8"
                >
                    <h2 className="text-xl font-bold text-blue-700 mb-6">My Sent Requests</h2>
                    <SentRequests sentRequests={sentRequests} />
                </motion.main>
            ) : (
                <motion.main
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="max-w-7xl mx-auto px-4 pb-8"
                >
                    <div className="space-y-6">
                        {filteredUsers.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-violet-600 text-lg">No users found matching your criteria.</p>
                            </div>
                        ) : (
                            <>
                                {paginatedUsers.map((user) => {
                                    const pendingReq = pendingFilter
                                        ? pendingRequests.find(r => r.sender_id === user.user_id)
                                        : null;
                                    return (
                                        <UserCard
                                            key={user.id}
                                            user={user}
                                            pendingReq={pendingReq}
                                            pendingFilter={pendingFilter}
                                            onAccept={handleAccept}
                                            onDecline={handleDecline}
                                            onRequest={handleRequest}
                                            renderStars={renderStars}
                                        />
                                    );
                                })}
                                {/* Pagination Controls */}
                                {totalPages > 1 && (
                                    <div className="flex justify-center items-center gap-4 mt-8">
                                        <button
                                            className={`px-4 py-2 rounded-lg font-semibold border transition-colors duration-200 ${currentPage === 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-violet-100 text-violet-700 hover:bg-violet-200'}`}
                                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                            disabled={currentPage === 1}
                                        >
                                            Previous
                                        </button>
                                        <span className="text-violet-700 font-bold">
                                            Page {currentPage} of {totalPages}
                                        </span>
                                        <button
                                            className={`px-4 py-2 rounded-lg font-semibold border transition-colors duration-200 ${currentPage === totalPages ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-violet-100 text-violet-700 hover:bg-violet-200'}`}
                                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                            disabled={currentPage === totalPages}
                                        >
                                            Next
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                    {/* Accepted Requests Section (always visible if any) */}
                    {acceptedRequests.length > 0 && (
                        <div className="mt-12">
                            <h2 className="text-xl font-bold text-green-700 mb-6">Accepted Requests</h2>
                            <AcceptedRequests acceptedRequests={acceptedRequests} currentUserId={receiverId} />
                        </div>
                    )}
                </motion.main>
            )}
            {/* SwapRequest Dialog */}
            <SwapRequest
                open={swapDialogOpen}
                onClose={() => setSwapDialogOpen(false)}
                receiverId={receiverId}
            />
        </div>
    );
};

export default Home;