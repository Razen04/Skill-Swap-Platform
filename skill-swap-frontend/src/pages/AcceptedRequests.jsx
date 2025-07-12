import React, { useState } from 'react';
import MarkCompleteDialog from '../components/MarkCompleteDialog';

const AcceptedRequests = ({ acceptedRequests, currentUserId }) => {
  const [openDialogId, setOpenDialogId] = useState(null);
  const [finishedIds, setFinishedIds] = useState([]);

  const handleFeedbackSubmitted = (id) => {
    setFinishedIds((prev) => [...prev, id]);
  };

  return (
    <div className="space-y-6">
      {acceptedRequests.filter(req => !finishedIds.includes(req.request_id)).length === 0 ? (
        <div className="text-center py-12">
          <p className="text-green-600 text-lg">No accepted requests yet.</p>
        </div>
      ) : (
        acceptedRequests.filter(req => !finishedIds.includes(req.request_id)).map((req) => (
          <div key={req.request_id} className="bg-white rounded-2xl p-6 shadow-lg border border-green-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="font-semibold text-violet-700">
                  {req.sender_id === currentUserId ? 'To' : 'From'}: {req.sender_id === currentUserId ? req.receiver_name : req.sender_name}
                </div>
                <div className="text-gray-700">Offered: {req.skill_offered}</div>
                <div className="text-gray-700">Requested: {req.skill_requested}</div>
                <div className="text-xs text-gray-400">Message: {req.message}</div>
                {req.sender_id === currentUserId && req.receiver_email && (
                  <div className="text-green-700 font-semibold mt-2">Receiver Email: {req.receiver_email}</div>
                )}
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="text-sm font-semibold text-green-700">Status: {req.status}</span>
                <span className="text-xs text-gray-400 mt-1">Accepted at: {req.accepted_at || req.updated_at || req.sent_at}</span>
                <button
                  className="mt-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold px-4 py-2 rounded-xl shadow"
                  onClick={() => setOpenDialogId(req.request_id)}
                >
                  Mark as Complete
                </button>
                {openDialogId === req.request_id && (
                  <MarkCompleteDialog
                    open={true}
                    onClose={() => setOpenDialogId(null)}
                    requestId={req.request_id}
                    onFeedbackSubmitted={() => handleFeedbackSubmitted(req.request_id)}
                  />
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AcceptedRequests;
