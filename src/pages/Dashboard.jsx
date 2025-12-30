import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../utils/axios';

const Dashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError(false);
      const response = await axios.get('/api/users/dashboard');
      setData(response.data.data);
    } catch (err) {
      console.error('Dashboard error:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-2">Unable to Load Dashboard</h2>
          <p className="text-gray-600 mb-6">
            Please check if you're logged in and try again.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={fetchDashboard}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Retry
            </button>
            <button
              onClick={() => navigate('/login')}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  const stats = data.stats || {};

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back!</p>
          </div>
          <Link
            to="/create-event"
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            + Create Event
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Events Created"
            value={stats.totalEventsCreated || 0}
            color="bg-blue-500"
          />
          <StatCard
            title="Events Attending"
            value={stats.totalEventsAttending || 0}
            color="bg-green-500"
          />
          <StatCard
            title="Upcoming Events"
            value={stats.upcomingEvents || 0}
            color="bg-orange-500"
          />
          <StatCard
            title="Total Attendees"
            value={stats.totalAttendees || 0}
            color="bg-purple-500"
          />
        </div>

        {/* Events Sections */}
        <div className="space-y-8">
          {/* My Events */}
          <Section
            title="My Events"
            count={data.createdEvents?.length || 0}
            events={data.createdEvents || []}
            emptyText="You haven't created any events yet"
            buttonText="Create Event"
            buttonLink="/create-event"
          />

          {/* Attending Events */}
          <Section
            title="Events I'm Attending"
            count={data.attendingEvents?.length || 0}
            events={data.attendingEvents || []}
            emptyText="You're not attending any events yet"
            buttonText="Browse Events"
            buttonLink="/events"
          />
        </div>
      </div>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ title, value, color }) => (
  <div className="bg-white rounded-lg p-6 shadow">
    <div className={`${color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
      <span className="text-white text-xl font-bold">{value}</span>
    </div>
    <p className="text-gray-600 text-sm">{title}</p>
  </div>
);

// Section Component
const Section = ({ title, count, events, emptyText, buttonText, buttonLink }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold text-gray-900">
        {title} ({count})
      </h2>
    </div>

    {events.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    ) : (
      <div className="text-center py-12">
        <p className="text-gray-500 mb-4">{emptyText}</p>
        <Link
          to={buttonLink}
          className="inline-block px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          {buttonText}
        </Link>
      </div>
    )}
  </div>
);

// Event Card Component
const EventCard = ({ event }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/events/${event._id}`)}
      className="border rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition"
    >
      <img
        src={event.image}
        alt={event.title}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="font-bold text-gray-900 mb-2 truncate">{event.title}</h3>
        <p className="text-sm text-gray-600 mb-2">
          {new Date(event.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded">
            {event.category}
          </span>
          <span className="text-xs text-gray-500">
            {event.currentAttendees}/{event.capacity}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
