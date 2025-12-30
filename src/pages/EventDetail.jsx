import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaUsers, 
  FaUser, 
  FaSpinner,
  FaEdit,
  FaTrash,
  FaClock
} from 'react-icons/fa';
import { motion } from 'framer-motion';

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rsvpLoading, setRsvpLoading] = useState(false);
  const [hasRSVP, setHasRSVP] = useState(false);
  const [attendees, setAttendees] = useState([]);

  useEffect(() => {
    fetchEvent();
    if (isAuthenticated) {
      checkRSVPStatus();
      fetchAttendees();
    }
  }, [id, isAuthenticated]);

  const fetchEvent = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/events/${id}`);
      setEvent(res.data.data);
      setHasRSVP(res.data.data.hasRSVP || false);
    } catch (error) {
      toast.error('Failed to load event');
      navigate('/events');
    } finally {
      setLoading(false);
    }
  };

  const checkRSVPStatus = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/rsvps/event/${id}/status`);
      setHasRSVP(res.data.data.hasRSVP);
    } catch (error) {
      console.error('Failed to check RSVP status');
    }
  };

  const fetchAttendees = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/rsvps/event/${id}/attendees`);
      setAttendees(res.data.data);
    } catch (error) {
      console.error('Failed to load attendees');
    }
  };

  const handleRSVP = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to RSVP');
      navigate('/login');
      return;
    }

    setRsvpLoading(true);
    try {
      if (hasRSVP) {
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/rsvps/event/${id}`);
        toast.success('RSVP cancelled');
        setHasRSVP(false);
      } else {
        await axios.post(`${process.env.REACT_APP_API_URL}/api/rsvps/event/${id}`);
        toast.success('RSVP confirmed!');
        setHasRSVP(true);
      }
      fetchEvent();
      fetchAttendees();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update RSVP');
    } finally {
      setRsvpLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this event?')) {
      return;
    }

    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/events/${id}`);
      toast.success('Event deleted successfully');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to delete event');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FaSpinner className="animate-spin text-4xl text-blue-600" />
      </div>
    );
  }

  if (!event) {
    return null;
  }

  const isOrganizer = user && event.organizer._id === user._id;
  const eventDate = new Date(event.date);
  const isEventFull = event.currentAttendees >= event.capacity;
  const isPastEvent = eventDate < new Date();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Event Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-96 object-cover rounded-2xl shadow-lg"
          />
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium mb-3">
                    {event.category}
                  </span>
                  <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    {event.title}
                  </h1>
                </div>
                
                {isOrganizer && (
                  <div className="flex gap-2">
                    <Link
                      to={`/events/${id}/edit`}
                      className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <FaEdit size={20} />
                    </Link>
                    <button
                      onClick={handleDelete}
                      className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <FaTrash size={20} />
                    </button>
                  </div>
                )}
              </div>

              {/* Event Details */}
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <FaCalendarAlt className="mr-3 text-blue-600" />
                  <span>{eventDate.toLocaleDateString('en-US', { 
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>

                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <FaClock className="mr-3 text-blue-600" />
                  <span>{eventDate.toLocaleTimeString('en-US', { 
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</span>
                </div>

                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <FaMapMarkerAlt className="mr-3 text-blue-600" />
                  <span>{event.location}</span>
                </div>

                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <FaUsers className="mr-3 text-blue-600" />
                  <span>{event.currentAttendees} / {event.capacity} attendees</span>
                </div>
              </div>

              {/* Organizer */}
              <div className="flex items-center pt-6 border-t border-gray-200 dark:border-gray-700">
                <img
                  src={event.organizer.avatar}
                  alt={event.organizer.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Organized by</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {event.organizer.name}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                About This Event
              </h2>
              <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
                {event.description}
              </p>
            </div>

            {/* Attendees */}
            {attendees.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Attendees ({attendees.length})
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {attendees.slice(0, 8).map((attendee) => (
                    <div key={attendee._id} className="flex items-center">
                      <img
                        src={attendee.user.avatar}
                        alt={attendee.user.name}
                        className="w-10 h-10 rounded-full mr-2"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
                        {attendee.user.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sticky top-8">
              {!isOrganizer && !isPastEvent && (
                <button
                  onClick={handleRSVP}
                  disabled={rsvpLoading || (isEventFull && !hasRSVP)}
                  className={`w-full py-3 rounded-lg font-semibold transition-colors flex items-center justify-center mb-4 ${
                    hasRSVP
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : isEventFull
                      ? 'bg-gray-300 cursor-not-allowed text-gray-600'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {rsvpLoading ? (
                    <FaSpinner className="animate-spin mr-2" />
                  ) : null}
                  {hasRSVP ? 'Cancel RSVP' : isEventFull ? 'Event Full' : 'RSVP Now'}
                </button>
              )}

              {/* Event Stats */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Status</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    event.status === 'upcoming' ? 'bg-green-100 text-green-800' :
                    event.status === 'ongoing' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {event.status}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Capacity</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {event.currentAttendees} / {event.capacity}
                  </span>
                </div>

                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${(event.currentAttendees / event.capacity) * 100}%` }}
                  />
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  {event.capacity - event.currentAttendees} spots remaining
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;