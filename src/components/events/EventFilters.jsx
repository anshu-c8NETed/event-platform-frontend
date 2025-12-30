import React from 'react';
import { FaSearch } from 'react-icons/fa';

const EventFilters = ({ filters, onFilterChange }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
      <div className="grid md:grid-cols-3 gap-4">
        {/* Search */}
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search events..."
            value={filters.search}
            onChange={(e) => onFilterChange({ search: e.target.value })}
            className="pl-10 w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Category */}
        <select
          value={filters.category}
          onChange={(e) => onFilterChange({ category: e.target.value })}
          className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
        >
          <option value="all">All Categories</option>
          <option value="conference">Conference</option>
          <option value="workshop">Workshop</option>
          <option value="meetup">Meetup</option>
          <option value="seminar">Seminar</option>
          <option value="webinar">Webinar</option>
          <option value="social">Social</option>
          <option value="other">Other</option>
        </select>

        {/* Status */}
        <select
          value={filters.status}
          onChange={(e) => onFilterChange({ status: e.target.value })}
          className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
        >
          <option value="upcoming">Upcoming</option>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
          <option value="all">All Status</option>
        </select>
      </div>
    </div>
  );
};

export default EventFilters;