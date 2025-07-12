import React from 'react';
import { FaSearch } from 'react-icons/fa';

const UserFilters = ({
  availability,
  setAvailability,
  searchQuery,
  setSearchQuery,
  pendingFilter,
  setPendingFilter,
  showSentRequests,
  setShowSentRequests
}) => (
  <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
    <div className="relative">
      <select
        value={availability}
        onChange={(e) => setAvailability(e.target.value)}
        className="appearance-none bg-white border border-violet-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:border-violet-500 min-w-[150px]"
      >
        <option value="">Availability</option>
        <option value="Weekdays">Weekdays</option>
        <option value="Weekends">Weekends</option>
        <option value="Evenings">Evenings</option>
        <option value="Flexible">Flexible</option>
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <svg className="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
    <div className="relative flex-1 max-w-md">
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-violet-400" />
      <input
        type="text"
        placeholder="Search skills or names..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border border-violet-300 rounded-lg focus:outline-none focus:border-violet-500"
      />
    </div>
    {/* Pending Requests Filter Toggle */}
    <div className="flex items-center gap-2">
      <input
        id="pending-filter"
        type="checkbox"
        checked={pendingFilter}
        onChange={e => setPendingFilter(e.target.checked)}
        className="form-checkbox h-5 w-5 text-yellow-600 border-yellow-300 focus:ring-yellow-500"
        disabled={showSentRequests}
      />
      <label htmlFor="pending-filter" className="text-yellow-700 font-semibold cursor-pointer select-none">
        Show Incoming Requests
      </label>
    </div>
    {/* Sent Requests Toggle */}
    <div className="flex items-center gap-2">
      <input
        id="sent-requests-toggle"
        type="checkbox"
        checked={showSentRequests}
        onChange={e => setShowSentRequests(e.target.checked)}
        className="form-checkbox h-5 w-5 text-blue-600 border-blue-300 focus:ring-blue-500"
        disabled={pendingFilter}
      />
      <label htmlFor="sent-requests-toggle" className="text-blue-700 font-semibold cursor-pointer select-none">
        Show My Sent Requests
      </label>
    </div>
  </div>
);

export default UserFilters;
