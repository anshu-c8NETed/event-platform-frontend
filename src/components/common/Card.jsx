import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className = '', 
  hover = false,
  padding = 'default',
  animate = false,
  bordered = false,
  shadow = 'lg',
  gradient = false,
  glassmorphism = false,
  onClick,
  ...props 
}) => {
  const paddingStyles = {
    none: '',
    sm: 'p-4',
    default: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  };

  const shadowStyles = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    '2xl': 'shadow-2xl'
  };

  const baseStyles = `rounded-xl overflow-hidden transition-all duration-300 ${
    glassmorphism 
      ? 'backdrop-blur-lg bg-white/80 dark:bg-gray-800/80 border border-white/20 dark:border-gray-700/20' 
      : 'bg-white dark:bg-gray-800'
  } ${shadowStyles[shadow]}`;
  
  const hoverStyles = hover ? 'hover:shadow-2xl hover:-translate-y-1 cursor-pointer' : '';
  const borderedStyles = bordered ? 'border-2 border-gray-200 dark:border-gray-700' : '';
  const gradientStyles = gradient ? 'bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900' : '';
  const clickableStyles = onClick ? 'cursor-pointer active:scale-[0.98]' : '';

  const cardContent = (
    <div 
      className={`${baseStyles} ${hoverStyles} ${borderedStyles} ${gradientStyles} ${clickableStyles} ${paddingStyles[padding]} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyPress={onClick ? (e) => e.key === 'Enter' && onClick(e) : undefined}
      {...props}
    >
      {children}
    </div>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        whileHover={hover ? { y: -4 } : {}}
      >
        {cardContent}
      </motion.div>
    );
  }

  return cardContent;
};

// Card Header sub-component
Card.Header = ({ children, className = '', divider = true }) => (
  <div className={`${divider ? 'border-b border-gray-200 dark:border-gray-700 pb-4 mb-4' : 'mb-4'} ${className}`}>
    {children}
  </div>
);

// Card Body sub-component
Card.Body = ({ children, className = '' }) => (
  <div className={className}>
    {children}
  </div>
);

// Card Footer sub-component
Card.Footer = ({ children, className = '', divider = true }) => (
  <div className={`${divider ? 'border-t border-gray-200 dark:border-gray-700 pt-4 mt-4' : 'mt-4'} ${className}`}>
    {children}
  </div>
);

// Card Title sub-component
Card.Title = ({ children, className = '', size = 'lg' }) => {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl'
  };

  return (
    <h3 className={`${sizeClasses[size]} font-bold text-gray-900 dark:text-white ${className}`}>
      {children}
    </h3>
  );
};

// Card Description sub-component
Card.Description = ({ children, className = '', muted = true }) => (
  <p className={`${muted ? 'text-gray-600 dark:text-gray-300' : 'text-gray-700 dark:text-gray-200'} ${className}`}>
    {children}
  </p>
);

// Card Image sub-component
Card.Image = ({ src, alt, className = '', height = 'h-48', objectFit = 'cover', overlay = false }) => (
  <div className={`relative ${height} overflow-hidden -m-6 mb-6`}>
    <img 
      src={src} 
      alt={alt} 
      className={`w-full h-full object-${objectFit} transition-transform duration-300 hover:scale-105 ${className}`}
      loading="lazy"
    />
    {overlay && (
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
    )}
  </div>
);

// Card Badge sub-component
Card.Badge = ({ children, variant = 'primary', className = '' }) => {
  const variants = {
    primary: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    secondary: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
    success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    danger: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    info: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200'
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

// Card Actions sub-component
Card.Actions = ({ children, className = '', align = 'right' }) => {
  const alignClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
    between: 'justify-between'
  };

  return (
    <div className={`flex items-center space-x-2 ${alignClasses[align]} ${className}`}>
      {children}
    </div>
  );
};

// Card Skeleton for loading states
Card.Skeleton = ({ lines = 3, showImage = false, className = '' }) => (
  <Card className={`animate-pulse ${className}`}>
    {showImage && (
      <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
    )}
    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
    {Array.from({ length: lines }).map((_, i) => (
      <div 
        key={i} 
        className={`h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 ${
          i === lines - 1 ? 'w-2/3' : 'w-full'
        }`}
      ></div>
    ))}
  </Card>
);

// Card Grid Layout
Card.Grid = ({ children, cols = 3, gap = 6, className = '' }) => {
  const colClasses = {
    1: 'grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  };

  const gapClasses = {
    2: 'gap-2',
    4: 'gap-4',
    6: 'gap-6',
    8: 'gap-8',
  };

  return (
    <div className={`grid grid-cols-1 ${colClasses[cols]} ${gapClasses[gap]} ${className}`}>
      {children}
    </div>
  );
};

export default Card;