import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaSpinner, FaImage, FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaTag, FaUpload, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const CreateEvent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    capacity: '',
    category: 'other',
    image: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (file) => {
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB');
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setFormData({ ...formData, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setFormData({ ...formData, image: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.image) {
      toast.error('Please upload an event image');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/events`,
        formData
      );
      toast.success('Event created successfully! 🎉');
      navigate(`/events/${res.data.data._id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create event');
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { value: 'conference', label: '🎤 Conference', color: 'from-blue-500 to-blue-600' },
    { value: 'workshop', label: '🔧 Workshop', color: 'from-green-500 to-green-600' },
    { value: 'meetup', label: '👥 Meetup', color: 'from-purple-500 to-purple-600' },
    { value: 'seminar', label: '📚 Seminar', color: 'from-orange-500 to-orange-600' },
    { value: 'webinar', label: '💻 Webinar', color: 'from-pink-500 to-pink-600' },
    { value: 'social', label: '🎉 Social', color: 'from-yellow-500 to-yellow-600' },
    { value: 'other', label: '📌 Other', color: 'from-gray-500 to-gray-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl mb-4 shadow-lg"
            >
              <FaCalendarAlt className="text-white text-2xl" />
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
              Create New Event
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Share your event with the world
            </p>
          </div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onSubmit={handleSubmit}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 space-y-6 border border-gray-200/20 dark:border-gray-700/20"
          >
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                <FaImage className="text-purple-600" />
                Event Image *
              </label>

              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`relative group ${dragActive ? 'scale-[1.02]' : ''} transition-transform`}
              >
                {imagePreview ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="relative rounded-2xl overflow-hidden"
                  >
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-64 object-cover rounded-2xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-4 right-4 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors shadow-lg"
                    >
                      <FaTimes />
                    </button>

                    <div className="absolute bottom-4 left-4 right-4">
                      <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md text-white rounded-xl hover:bg-white/30 transition-all">
                        <FaUpload />
                        <span className="text-sm font-medium">Change Image</span>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </label>
                    </div>
                  </motion.div>
                ) : (
                  <div
                    className={`border-3 ${dragActive ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' : 'border-gray-300 dark:border-gray-600 border-dashed'} rounded-2xl p-12 text-center hover:border-purple-500 hover:bg-purple-50/50 dark:hover:bg-purple-900/10 transition-all cursor-pointer`}
                  >
                    <motion.div
                      animate={{ y: dragActive ? -10 : [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-full mb-4"
                    >
                      <FaImage className="text-4xl text-purple-600 dark:text-purple-400" />
                    </motion.div>

                    <label className="block cursor-pointer">
                      <span className="text-lg font-semibold text-gray-700 dark:text-gray-300 block mb-2">
                        {dragActive ? 'Drop your image here' : 'Click to upload or drag and drop'}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        PNG, JPG, GIF up to 5MB
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                <FaTag className="text-purple-600" />
                Event Title *
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full px-5 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none text-lg"
                placeholder="e.g., Tech Conference 2025"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Description *
              </label>
              <textarea
                name="description"
                required
                rows="6"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-5 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none resize-none"
                placeholder="Tell attendees what makes your event special..."
              />
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {formData.description.length} / 2000 characters
              </p>
            </div>

            {/* Date & Time and Location */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                  <FaCalendarAlt className="text-purple-600" />
                  Date & Time *
                </label>
                <input
                  type="datetime-local"
                  name="date"
                  required
                  value={formData.date}
                  onChange={handleChange}
                  min={new Date().toISOString().slice(0, 16)}
                  className="w-full px-5 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-purple-600" />
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  required
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-5 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
                  placeholder="e.g., Mumbai, India or Online"
                />
              </div>
            </div>

            {/* Capacity */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                <FaUsers className="text-purple-600" />
                Capacity *
              </label>
              <input
                type="number"
                name="capacity"
                required
                min="1"
                value={formData.capacity}
                onChange={handleChange}
                className="w-full px-5 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
                placeholder="Maximum number of attendees"
              />
            </div>

            {/* Category Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Event Category
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {categories.map((cat) => (
                  <motion.button
                    key={cat.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, category: cat.value })}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-4 rounded-xl border-2 transition-all text-center font-medium ${
                      formData.category === cat.value
                        ? `bg-gradient-to-br ${cat.color} text-white border-transparent shadow-lg`
                        : 'border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-purple-500'
                    }`}
                  >
                    {cat.label}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-purple-400 disabled:to-pink-400 text-white font-semibold py-4 rounded-xl transition-all flex items-center justify-center shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    Creating Event...
                  </>
                ) : (
                  <>
                    <FaCalendarAlt className="mr-2" />
                    Create Event
                  </>
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => navigate(-1)}
                className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all font-semibold"
              >
                Cancel
              </motion.button>
            </div>
          </motion.form>

          {/* Tips Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-purple-200 dark:border-purple-800"
          >
            <h3 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              💡 Tips for a Successful Event
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">•</span>
                <span>Use a high-quality, eye-catching image that represents your event</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">•</span>
                <span>Write a clear, detailed description highlighting key benefits</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">•</span>
                <span>Set a realistic capacity based on your venue or platform limits</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">•</span>
                <span>Choose the right category to help attendees discover your event</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateEvent;