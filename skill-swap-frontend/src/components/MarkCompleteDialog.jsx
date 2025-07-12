import React, { useState } from 'react';
import FeedbackForm from './feedback/FeedbackForm';

export default function MarkCompleteDialog({ open, onClose, requestId, onFeedbackSubmitted }) {
  const [showFeedback, setShowFeedback] = useState(false);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg relative">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl"
          onClick={onClose}
        >
          &times;
        </button>
        {!showFeedback ? (
          <div className="flex flex-col items-center gap-6">
            <h3 className="text-xl font-bold text-violet-700">Mark as Complete?</h3>
            <p className="text-gray-600 text-center">Are you sure you want to mark this swap as complete? You'll be asked to provide feedback.</p>
            <button
              className="bg-violet-600 hover:bg-violet-700 text-white font-semibold px-6 py-2 rounded-xl shadow"
              onClick={() => setShowFeedback(true)}
            >
              Yes, Give Feedback
            </button>
          </div>
        ) : (
          <FeedbackForm requestId={requestId} onSubmitted={() => { setShowFeedback(false); onFeedbackSubmitted(); onClose(); }} />
        )}
      </div>
    </div>
  );
}
