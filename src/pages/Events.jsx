import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaSpinner, FaSearch, FaFilter, FaTimes, FaCalendarAlt, FaUsers, FaMapMarkerAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Events = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    status: 'upcoming',
    page: 1,
    limit: 12
  });
  const [pagination, setPagination] = useState({
    page: 1,
    pages: 1,
    total: 0
  });

  useEffect(() => {
    fetchEvents();
  }, [filters]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams(filters);
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/events?${params}`);
      setEvents(res.data.data);
      setPagination({
        page: res.data.page,
        pages: res.data.pages,
        total: res.data.total
      });
    } catch (error) {
      console.error('Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value, page: 1 });
  };

  const handlePageChange = (newPage) => {
    setFilters({ ...filters, page: newPage });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const categories = [
    { value: 'all', label: 'All Events', icon: '🎯' },
    { value: 'conference', label: 'Conference', icon: '🎤' },
    { value: 'workshop', label: 'Workshop', icon: '🔧' },
    { value: 'meetup', label: 'Meetup', icon: '👥' },
    { value: 'seminar', label: 'Seminar', icon: '📚' },
    { value: 'webinar', label: 'Webinar', icon: '💻' },
    { value: 'social', label: 'Social', icon: '🎉' },
    { value: 'other', label: 'Other', icon: '📌' }
  ];

  const statusOptions = [
    { value: 'upcoming', label: 'Upcoming', color: 'from-green-500 to-emerald-500' },
    { value: 'ongoing', label: 'Ongoing', color: 'from-yellow-500 to-orange-500' },
    { value: 'completed', label: 'Completed', color: 'from-gray-500 to-gray-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Discover Events
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Find and join amazing events near you
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-6 mb-8 border border-gray-200/20 dark:border-gray-700/20"
        >
          {/* Search Bar */}
          <div className="relative mb-6">
            <FaSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              placeholder="Search events by title, location, or organizer..."
              className="w-full pl-14 pr-5 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none text-lg"
            />
          </div>

          {/* Filter Toggle Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-all font-medium mb-4"
          >
            <FaFilter />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>

          {/* Filters Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                {/* Status Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Status
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {statusOptions.map((status) => (
                      <motion.button
                        key={status.value}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleFilterChange('status', status.value)}
                        className={`p-3 rounded-xl font-medium transition-all ${
                          filters.status === status.value
                            ? `bg-gradient-to-br ${status.color} text-white shadow-lg`
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        {status.label}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Category
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {categories.map((cat) => (
                      <motion.button
                        key={cat.value}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleFilterChange('category', cat.value)}
                        className={`p-3 rounded-xl font-medium transition-all ${
                          filters.category === cat.value
                            ? 'bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-lg'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        <span className="mr-2">{cat.icon}</span>
                        {cat.label}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Active Filters */}
          {(filters.search || filters.category !== 'all' || filters.status !== 'upcoming') && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
            >
              {filters.search && (
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg text-sm">
                  Search: {filters.search}
                  <button onClick={() => handleFilterChange('search', '')} className="hover:text-purple-900">
                    <FaTimes className="text-xs" />
                  </button>
                </span>
              )}
              {filters.category !== 'all' && (
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg text-sm">
                  {categories.find(c => c.value === filters.category)?.label}
                  <button onClick={() => handleFilterChange('category', 'all')} className="hover:text-purple-900">
                    <FaTimes className="text-xs" />
                  </button>
                </span>
              )}
            </motion.div>
          )}
        </motion.div>

        {/* Results Count */}
        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 text-gray-600 dark:text-gray-400"
          >
            Found <span className="font-bold text-purple-600">{pagination.total}</span> events
          </motion.div>
        )}

        {/* Events Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white/80 dark:bg-gray-800/80 rounded-3xl h-96 animate-pulse" />
            ))}
          </div>
        ) : events.length > 0 ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
            >
              {events.map((event, index) => (
                <motion.div
                  key={event._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  onClick={() => navigate(`/events/${event._id}`)}
                  className="group cursor-pointer"
                >
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200/20 dark:border-gray-700/20">
                    {/* Event Image */}
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                      {/* Category Badge */}
                      <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full text-sm font-semibold text-purple-600 dark:text-purple-400 shadow-lg">
                        {event.category}
                      </div>

                      {/* Status Badge */}
                      <div className={`absolute top-4 left-4 px-3 py-1 backdrop-blur-sm rounded-full text-xs font-semibold text-white shadow-lg ${
                        event.status === 'upcoming' ? 'bg-green-500/90' :
                        event.status === 'ongoing' ? 'bg-yellow-500/90' :
                        'bg-gray-500/90'
                      }`}>
                        {event.status}
                      </div>

                      {/* Quick Stats */}
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-sm">
                        <div className="flex items-center gap-1 backdrop-blur-sm bg-black/30 px-2 py-1 rounded-lg">
                          <FaUsers />
                          <span>{event.currentAttendees}/{event.capacity}</span>
                        </div>
                        <div className="flex items-center gap-1 backdrop-blur-sm bg-black/30 px-2 py-1 rounded-lg">
                          <FaCalendarAlt />
                          <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                        </div>
                      </div>
                    </div>

                    {/* Event Details */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {event.title}
                      </h3>

                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                        {event.description}
                      </p>

                      {/* Location */}
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                        <FaMapMarkerAlt className="text-purple-600" />
                        <span className="truncate">{event.location}</span>
                      </div>

                      {/* Organizer */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-3">
                          <img
                            src={event.organizer?.avatar}
                            alt={event.organizer?.name}
                            className="w-10 h-10 rounded-full border-2 border-purple-200 dark:border-purple-800"
                          />
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Organized by</p>
                            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                              {event.organizer?.name}
                            </p>
                          </div>
                        </div>

                        {/* Capacity Indicator */}
                        <div className="text-right">
                          <p className="text-xs text-gray-500 dark:text-gray-400">Capacity</p>
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-purple-600 to-pink-600 transition-all"
                                style={{ width: `${(event.currentAttendees / event.capacity) * 100}%` }}
                              />
                            </div>
                            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                              {Math.round((event.currentAttendees / event.capacity) * 100)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Pagination */}
            {pagination.pages > 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-center gap-2"
              >
                {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((page) => (
                  <motion.button
                    key={page}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handlePageChange(page)}
                    className={`w-12 h-12 rounded-xl font-semibold transition-all ${
                      page === pagination.page
                        ? 'bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-lg'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {page}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-full mb-6">
              <FaSearch className="text-5xl text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              No events found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Try adjusting your filters or search terms
            </p>
            <button
              onClick={() => setFilters({ search: '', category: 'all', status: 'upcoming', page: 1, limit: 12 })}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg"
            >
              Clear All Filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Events;