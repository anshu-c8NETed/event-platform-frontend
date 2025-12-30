// API URLs
export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Event Categories
export const EVENT_CATEGORIES = [
  { value: 'all', label: 'All Categories' },
  { value: 'conference', label: 'Conference' },
  { value: 'workshop', label: 'Workshop' },
  { value: 'meetup', label: 'Meetup' },
  { value: 'seminar', label: 'Seminar' },
  { value: 'webinar', label: 'Webinar' },
  { value: 'social', label: 'Social' },
  { value: 'sports', label: 'Sports' },
  { value: 'music', label: 'Music' },
  { value: 'arts', label: 'Arts' },
  { value: 'other', label: 'Other' }
];

// Event Status
export const EVENT_STATUS = [
  { value: 'all', label: 'All Status' },
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'ongoing', label: 'Ongoing' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' }
];

// Sort Options
export const SORT_OPTIONS = [
  { value: '-date', label: 'Date (Newest First)' },
  { value: 'date', label: 'Date (Oldest First)' },
  { value: '-createdAt', label: 'Recently Added' },
  { value: 'title', label: 'Title (A-Z)' },
  { value: '-title', label: 'Title (Z-A)' }
];

// Pagination
export const DEFAULT_PAGE_SIZE = 12;
export const PAGE_SIZE_OPTIONS = [6, 12, 24, 48];

// Validation Rules
export const VALIDATION = {
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  PASSWORD_MIN_LENGTH: 6,
  PASSWORD_MAX_LENGTH: 128,
  TITLE_MIN_LENGTH: 3,
  TITLE_MAX_LENGTH: 100,
  DESCRIPTION_MIN_LENGTH: 10,
  DESCRIPTION_MAX_LENGTH: 2000,
  LOCATION_MIN_LENGTH: 3,
  LOCATION_MAX_LENGTH: 200,
  MIN_CAPACITY: 1,
  MAX_CAPACITY: 10000,
  MAX_IMAGE_SIZE: 5 * 1024 * 1024, // 5MB
};

// Date Formats
export const DATE_FORMATS = {
  FULL: 'EEEE, MMMM dd, yyyy',
  SHORT: 'MMM dd, yyyy',
  TIME: 'hh:mm a',
  DATETIME: 'MMM dd, yyyy hh:mm a',
  ISO: "yyyy-MM-dd'T'HH:mm"
};

// Toast Messages
export const TOAST_MESSAGES = {
  SUCCESS: {
    LOGIN: 'Welcome back!',
    REGISTER: 'Account created successfully!',
    LOGOUT: 'Logged out successfully',
    EVENT_CREATED: 'Event created successfully!',
    EVENT_UPDATED: 'Event updated successfully!',
    EVENT_DELETED: 'Event deleted successfully',
    RSVP_CONFIRMED: 'RSVP confirmed!',
    RSVP_CANCELLED: 'RSVP cancelled',
    PROFILE_UPDATED: 'Profile updated successfully!'
  },
  ERROR: {
    LOGIN_FAILED: 'Invalid credentials',
    REGISTER_FAILED: 'Registration failed',
    NETWORK_ERROR: 'Network error - please check your connection',
    EVENT_NOT_FOUND: 'Event not found',
    UNAUTHORIZED: 'Please login to continue',
    EVENT_FULL: 'Event is full',
    GENERIC: 'Something went wrong'
  }
};

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  THEME: 'theme',
  FILTERS: 'event_filters'
};

// Default Avatar
export const DEFAULT_AVATAR = 'https://ui-avatars.com/api/?background=3b82f6&color=fff&size=200';

// Image Placeholders
export const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/800x600/3b82f6/ffffff?text=Event+Image';

// Regex Patterns
export const REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  URL: /^https?:\/\/.+/,
  PHONE: /^[\d\s\-\+\(\)]+$/
};

// Color Schemes
export const COLORS = {
  PRIMARY: '#3b82f6',
  SUCCESS: '#10b981',
  WARNING: '#f59e0b',
  DANGER: '#ef4444',
  INFO: '#06b6d4'
};

// Animation Durations (ms)
export const ANIMATION = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500
};

// Debounce Delay (ms)
export const DEBOUNCE_DELAY = 500;

export default {
  API_URL,
  EVENT_CATEGORIES,
  EVENT_STATUS,
  SORT_OPTIONS,
  DEFAULT_PAGE_SIZE,
  PAGE_SIZE_OPTIONS,
  VALIDATION,
  DATE_FORMATS,
  TOAST_MESSAGES,
  STORAGE_KEYS,
  DEFAULT_AVATAR,
  PLACEHOLDER_IMAGE,
  REGEX,
  COLORS,
  ANIMATION,
  DEBOUNCE_DELAY
};