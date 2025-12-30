import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaCalendarAlt, FaUsers, FaSpinner, FaTrophy, FaPlus, FaChartLine, FaFire } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('created');

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/dashboard`);
      setDashboardData(res.data.data);
    } catch (error) {
      console.error('Failed to fetch dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <FaSpinner className="text-6xl text-purple-600" />
        </motion.div>
      </div>
    );
  }

  // Add null check for dashboardData
  if (!dashboardData || !dashboardData.stats) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Unable to load dashboard
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            There was an error loading your dashboard data.
          </p>
          <button
            onClick={fetchDashboard}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const stats = [
    {
      icon: <FaCalendarAlt />,
      label: 'Events Created',
      value: dashboardData.stats.totalEventsCreated,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20'
    },
    {
      icon: <FaUsers />,
      label: 'Events Attending',
      value: dashboardData.stats.totalEventsAttending,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20'
    },
    {
      icon: <FaFire />,
      label: 'Upcoming Events',
      value: dashboardData.stats.upcomingEvents,
      color: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20'
    },
    {
      icon: <FaTrophy />,
      label: 'Total Attendees',
      value: dashboardData.stats.totalAttendees || 0,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between mb-12"
        >
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Welcome back! Here's what's happening
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/create-event')}
            className="mt-4 md:mt-0 inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-semibold shadow-lg transition-all"
          >
            <FaPlus />
            Create Event
          </motion.button>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`relative overflow-hidden bg-gradient-to-br ${stat.bgColor} rounded-3xl p-6 shadow-xl cursor-pointer group`}
            >
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                <span className="text-white text-2xl">{stat.icon}</span>
              </div>

              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                {stat.label}
              </p>

              <p className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {stat.value}
              </p>

              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 dark:bg-black/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex gap-4 mb-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl p-2"
        >
          <button
            onClick={() => setActiveTab('created')}
            className={`flex-1 px-6 py-4 rounded-xl font-semibold transition-all ${
              activeTab === 'created'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50'
            }`}
          >
            My Events ({dashboardData?.createdEvents?.length || 0})
          </button>

          <button
            onClick={() => setActiveTab('attending')}
            className={`flex-1 px-6 py-4 rounded-xl font-semibold transition-all ${
              activeTab === 'attending'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50'
            }`}
          >
            Attending ({dashboardData?.attendingEvents?.length || 0})
          </button>
        </motion.div>

        {/* Events Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {activeTab === 'created' ? (
              dashboardData.createdEvents.length > 0 ? (
                dashboardData.createdEvents.map((event, index) => (
                  <EventCard key={event._id} event={event} index={index} />
                ))
              ) : (
                <EmptyState
                  icon={<FaCalendarAlt className="text-6xl text-purple-600" />}
                  title="No events created yet"
                  description="Start by creating your first event and invite attendees"
                  buttonText="Create Your First Event"
                  buttonLink="/create-event"
                />
              )
            ) : (
              dashboardData.attendingEvents.length > 0 ? (
                dashboardData.attendingEvents.map((event, index) => (
                  <EventCard key={event._id} event={event} index={index} />
                ))
              ) : (
                <EmptyState
                  icon={<FaUsers className="text-6xl text-purple-600" />}
                  title="Not attending any events"
                  description="Discover amazing events happening around you"
                  buttonText="Browse Events"
                  buttonLink="/events"
                />
              )
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

const EventCard = ({ event, index }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      onClick={() => navigate(`/events/${event._id}`)}
      className="group cursor-pointer"
    >
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200/20 dark:border-gray-700/20">
        <div className="relative h-48 overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

          <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full text-sm font-semibold text-purple-600 shadow-lg">
            {event.category}
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-sm">
            <div className="flex items-center gap-1 backdrop-blur-sm bg-black/30 px-2 py-1 rounded-lg">
              <FaUsers />
              <span>{event.currentAttendees}/{event.capacity}</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
            {event.title}
          </h3>

          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
            <FaCalendarAlt className="text-purple-600" />
            <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <img src={event.organizer?.avatar} alt="" className="w-10 h-10 rounded-full" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Organized by</p>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">{event.organizer?.name}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const EmptyState = ({ icon, title, description, buttonText, buttonLink }) => {
  return (
    <div className="col-span-full text-center py-20">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-full mb-6"
      >
        {icon}
      </motion.div>

      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>

      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
        {description}
      </p>

      <Link
        to={buttonLink}
        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-semibold shadow-lg transition-all"
      >
        <FaPlus />
        {buttonText}
      </Link>
    </div>
  );
};

export default Dashboard;
