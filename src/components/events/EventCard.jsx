import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format, isPast, isFuture, isToday } from 'date-fns';
import { FaCalendar, FaMapMarkerAlt, FaUsers, FaClock, FaHeart, FaShare, FaBookmark } from 'react-icons/fa';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const EventCard = ({ event, index = 0 }) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const availableSpots = event.capacity - event.currentAttendees;
  const fillPercentage = (event.currentAttendees / event.capacity) * 100;
  const isAlmostFull = availableSpots <= event.capacity * 0.2 && availableSpots > 0;
  const isFull = availableSpots <= 0;
  const eventDate = new Date(event.date);
  const isEventPast = isPast(eventDate);
  const isEventToday = isToday(eventDate);

  const handleClick = () => {
    navigate(`/events/${event._id}`);
  };

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    toast.success(isLiked ? 'Removed from favorites' : 'Added to favorites');
  };

  const handleBookmark = (e) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
    toast.success(isBookmarked ? 'Bookmark removed' : 'Event bookmarked');
  };

  const handleShare = (e) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.description,
        url: window.location.origin + `/events/${event._id}`,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.origin + `/events/${event._id}`);
      toast.success('Link copied to clipboard!');
    }
  };

  const getStatusBadge = () => {
    if (isEventPast) {
      return { text: 'COMPLETED', color: 'bg-gray-600' };
    }
    if (isEventToday) {
      return { text: 'TODAY', color: 'bg-purple-600 animate-pulse' };
    }
    if (isFull) {
      return { text: 'SOLD OUT', color: 'bg-red-600' };
    }
    if (isAlmostFull) {
      return { text: 'FILLING FAST', color: 'bg-orange-600' };
    }
    return null;
  };

  const statusBadge = getStatusBadge();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden cursor-pointer transition-all duration-300 border border-gray-100 dark:border-gray-700"
      onClick={handleClick}
    >
      {/* Event Image */}
      <div className="relative h-56 overflow-hidden bg-gray-200 dark:bg-gray-700">
        <motion.img
          src={event.image}
          alt={event.title}
          className={`w-full h-full object-cover transition-all duration-500 ${
            imageLoaded ? 'scale-100 blur-0' : 'scale-110 blur-sm'
          } group-hover:scale-110`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Category Badge */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 + index * 0.1 }}
          className="absolute top-4 left-4"
        >
          <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg backdrop-blur-sm">
            {event.category}
          </span>
        </motion.div>

        {/* Status Badge */}
        {statusBadge && (
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="absolute top-4 right-4"
          >
            <span className={`${statusBadge.color} text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg`}>
              {statusBadge.text}
            </span>
          </motion.div>
        )}

        {/* Quick Actions */}
        <div className="absolute bottom-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleLike}
            className={`p-2.5 rounded-full backdrop-blur-md transition-all duration-200 ${
              isLiked
                ? 'bg-red-500 text-white'
                : 'bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 hover:bg-red-500 hover:text-white'
            }`}
            aria-label="Like event"
          >
            <FaHeart className="text-sm" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleBookmark}
            className={`p-2.5 rounded-full backdrop-blur-md transition-all duration-200 ${
              isBookmarked
                ? 'bg-blue-500 text-white'
                : 'bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 hover:bg-blue-500 hover:text-white'
            }`}
            aria-label="Bookmark event"
          >
            <FaBookmark className="text-sm" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleShare}
            className="p-2.5 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-md text-gray-700 dark:text-gray-300 hover:bg-green-500 hover:text-white transition-all duration-200"
            aria-label="Share event"
          >
            <FaShare className="text-sm" />
          </motion.button>
        </div>

        {/* Capacity Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gray-200/30 backdrop-blur-sm">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${fillPercentage}%` }}
            transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
            className={`h-full ${
              fillPercentage >= 90 ? 'bg-red-500' :
              fillPercentage >= 70 ? 'bg-orange-500' :
              'bg-green-500'
            }`}
          />
        </div>
      </div>

      {/* Event Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {event.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2 leading-relaxed">
          {event.description}
        </p>

        {/* Event Details */}
        <div className="space-y-2.5 mb-5">
          {/* Date & Time */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className="flex items-center text-gray-600 dark:text-gray-400 text-sm"
          >
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-900/30 mr-3 flex-shrink-0">
              <FaCalendar className="text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="font-medium text-gray-900 dark:text-white">
                {format(eventDate, 'MMM dd, yyyy')}
              </span>
              <span className="mx-2">•</span>
              <span>{format(eventDate, 'hh:mm a')}</span>
            </div>
          </motion.div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            className="flex items-center text-gray-600 dark:text-gray-400 text-sm"
          >
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-purple-50 dark:bg-purple-900/30 mr-3 flex-shrink-0">
              <FaMapMarkerAlt className="text-purple-600 dark:text-purple-400" />
            </div>
            <span className="truncate font-medium text-gray-900 dark:text-white">
              {event.location}
            </span>
          </motion.div>

          {/* Capacity */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + index * 0.1 }}
            className="flex items-center text-gray-600 dark:text-gray-400 text-sm"
          >
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-green-50 dark:bg-green-900/30 mr-3 flex-shrink-0">
              <FaUsers className="text-green-600 dark:text-green-400" />
            </div>
            <div className="flex-1">
              {availableSpots > 0 ? (
                <span>
                  <span className={`font-bold ${
                    isAlmostFull ? 'text-orange-600 dark:text-orange-400' : 'text-green-600 dark:text-green-400'
                  }`}>
                    {availableSpots}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 mx-1">/</span>
                  <span className="text-gray-600 dark:text-gray-300">{event.capacity} spots left</span>
                </span>
              ) : (
                <span className="text-red-600 dark:text-red-400 font-bold">Event Full</span>
              )}
            </div>
          </motion.div>
        </div>

        {/* Organizer */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 + index * 0.1 }}
          className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center min-w-0">
            <img
              src={event.organizer?.avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(event.organizer?.name || 'Organizer')}
              alt={event.organizer?.name}
              className="w-10 h-10 rounded-full mr-3 border-2 border-gray-200 dark:border-gray-700 object-cover flex-shrink-0"
            />
            <div className="min-w-0">
              <p className="text-xs text-gray-500 dark:text-gray-400">Organized by</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                {event.organizer?.name}
              </p>
            </div>
          </div>

          {/* Price Badge (if applicable) */}
          {event.price !== undefined && (
            <div className="flex-shrink-0">
              <span className={`text-lg font-bold ${
                event.price === 0
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-blue-600 dark:text-blue-400'
              }`}>
                {event.price === 0 ? 'FREE' : `$${event.price}`}
              </span>
            </div>
          )}
        </motion.div>

        {/* View Details Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full mt-5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 group/button"
        >
          <span>View Details</span>
          <motion.svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            initial={{ x: 0 }}
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </motion.svg>
        </motion.button>
      </div>

      {/* Shimmer effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      </div>
    </motion.div>
  );
};

export default EventCard;