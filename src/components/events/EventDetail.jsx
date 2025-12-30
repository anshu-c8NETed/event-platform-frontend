import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { FaCalendar, FaMapMarkerAlt, FaUsers, FaClock, FaEdit, FaTrash } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rsvpLoading, setRsvpLoading] = useState(false);
  const [attendees, setAttendees] = useState([]);

  useEffect(() => {
    fetchEvent();
    if (isAuthenticated) {
      fetchAttendees();
    }
  }, [id, isAuthenticated]);

  const fetchEvent = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/events/${id}`);
      setEvent(res.data.data);
    } catch (error) {
      toast.error('Failed to load event');
      navigate('/events');
    } finally {
      setLoading(false);
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
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/rsvps/event/${id}`);
      
      // Optimistic update
      setEvent(prev => ({
        ...prev,
        currentAttendees: prev.currentAttendees + 1,
        hasRSVP: true
      }));
      
      toast.success(res.data.message);
      fetchAttendees();
    } catch (error) {
      toast.error(error.response?.data?.message || 'RSVP failed');
    } finally {
      setRsvpLoading(false);
    }
  };

  const handleCancelRSVP = async () => {
    setRsvpLoading(true);
    try {
      const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/rsvps/event/${id}`);
      
      // Optimistic update
      setEvent(prev => ({
        ...prev,
        currentAttendees: prev.currentAttendees - 1,
        hasRSVP: false
      }));
      
      toast.success(res.data.message);
      fetchAttendees();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to cancel RSVP');
    } finally {
      setRsvpLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/events/${id}`);
        toast.success('Event deleted successfully');
        navigate('/dashboard');
      } catch (error) {
        toast.error('Failed to delete event');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Event not found</p>
      </div>
    );
  }

  const availableSpots = event.capacity - event.currentAttendees;
  const isFull = availableSpots <= 0;
  const isOrganizer = user?._id === event.organizer._id;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Hero Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="relative h-96">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            
            {/* Event Title on Image */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="flex justify-between items-end">
                <div>
                  <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    {event.category}
                  </span>
                  <h1 className="text-4xl font-bold text-white mt-4">{event.title}</h1>
                </div>
                
                {/* Edit/Delete buttons for organizer */}
                {isOrganizer && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => navigate(`/events/${id}/edit`)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white p-3 rounded-full transition-colors"
                    >
                      <FaEdit size={20} />
                    </button>
                    <button
                      onClick={handleDelete}
                      className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full transition-colors"
                    >
                      <FaTrash size={20} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Event Details */}
          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Event Details
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <FaCalendar className="text-blue-600 mt-1 mr-3" size={20} />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {format(new Date(event.date), 'EEEE, MMMM dd, yyyy')}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        {format(new Date(event.date), 'hh:mm a')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <FaMapMarkerAlt className="text-blue-600 mt-1 mr-3" size={20} />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Location</p>
                      <p className="text-gray-600 dark:text-gray-400">{event.location}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <FaUsers className="text-blue-600 mt-1 mr-3" size={20} />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Capacity</p>
                      <p className="text-gray-600 dark:text-gray-400">
                        {isFull ? (
                          <span className="text-red-600 font-semibold">Event Full</span>
                        ) : (
                          <span>
                            {availableSpots} spots available / {event.capacity} total
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    About This Event
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {event.description}
                  </p>
                </div>

                {/* Organizer */}
                <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Organized by</p>
                  <div className="flex items-center">
                    <img
                      src={event.organizer.avatar || 'https://via.placeholder.com/50'}
                      alt={event.organizer.name}
                      className="w-12 h-12 rounded-full mr-3"
                    />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {event.organizer.name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {event.organizer.email}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div>
                {/* RSVP Section */}
                {!isOrganizer && (
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900 dark:to-purple-900 p-6 rounded-xl mb-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                      {event.hasRSVP ? 'You\'re Attending!' : 'Join This Event'}
                    </h3>
                    
                    {event.hasRSVP ? (
                      <button
                        onClick={handleCancelRSVP}
                        disabled={rsvpLoading}
                        className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition-colors"
                      >
                        {rsvpLoading ? 'Processing...' : 'Cancel RSVP'}
                      </button>
                    ) : (
                      <button
                        onClick={handleRSVP}
                        disabled={rsvpLoading || isFull}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition-colors"
                      >
                        {rsvpLoading ? 'Processing...' : isFull ? 'Event Full' : 'RSVP Now'}
                      </button>
                    )}
                  </div>
                )}

                {/* Attendees */}
                {attendees.length > 0 && (
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                      Attendees ({attendees.length})
                    </h3>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {attendees.map((rsvp) => (
                        <div key={rsvp._id} className="flex items-center">
                          <img
                            src={rsvp.user.avatar || 'https://via.placeholder.com/40'}
                            alt={rsvp.user.name}
                            className="w-10 h-10 rounded-full mr-3"
                          />
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">
                              {rsvp.user.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {format(new Date(rsvp.rsvpDate), 'MMM dd, yyyy')}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;