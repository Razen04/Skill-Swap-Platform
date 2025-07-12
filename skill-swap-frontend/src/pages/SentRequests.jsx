import React from 'react';

const SentRequests = ({ sentRequests }) => (
  <div className="space-y-6">
    {sentRequests.length === 0 ? (
      <div className="text-center py-12">
        <p className="text-blue-600 text-lg">You have not sent any requests.</p>
      </div>
    ) : (
      sentRequests.map((req) => (
        <div key={req.request_id} className="bg-white rounded-2xl p-6 shadow-lg border border-blue-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="font-semibold text-violet-700">To: {req.receiver_name || req.receiver_id}</div>
              <div className="text-gray-700">Offered: {req.skill_offered}</div>
              <div className="text-gray-700">Requested: {req.skill_requested}</div>
              <div className="text-xs text-gray-400">Message: {req.message}</div>
              {/* Show receiver email if accepted */}
              {req.status === 'accepted' && req.receiver_email && (
                <div className="text-green-700 font-semibold mt-2">Receiver Email: {req.receiver_email}</div>
              )}
            </div>
            <div className="flex flex-col items-end">
              <span className={`text-sm font-semibold ${req.status === 'accepted' ? 'text-green-700' : req.status === 'declined' ? 'text-red-700' : 'text-blue-700'}`}>Status: {req.status}</span>
              <span className="text-xs text-gray-400 mt-1">Sent at: {req.sent_at}</span>
            </div>
          </div>
        </div>
      ))
    )}
  </div>
);

export default SentRequests;
