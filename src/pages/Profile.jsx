import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaEnvelope, FaCalendar, FaSpinner, FaEdit, FaSave, FaTimes, FaCamera } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    avatar: user?.avatar || ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await updateProfile(formData);
    
    if (result.success) {
      setEditing(false);
      toast.success('Profile updated successfully! ✨');
    }

    setLoading(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      bio: user?.bio || '',
      avatar: user?.avatar || ''
    });
    setEditing(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FaSpinner className="animate-spin text-4xl text-purple-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-gray-200/20 dark:border-gray-700/20"
        >
          {/* Cover & Avatar */}
          <div className="relative">
            <div className="h-48 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600">
              <motion.div
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="w-full h-full"
                style={{
                  backgroundImage: 'linear-gradient(45deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
                  backgroundSize: '200% 200%'
                }}
              />
            </div>

            <div className="absolute -bottom-20 left-8">
              <div className="relative group">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  src={editing ? formData.avatar : user.avatar}
                  alt={user.name}
                  className="w-40 h-40 rounded-3xl border-4 border-white dark:border-gray-800 shadow-2xl object-cover"
                />

                {editing && (
                  <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <FaCamera className="text-white text-3xl" />
                    <input type="file" className="hidden" accept="image/*" />
                  </label>
                )}
              </div>
            </div>

            {!editing && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setEditing(true)}
                className="absolute top-4 right-4 flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md text-white rounded-xl hover:bg-white/30 transition-all shadow-lg"
              >
                <FaEdit />
                Edit Profile
              </motion.button>
            )}
          </div>

          <div className="pt-24 px-8 pb-8">
            <AnimatePresence mode="wait">
              {editing ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-5 py-3.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
                      required
                    />
                  </div>

                  {/* Bio */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Bio
                    </label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      rows="4"
                      className="w-full px-5 py-3.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none resize-none"
                      placeholder="Tell us about yourself..."
                    />
                  </div>

                  {/* Avatar URL */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Avatar URL
                    </label>
                    <input
                      type="url"
                      name="avatar"
                      value={formData.avatar}
                      onChange={handleChange}
                      className="w-full px-5 py-3.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
                      placeholder="https://example.com/avatar.jpg"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-purple-400 disabled:to-pink-400 text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg flex items-center justify-center"
                    >
                      {loading ? (
                        <>
                          <FaSpinner className="animate-spin mr-2" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <FaSave className="mr-2" />
                          Save Changes
                        </>
                      )}
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={handleCancel}
                      className="px-8 py-3.5 border-2 border-gray-300 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all font-semibold flex items-center gap-2"
                    >
                      <FaTimes />
                      Cancel
                    </motion.button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="view"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  {/* Name & Email */}
                  <div>
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                      {user.name}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                      <FaEnvelope className="text-purple-600" />
                      {user.email}
                    </p>
                  </div>

                  {/* Bio */}
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <FaUser className="text-purple-600" />
                      About
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {user.bio || 'No bio added yet. Click "Edit Profile" to add one!'}
                    </p>
                  </div>

                  {/* Account Details */}
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                      Account Details
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="flex items-center gap-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-2xl">
                        <div className="flex items-center justify-center w-12 h-12 bg-purple-600 rounded-xl">
                          <FaCalendar className="text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Member since</p>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {new Date(user.createdAt).toLocaleDateString('en-US', {
                              month: 'long',
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl">
                        <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-xl">
                          <FaUser className="text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Account type</p>
                          <p className="font-semibold text-gray-900 dark:text-white capitalize">
                            {user.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;