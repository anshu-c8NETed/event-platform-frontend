import React from 'react';

const Input = ({ 
  label, 
  error, 
  icon: Icon,
  className = '',
  containerClassName = '',
  ...props 
}) => {
  const inputStyles = `w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white transition-colors ${
    Icon ? 'pl-10' : ''
  } ${
    error 
      ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
      : 'border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
  } ${className}`;

  return (
    <div className={`${containerClassName}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        )}
        <input
          className={inputStyles}
          {...props}
        />
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

// Textarea variant
Input.Textarea = ({ 
  label, 
  error, 
  className = '',
  containerClassName = '',
  rows = 4,
  ...props 
}) => {
  const textareaStyles = `w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white transition-colors ${
    error 
      ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
      : 'border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
  } ${className}`;

  return (
    <div className={containerClassName}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <textarea
        className={textareaStyles}
        rows={rows}
        {...props}
      />

      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

// Select variant
Input.Select = ({ 
  label, 
  error, 
  options = [],
  className = '',
  containerClassName = '',
  ...props 
}) => {
  const selectStyles = `w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white transition-colors ${
    error 
      ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
      : 'border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
  } ${className}`;

  return (
    <div className={containerClassName}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <select className={selectStyles} {...props}>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Input;