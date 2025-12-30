import React from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaGithub, FaLinkedin, FaTwitter, FaHeart, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { to: '/events', label: 'Browse Events' },
    { to: '/create-event', label: 'Create Event' },
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/about', label: 'About Us' },
  ];

  const supportLinks = [
    { to: '/help', label: 'Help Center' },
    { to: '/faq', label: 'FAQ' },
    { to: '/contact', label: 'Contact Us' },
    { to: '/feedback', label: 'Feedback' },
  ];

  const legalLinks = [
    { to: '/terms', label: 'Terms of Service' },
    { to: '/privacy', label: 'Privacy Policy' },
    { to: '/cookies', label: 'Cookie Policy' },
  ];

  const socialLinks = [
    { 
      href: 'https://github.com', 
      icon: FaGithub, 
      label: 'GitHub',
      hoverColor: 'hover:bg-gray-800 dark:hover:bg-gray-600'
    },
    { 
      href: 'https://linkedin.com', 
      icon: FaLinkedin, 
      label: 'LinkedIn',
      hoverColor: 'hover:bg-blue-600'
    },
    { 
      href: 'https://twitter.com', 
      icon: FaTwitter, 
      label: 'Twitter',
      hoverColor: 'hover:bg-sky-500'
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-12"
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="col-span-1 md:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 group mb-4">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <FaCalendarAlt className="text-3xl text-blue-500" />
                <motion.div
                  className="absolute inset-0 bg-blue-500 rounded-full blur-lg opacity-0 group-hover:opacity-50 transition-opacity"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
              </motion.div>
              <span className="text-2xl font-bold text-white">EventHub</span>
            </Link>
            <p className="text-gray-400 mb-4 leading-relaxed">
              Create, discover, and join amazing events. Connect with people who share your interests and make unforgettable memories.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-3 bg-gray-800 text-gray-400 rounded-lg ${social.hoverColor} hover:text-white transition-all shadow-lg hover:shadow-xl`}
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-bold text-lg mb-4 flex items-center">
              <span className="w-8 h-0.5 bg-blue-500 mr-3"></span>
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-blue-400 transition-colors flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-bold text-lg mb-4 flex items-center">
              <span className="w-8 h-0.5 bg-blue-500 mr-3"></span>
              Support
            </h3>
            <ul className="space-y-2.5">
              {supportLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-blue-400 transition-colors flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-bold text-lg mb-4 flex items-center">
              <span className="w-8 h-0.5 bg-blue-500 mr-3"></span>
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaEnvelope className="text-blue-400 mt-1 mr-3 flex-shrink-0" />
                <a 
                  href="mailto:support@eventhub.com" 
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  support@eventhub.com
                </a>
              </li>
              <li className="flex items-start">
                <FaPhone className="text-blue-400 mt-1 mr-3 flex-shrink-0" />
                <a 
                  href="tel:+1234567890" 
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-blue-400 mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-400">
                  123 Event Street<br />
                  New York, NY 10001
                </span>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Newsletter Subscription */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border-t border-gray-700 py-8"
        >
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-white font-bold text-xl mb-2">
              Stay Updated
            </h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for the latest events and updates
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl"
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="border-t border-gray-700 py-6"
        >
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <span>© {currentYear} EventHub.</span>
              <span>Made with</span>
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 1.5,
                  ease: "easeInOut"
                }}
              >
                <FaHeart className="text-red-500" />
              </motion.div>
              <span>by Anshu Raj</span>
            </div>

            {/* Legal Links */}
            <div className="flex items-center space-x-6">
              {legalLinks.map((link, index) => (
                <React.Fragment key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                  {index < legalLinks.length - 1 && (
                    <span className="text-gray-600">•</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
    </footer>
  );
};

export default Footer;