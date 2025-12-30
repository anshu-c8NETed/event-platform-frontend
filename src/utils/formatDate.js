import { format, formatDistanceToNow, isPast, isFuture, isToday, isTomorrow } from 'date-fns';

/**
 * Format date to readable string
 * @param {Date|string} date - Date to format
 * @param {string} formatStr - Format string (default: 'MMM dd, yyyy')
 * @returns {string} Formatted date
 */
export const formatDate = (date, formatStr = 'MMM dd, yyyy') => {
  if (!date) return '';
  try {
    return format(new Date(date), formatStr);
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
};

/**
 * Format date and time
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date and time
 */
export const formatDateTime = (date) => {
  return formatDate(date, 'MMM dd, yyyy hh:mm a');
};

/**
 * Format time only
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted time
 */
export const formatTime = (date) => {
  return formatDate(date, 'hh:mm a');
};

/**
 * Format date for input fields (datetime-local)
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date for input
 */
export const formatDateForInput = (date) => {
  if (!date) return '';
  try {
    const d = new Date(date);
    return d.toISOString().slice(0, 16);
  } catch (error) {
    console.error('Error formatting date for input:', error);
    return '';
  }
};

/**
 * Get relative time (e.g., "2 hours ago")
 * @param {Date|string} date - Date to format
 * @returns {string} Relative time string
 */
export const getRelativeTime = (date) => {
  if (!date) return '';
  try {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  } catch (error) {
    console.error('Error getting relative time:', error);
    return '';
  }
};

/**
 * Check if date is in the past
 * @param {Date|string} date - Date to check
 * @returns {boolean}
 */
export const isDatePast = (date) => {
  if (!date) return false;
  try {
    return isPast(new Date(date));
  } catch (error) {
    console.error('Error checking if date is past:', error);
    return false;
  }
};

/**
 * Check if date is in the future
 * @param {Date|string} date - Date to check
 * @returns {boolean}
 */
export const isDateFuture = (date) => {
  if (!date) return false;
  try {
    return isFuture(new Date(date));
  } catch (error) {
    console.error('Error checking if date is future:', error);
    return false;
  }
};

/**
 * Get friendly date label
 * @param {Date|string} date - Date to format
 * @returns {string} Friendly label like "Today", "Tomorrow", or formatted date
 */
export const getFriendlyDate = (date) => {
  if (!date) return '';
  try {
    const d = new Date(date);
    if (isToday(d)) return 'Today';
    if (isTomorrow(d)) return 'Tomorrow';
    return formatDate(date, 'EEEE, MMM dd');
  } catch (error) {
    console.error('Error getting friendly date:', error);
    return '';
  }
};

/**
 * Get event status based on date
 * @param {Date|string} date - Event date
 * @returns {string} Status: 'past', 'today', 'upcoming'
 */
export const getEventStatus = (date) => {
  if (!date) return 'unknown';
  try {
    const d = new Date(date);
    if (isPast(d) && !isToday(d)) return 'past';
    if (isToday(d)) return 'today';
    return 'upcoming';
  } catch (error) {
    console.error('Error getting event status:', error);
    return 'unknown';
  }
};

/**
 * Format duration between two dates
 * @param {Date|string} startDate - Start date
 * @param {Date|string} endDate - End date
 * @returns {string} Duration string
 */
export const formatDuration = (startDate, endDate) => {
  if (!startDate || !endDate) return '';
  try {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diff = end - start;
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours === 0) return `${minutes} min`;
    if (minutes === 0) return `${hours} hr`;
    return `${hours} hr ${minutes} min`;
  } catch (error) {
    console.error('Error formatting duration:', error);
    return '';
  }
};

/**
 * Get day of week
 * @param {Date|string} date - Date
 * @returns {string} Day name
 */
export const getDayOfWeek = (date) => {
  return formatDate(date, 'EEEE');
};

/**
 * Get month name
 * @param {Date|string} date - Date
 * @returns {string} Month name
 */
export const getMonthName = (date) => {
  return formatDate(date, 'MMMM');
};

/**
 * Get year
 * @param {Date|string} date - Date
 * @returns {string} Year
 */
export const getYear = (date) => {
  return formatDate(date, 'yyyy');
};

/**
 * Check if two dates are on the same day
 * @param {Date|string} date1 - First date
 * @param {Date|string} date2 - Second date
 * @returns {boolean}
 */
export const isSameDay = (date1, date2) => {
  if (!date1 || !date2) return false;
  try {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    return d1.toDateString() === d2.toDateString();
  } catch (error) {
    console.error('Error checking if same day:', error);
    return false;
  }
};

/**
 * Get countdown to date
 * @param {Date|string} date - Target date
 * @returns {object} Object with days, hours, minutes, seconds
 */
export const getCountdown = (date) => {
  if (!date) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  
  try {
    const now = new Date();
    const target = new Date(date);
    const diff = target - now;
    
    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((diff % (1000 * 60)) / 1000)
    };
  } catch (error) {
    console.error('Error getting countdown:', error);
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
};

export default {
  formatDate,
  formatDateTime,
  formatTime,
  formatDateForInput,
  getRelativeTime,
  isDatePast,
  isDateFuture,
  getFriendlyDate,
  getEventStatus,
  formatDuration,
  getDayOfWeek,
  getMonthName,
  getYear,
  isSameDay,
  getCountdown
};