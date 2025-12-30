import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt } from 'react-icons/fa';

const Loading = ({ fullScreen = true, size = 'md', text = 'Loading...', variant = 'spinner' }) => {
  const sizes = {
    sm: 'text-4xl',
    md: 'text-6xl',
    lg: 'text-8xl'
  };

  const containerClass = fullScreen 
    ? 'min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900' 
    : 'flex items-center justify-center p-8';

  // Spinner Variant
  if (variant === 'spinner') {
    return (
      <div className={containerClass}>
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="inline-block"
          >
            <div className={`${sizes[size]} text-blue-600 dark:text-blue-400 mx-auto mb-4`}>
              <svg className="animate-spin" fill="none" viewBox="0 0 24 24">
                <circle 
                  className="opacity-25" 
                  cx="12" 
                  cy="12" 
                  r="10" 
                  stroke="currentColor" 
                  strokeWidth="4"
                />
                <path 
                  className="opacity-75" 
                  fill="currentColor" 
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </div>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-400 font-medium"
          >
            {text}
          </motion.p>
        </div>
      </div>
    );
  }

  // Pulse Variant
  if (variant === 'pulse') {
    return (
      <div className={containerClass}>
        <div className="text-center">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="inline-block mb-4"
          >
            <FaCalendarAlt className={`${sizes[size]} text-blue-600 dark:text-blue-400`} />
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-400 font-medium"
          >
            {text}
          </motion.p>
        </div>
      </div>
    );
  }

  // Dots Variant
  if (variant === 'dots') {
    return (
      <div className={containerClass}>
        <div className="text-center">
          <div className="flex space-x-2 justify-center mb-4">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                animate={{ 
                  y: [0, -20, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 0.8,
                  delay: index * 0.15,
                  ease: "easeInOut"
                }}
                className="w-4 h-4 bg-blue-600 dark:bg-blue-400 rounded-full"
              />
            ))}
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400 font-medium">
            {text}
          </p>
        </div>
      </div>
    );
  }

  // Bars Variant
  if (variant === 'bars') {
    return (
      <div className={containerClass}>
        <div className="text-center">
          <div className="flex space-x-2 justify-center mb-4">
            {[0, 1, 2, 3, 4].map((index) => (
              <motion.div
                key={index}
                animate={{ 
                  scaleY: [1, 2, 1]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1,
                  delay: index * 0.1,
                  ease: "easeInOut"
                }}
                className="w-2 h-8 bg-blue-600 dark:bg-blue-400 rounded-full origin-center"
              />
            ))}
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400 font-medium">
            {text}
          </p>
        </div>
      </div>
    );
  }

  // Progress Variant
  if (variant === 'progress') {
    return (
      <div className={containerClass}>
        <div className="w-full max-w-md">
          <div className="mb-4">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ 
                repeat: Infinity, 
                duration: 2, 
                ease: "easeInOut",
                repeatType: "reverse"
              }}
              className="h-2 bg-blue-600 dark:bg-blue-400 rounded-full"
            />
          </div>
          <p className="text-center text-xl text-gray-600 dark:text-gray-400 font-medium">
            {text}
          </p>
        </div>
      </div>
    );
  }

  return null;
};

// Skeleton Loading Component
Loading.Skeleton = ({ lines = 3, className = '', showAvatar = false }) => (
  <div className={`animate-pulse ${className}`}>
    {showAvatar && (
      <div className="flex items-center space-x-4 mb-4">
        <div className="rounded-full bg-gray-200 dark:bg-gray-700 h-12 w-12"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>
    )}
    {Array.from({ length: lines }).map((_, i) => (
      <div 
        key={i} 
        className={`h-4 bg-gray-200 dark:bg-gray-700 rounded mb-3 ${
          i === lines - 1 ? 'w-2/3' : 'w-full'
        }`}
      ></div>
    ))}
  </div>
);

// Card Skeleton
Loading.CardSkeleton = ({ count = 3 }) => (
  <div className="grid md:grid-cols-3 gap-6">
    {Array.from({ length: count }).map((_, index) => (
      <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden animate-pulse">
        <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
        <div className="p-6">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mb-4"></div>
          <div className="flex items-center space-x-2">
            <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            <div className="flex-1">
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

// Inline Loader
Loading.Inline = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <svg 
      className={`animate-spin ${sizeClasses[size]} text-blue-600 dark:text-blue-400`} 
      fill="none" 
      viewBox="0 0 24 24"
    >
      <circle 
        className="opacity-25" 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="currentColor" 
        strokeWidth="4"
      />
      <path 
        className="opacity-75" 
        fill="currentColor" 
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
};

export default Loading;