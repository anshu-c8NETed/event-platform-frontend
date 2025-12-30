import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaCalendarAlt, FaUsers, FaRocket, FaSearch, FaStar, FaTrophy, FaHeart, FaChevronRight, FaPlay } from 'react-icons/fa';
import axios from 'axios';

const Home = () => {
  const navigate = useNavigate();
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  useEffect(() => {
    fetchFeaturedEvents();
  }, []);

  const fetchFeaturedEvents = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/events?limit=6`);
      setFeaturedEvents(res.data.data);
    } catch (error) {
      console.error('Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { icon: <FaCalendarAlt />, value: '10K+', label: 'Events Hosted', color: 'from-blue-500 to-cyan-500' },
    { icon: <FaUsers />, value: '50K+', label: 'Active Members', color: 'from-purple-500 to-pink-500' },
    { icon: <FaTrophy />, value: '98%', label: 'Satisfaction Rate', color: 'from-orange-500 to-red-500' },
    { icon: <FaHeart />, value: '1M+', label: 'Connections Made', color: 'from-green-500 to-teal-500' }
  ];

  const features = [
    {
      icon: <FaCalendarAlt size={32} />,
      title: 'Effortless Event Creation',
      description: 'Create stunning event pages in minutes with our intuitive drag-and-drop builder and customizable templates',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <FaUsers size={32} />,
      title: 'Smart Community Matching',
      description: 'AI-powered recommendations connect you with events and people aligned with your interests and goals',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: <FaRocket size={32} />,
      title: 'Real-Time Engagement',
      description: 'Live updates, instant RSVPs, and interactive features keep your attendees engaged from start to finish',
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Event Organizer',
      image: 'https://i.pravatar.cc/150?img=1',
      text: 'EventHub transformed how we manage our tech conferences. The platform is intuitive and our attendee engagement increased by 200%!',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Community Manager',
      image: 'https://i.pravatar.cc/150?img=2',
      text: 'Best event platform I\'ve used. The real-time features and analytics help us create better experiences for our community.',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'Workshop Facilitator',
      image: 'https://i.pravatar.cc/150?img=3',
      text: 'From local meetups to large workshops, EventHub handles it all seamlessly. Our RSVP rate improved dramatically!',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero Section with Parallax */}
      <motion.section 
        style={{ opacity, scale }}
        className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white py-24 md:py-32 overflow-hidden"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-40 -right-40 w-96 h-96 bg-white rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-yellow-300 rounded-full blur-3xl"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
              >
                <FaStar className="text-yellow-300" />
                <span className="text-sm font-medium">Rated 4.9/5 by 10,000+ users</span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Where Moments
                <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  Become Memories
                </span>
              </h1>

              <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed">
                Discover extraordinary events, connect with inspiring people, and create unforgettable experiences
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/events"
                    className="group bg-white text-purple-600 hover:bg-opacity-90 px-8 py-4 rounded-xl font-semibold transition-all inline-flex items-center justify-center shadow-2xl shadow-purple-500/50"
                  >
                    <FaSearch className="mr-2 group-hover:rotate-12 transition-transform" />
                    Explore Events
                    <FaChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/create-event"
                    className="group bg-transparent border-2 border-white hover:bg-white hover:text-purple-600 px-8 py-4 rounded-xl font-semibold transition-all inline-flex items-center justify-center"
                  >
                    <FaCalendarAlt className="mr-2 group-hover:rotate-12 transition-transform" />
                    Create Event
                  </Link>
                </motion.div>
              </div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-12 flex items-center gap-8 text-sm"
              >
                <div className="flex -space-x-2">
                  {[1,2,3,4,5].map(i => (
                    <img key={i} src={`https://i.pravatar.cc/40?img=${i}`} alt="" className="w-10 h-10 rounded-full border-2 border-white" />
                  ))}
                </div>
                <p className="text-blue-100">Join 50,000+ event enthusiasts</p>
              </motion.div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative hidden lg:block"
            >
              <div className="relative">
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl"
                >
                  <div className="bg-gradient-to-br from-white/20 to-white/5 rounded-2xl p-6 space-y-4">
                    <div className="h-40 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-xl" />
                    <div className="space-y-2">
                      <div className="h-4 bg-white/30 rounded w-3/4" />
                      <div className="h-3 bg-white/20 rounded w-1/2" />
                    </div>
                  </div>
                </motion.div>

                {/* Floating Cards */}
                <motion.div
                  animate={{ y: [0, 15, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-2xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                      <FaUsers className="text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Live Attendees</p>
                      <p className="text-lg font-bold text-gray-900">1,234</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -top-6 -right-6 bg-white rounded-2xl p-4 shadow-2xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                      <FaStar className="text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Event Rating</p>
                      <p className="text-lg font-bold text-gray-900">4.9/5</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="text-center group cursor-pointer"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} mb-4 transform group-hover:scale-110 transition-transform shadow-lg`}>
                  <span className="text-white text-2xl">{stat.icon}</span>
                </div>
                <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 group-hover:scale-110 transition-transform">
                  {stat.value}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-purple-600 dark:text-purple-400 font-semibold text-sm uppercase tracking-wider">
              Why Choose Us
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mt-3 mb-4">
              Everything You Need, All in One Place
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Built for creators, loved by communities. Experience event management reimagined.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="group relative bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className={`relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all shadow-lg`}>
                  <span className="text-white">{feature.icon}</span>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {feature.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>

                <div className="mt-6 flex items-center text-purple-600 dark:text-purple-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more 
                  <FaChevronRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-purple-600 dark:text-purple-400 font-semibold text-sm uppercase tracking-wider">
              Happening Now
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mt-3 mb-4">
              Featured Events
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Discover events that match your passions
            </p>
          </motion.div>

          {loading ? (
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-200 dark:bg-gray-800 rounded-3xl h-96 animate-pulse" />
              ))}
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {featuredEvents.slice(0, 6).map((event, index) => (
                  <motion.div
                    key={event._id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -8 }}
                    className="group cursor-pointer"
                    onClick={() => navigate(`/events/${event._id}`)}
                  >
                    <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 px-3 py-1 rounded-full text-sm font-semibold text-purple-600 dark:text-purple-400 shadow-lg">
                          {event.category}
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2">
                          {event.title}
                        </h3>

                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                          <FaCalendarAlt className="text-purple-600" />
                          <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <img src={event.organizer?.avatar} alt="" className="w-8 h-8 rounded-full" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">{event.organizer?.name}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                            <FaUsers />
                            <span>{event.currentAttendees}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <Link
                  to="/events"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-xl hover:shadow-2xl hover:scale-105"
                >
                  View All Events
                  <FaChevronRight />
                </Link>
              </motion.div>
            </>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-purple-600 dark:text-purple-400 font-semibold text-sm uppercase tracking-wider">
              Testimonials
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mt-3 mb-4">
              Loved by Event Creators
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              See what our community has to say
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                  ))}
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>

                <div className="flex items-center gap-4">
                  <img src={testimonial.image} alt={testimonial.name} className="w-14 h-14 rounded-full" />
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Ready to Create Something Amazing?
            </h2>
            <p className="text-xl md:text-2xl mb-10 text-purple-100 leading-relaxed">
              Join thousands of event organizers and attendees building meaningful connections
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 bg-white text-purple-600 hover:bg-opacity-90 px-8 py-4 rounded-xl font-semibold transition-all shadow-2xl"
                >
                  Get Started Free
                  <FaChevronRight />
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <button className="inline-flex items-center gap-2 bg-transparent border-2 border-white hover:bg-white hover:text-purple-600 px-8 py-4 rounded-xl font-semibold transition-all">
                  <FaPlay />
                  Watch Demo
                </button>
              </motion.div>
            </div>

            <p className="mt-8 text-purple-200 text-sm">
              No credit card required • Free forever plan • Setup in 2 minutes
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;