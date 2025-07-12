import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaPaperPlane } from 'react-icons/fa';

const SwapRequest = ({ open, onClose, receiverId }) => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSend = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    console.log('Sending swap request:', { receiver_id: receiverId, message });
    try {
      const res = await fetch('http://localhost:5000/send-request', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ receiver_id: receiverId, message }),
      });
      const data = await res.json();
      console.log('Swap request response:', data);
      if (data.status === 'ok') {
        setSuccess(true);
        setMessage('');
      } else {
        setError(data.message || 'Failed to send request');
      }
    } catch (err) {
      setError('Failed to send request');
      console.error('Swap request error:', err);
    }
    setLoading(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative border border-violet-200"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-violet-400 hover:text-violet-700 text-xl"
              aria-label="Close"
            >
              <FaTimes />
            </button>
            <h2 className="text-2xl font-bold text-violet-700 mb-4 text-center">Send Swap Request</h2>
            <form onSubmit={handleSend} className="flex flex-col gap-4">
              <textarea
                className="w-full border border-violet-300 rounded-lg px-4 py-3 focus:outline-none focus:border-violet-500 resize-none min-h-[100px]"
                placeholder="Add a message (optional)"
                value={message}
                onChange={e => setMessage(e.target.value)}
                maxLength={300}
              />
              {error && <div className="text-red-600 text-center text-sm">{error}</div>}
              {success && <div className="text-green-600 text-center text-sm">Request sent successfully!</div>}
              <button
                type="submit"
                className="flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200 disabled:opacity-60"
                disabled={loading || success}
              >
                <FaPaperPlane />
                {loading ? 'Sending...' : 'Send Request'}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SwapRequest;
