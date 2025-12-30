import React, { useState } from 'react';
import { FaImage } from 'react-icons/fa';
import toast from 'react-hot-toast';
import Input from '../common/Input';
import Button from '../common/Button';

const EventForm = ({ initialData = {}, onSubmit, loading = false, submitLabel = 'Create Event' }) => {
  const [imagePreview, setImagePreview] = useState(initialData.image || null);
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    description: initialData.description || '',
    date: initialData.date || '',
    location: initialData.location || '',
    capacity: initialData.capacity || '',
    category: initialData.category || 'other',
    image: initialData.image || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size must be less than 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData(prev => ({
          ...prev,
          image: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.image) {
      toast.error('Please upload an event image');
      return;
    }

    onSubmit(formData);
  };

  const categoryOptions = [
    { value: 'conference', label: 'Conference' },
    { value: 'workshop', label: 'Workshop' },
    { value: 'meetup', label: 'Meetup' },
    { value: 'seminar', label: 'Seminar' },
    { value: 'webinar', label: 'Webinar' },
    { value: 'social', label: 'Social' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Event Image *
        </label>
        <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg hover:border-blue-500 transition-colors">
          <div className="space-y-1 text-center">
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="mx-auto h-48 w-auto rounded-lg" />
            ) : (
              <FaImage className="mx-auto h-12 w-12 text-gray-400" />
            )}
            <div className="flex text-sm text-gray-600 dark:text-gray-400">
              <label className="relative cursor-pointer bg-white dark:bg-gray-700 rounded-md font-medium text-blue-600 hover:text-blue-500">
                <span>Upload a file</span>
                <input 
                  type="file" 
                  className="sr-only" 
                  accept="image/*" 
                  onChange={handleImageChange} 
                />
              </label>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
          </div>
        </div>
      </div>

      {/* Title */}
      <Input
        label="Event Title"
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="e.g., Tech Conference 2025"
        required
      />

      {/* Description */}
      <Input.Textarea
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        rows={5}
        placeholder="Describe your event..."
        required
      />

      {/* Date & Time */}
      <Input
        label="Date & Time"
        type="datetime-local"
        name="date"
        value={formData.date}
        onChange={handleChange}
        min={new Date().toISOString().slice(0, 16)}
        required
      />

      {/* Location */}
      <Input
        label="Location"
        type="text"
        name="location"
        value={formData.location}
        onChange={handleChange}
        placeholder="e.g., Mumbai, India or Online"
        required
      />

      {/* Capacity & Category */}
      <div className="grid md:grid-cols-2 gap-6">
        <Input
          label="Capacity"
          type="number"
          name="capacity"
          value={formData.capacity}
          onChange={handleChange}
          min="1"
          placeholder="100"
          required
        />

        <Input.Select
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          options={categoryOptions}
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        fullWidth
        loading={loading}
      >
        {submitLabel}
      </Button>
    </form>
  );
};

export default EventForm;