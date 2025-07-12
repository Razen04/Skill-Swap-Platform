import { motion } from 'framer-motion';

import React, { useState } from 'react';

export default function FeedbackForm({ requestId, onSubmitted }) {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');
        try {
            const res = await fetch(`http://localhost:5000/feedback/${requestId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ feedback, rating })
            });
            const data = await res.json();
            if (data.status === 'ok') {
                setSuccess(true);
                setTimeout(() => {
                    if (onSubmitted) onSubmitted();
                }, 1200);
            } else {
                setError(data.message || 'Failed to submit feedback');
            }
        } catch (err) {
            setError('Network error');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="flex items-center justify-center px-4 py-6">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-xl bg-white rounded-2xl shadow-2xl p-8 border border-gray-200"
            >
                <h2 className="text-2xl font-bold text-violet-700 text-center mb-6">We Value Your Feedback</h2>
                {success ? (
                    <div className="text-center text-green-600 font-semibold py-8">Thank you for your feedback!</div>
                ) : (
                    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                        <label className="text-sm font-medium text-gray-700">Rating</label>
                        <div className="flex gap-2 mb-2">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <Star
                                    key={i}
                                    className={`h-7 w-7 cursor-pointer transition-colors ${i <= (hoverRating || rating) ? 'text-violet-500' : 'text-gray-300'}`}
                                    onMouseEnter={() => setHoverRating(i)}
                                    onMouseLeave={() => setHoverRating(0)}
                                    onClick={() => setRating(i)}
                                />
                            ))}
                        </div>
                        <label className="text-sm font-medium text-gray-700">Your Feedback</label>
                        <textarea
                            rows={4}
                            placeholder="Share your thoughts with us..."
                            className="rounded-xl border border-gray-300 focus:border-violet-600 focus:outline-none"
                            required
                            value={feedback}
                            onChange={e => setFeedback(e.target.value)}
                        />
                        {error && <div className="text-red-500 text-sm text-center">{error}</div>}
                        <button
                            type="submit"
                            className="mt-4 bg-violet-600 hover:bg-violet-700 text-white font-semibold text-lg py-3 rounded-xl shadow disabled:opacity-60"
                            disabled={submitting || rating === 0 || !feedback.trim()}
                        >
                            {submitting ? 'Submitting...' : 'Submit Feedback'}
                        </button>
                    </form>
                )}
            </motion.div>
        </div>
    );
}