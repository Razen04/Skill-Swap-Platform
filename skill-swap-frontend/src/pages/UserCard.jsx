import React from 'react';

const UserCard = ({ user, pendingReq, pendingFilter, onAccept, onDecline, onRequest, renderStars }) => (
  <div className="bg-white rounded-2xl p-6 shadow-lg border border-violet-200 hover:shadow-xl transition-shadow duration-300">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-6">
        {/* Profile Photo */}
        <div className="w-20 h-20 rounded-full bg-violet-100 border-2 border-violet-300 flex items-center justify-center overflow-hidden">
          {user.photo ? (
            <img src={user.photo} alt={user.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-violet-400 text-2xl">👤</span>
          )}
        </div>
        {/* User Info */}
        <div className="flex-1">
          <h3 className="text-xl font-bold text-violet-700 mb-2">{user.name}</h3>
          <div className="flex flex-wrap gap-4 mb-2">
            <div>
              <span className="text-sm font-semibold text-green-600">Skills Offered → </span>
              {user?.skills_offered?.map((skill, idx) => (
                <span key={idx} className="inline-block bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs mr-1">{skill}</span>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <div>
              <span className="text-sm font-semibold text-blue-600">Skill wanted → </span>
              {user?.skills_wanted?.map((skill, idx) => (
                <span key={idx} className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs mr-1">{skill}</span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <span className="text-sm text-violet-600">rating</span>
            <div className="flex items-center gap-1">{renderStars(user.rating)}</div>
            <span className="text-sm font-semibold text-violet-700">{user.rating}/5</span>
          </div>
        </div>
      </div>
      {/* Pending Request Actions or Request Button */}
      {pendingFilter && pendingReq ? (
        <div className="flex flex-col gap-2 items-end">
          <div className="text-sm text-gray-600 mb-1">Request: {pendingReq.skill_offered} for {pendingReq.skill_requested}</div>
          <div className="text-xs text-gray-400 mb-1">Message: {pendingReq.message}</div>
          {pendingReq.status === 'pending' ? (
            <div className="flex gap-2">
              <button onClick={() => onAccept(pendingReq.request_id)} className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-lg font-semibold text-sm">Accept</button>
              <button onClick={() => onDecline(pendingReq.request_id)} className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-lg font-semibold text-sm">Reject</button>
            </div>
          ) : (
            <button
              className={`px-4 py-1 rounded-lg font-semibold text-sm ${pendingReq.status === 'accepted' ? 'bg-green-600' : 'bg-red-600'} text-white`}
              disabled
            >
              {pendingReq.status === 'accepted' ? 'Accepted' : 'Rejected'}
            </button>
          )}
        </div>
      ) : (
        <button onClick={() => onRequest(user.user_id)} className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200 whitespace-nowrap">Request</button>
      )}
    </div>
  </div>
);

export default UserCard;
