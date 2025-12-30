import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

/**
 * Custom hook for managing events data and operations
 * Provides fetching, filtering, pagination, and CRUD operations
 * 
 * @param {object} initialFilters - Initial filter values
 * @returns {object} Events data and operations
 * 
 * @example
 * function EventsList() {
 *   const { 
 *     events, 
 *     loading, 
 *     fetchEvents, 
 *     deleteEvent,
 *     pagination 
 *   } = useEvents({ category: 'tech' });
 *   
 *   return (
 *     <div>
 *       {events.map(event => (
 *         <EventCard key={event._id} event={event} />
 *       ))}
 *     </div>
 *   );
 * }
 */
export const useEvents = (initialFilters = {}) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    status: 'upcoming',
    page: 1,
    limit: 12,
    sort: '-date',
    ...initialFilters
  });
  const [pagination, setPagination] = useState({
    page: 1,
    pages: 1,
    total: 0,
    count: 0
  });

  /**
   * Fetch events from API
   */
  const fetchEvents = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== 'all') {
          params.append(key, value);
        }
      });

      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/events?${params}`
      );

      setEvents(res.data.data);
      setPagination({
        page: res.data.page,
        pages: res.data.pages,
        total: res.data.total,
        count: res.data.count
      });
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch events';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  /**
   * Fetch single event by ID
   */
  const fetchEventById = async (id) => {
    setLoading(true);
    setError(null);
    
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/events/${id}`
      );
      return res.data.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch event';
      setError(message);
      toast.error(message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Create new event
   */
  const createEvent = async (eventData) => {
    setLoading(true);
    setError(null);
    
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/events`,
        eventData
      );
      toast.success('Event created successfully!');
      return { success: true, data: res.data.data };
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to create event';
      setError(message);
      toast.error(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Update existing event
   */
  const updateEvent = async (id, eventData) => {
    setLoading(true);
    setError(null);
    
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/events/${id}`,
        eventData
      );
      toast.success('Event updated successfully!');
      return { success: true, data: res.data.data };
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to update event';
      setError(message);
      toast.error(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Delete event
   */
  const deleteEvent = async (id) => {
    setLoading(true);
    setError(null);
    
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/events/${id}`);
      toast.success('Event deleted successfully');
      
      // Remove from local state
      setEvents((prev) => prev.filter((event) => event._id !== id));
      
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to delete event';
      setError(message);
      toast.error(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Update filters and reset to page 1
   */
  const updateFilters = (newFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      page: 1 // Reset to first page when filters change
    }));
  };

  /**
   * Change page
   */
  const changePage = (page) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  /**
   * Reset filters to initial state
   */
  const resetFilters = () => {
    setFilters({
      search: '',
      category: 'all',
      status: 'upcoming',
      page: 1,
      limit: 12,
      sort: '-date',
      ...initialFilters
    });
  };

  /**
   * Refresh events (re-fetch with current filters)
   */
  const refresh = () => {
    fetchEvents();
  };

  // Fetch events when filters change
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return {
    // Data
    events,
    loading,
    error,
    filters,
    pagination,
    
    // Operations
    fetchEvents,
    fetchEventById,
    createEvent,
    updateEvent,
    deleteEvent,
    updateFilters,
    changePage,
    resetFilters,
    refresh,
    
    // Computed values
    hasEvents: events.length > 0,
    isEmpty: !loading && events.length === 0,
    hasMore: pagination.page < pagination.pages
  };
};

export default useEvents;