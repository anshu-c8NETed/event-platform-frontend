// Similar to CreateEvent.jsx but loads existing event data
// Copy CreateEvent.jsx and add:
// - useEffect to fetch event data
// - Pre-fill formData with existing values
// - Change API call to PUT instead of POST
// - Check if user is organizer

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaSpinner } from 'react-icons/fa';

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetchingEvent, setFetchingEvent] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    capacity: '',
    category: 'other'
  });

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/events/${id}`);
      const event = res.data.data;
      setFormData({
        title: event.title,
        description: event.description,
        date: new Date(event.date).toISOString().slice(0, 16),
        location: event.location,
        capacity: event.capacity,
        category: event.category
      });
    } catch (error) {
      toast.error('Failed to load event');
      navigate('/dashboard');
    } finally {
      setFetchingEvent(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/events/${id}`, formData);
      toast.success('Event updated successfully!');
      navigate(`/events/${id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update event');
    } finally {
      setLoading(false);
    }
  };

  if (fetchingEvent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FaSpinner className="animate-spin text-4xl text-blue-600" />
      </div>
    );
  }

  // Rest of the form similar to CreateEvent.jsx
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          Edit Event
        </h1>
        {/* Form fields same as CreateEvent */}
      </div>
    </div>
  );
};

export default EditEvent;