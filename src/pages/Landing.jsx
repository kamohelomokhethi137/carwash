import React from 'react';
import { motion } from 'framer-motion';
import { FaLeaf, FaCalendarAlt, FaInfoCircle } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import car from '../assets/car-wash.svg';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
      damping: 18,
      mass: 0.6
    }
  }
};

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      <div className="relative overflow-hidden pt-20 pb-32 px-6 sm:px-12 lg:px-24">
        {/* Animated Background Blur */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 -left-10 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-10 -right-10 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse"></div>
        </div>

        <motion.div
          className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Left: Text and CTA */}
          <motion.div
            className="max-w-2xl space-y-6 text-center lg:text-left"
            variants={itemVariants}
          >
            <motion.h3 className="text-blue-600 font-bold text-sm sm:text-base flex items-center justify-center lg:justify-start gap-2">
              <FaLeaf className="text-green-500" /> Eco-Friendly Car Care
            </motion.h3>

            <motion.h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
              Shine & Protect<br />
              <span className="text-blue-600">Innovative Car Care</span>
            </motion.h1>

            <motion.p className="text-gray-600 text-lg">
              A premium car wash experience that puts performance, sustainability, and style first. Discover why drivers love us.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4"
              variants={itemVariants}
            >
              <motion.button
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <FaCalendarAlt className="inline mr-2" /> Book Now
              </motion.button>

              <motion.button
                className="px-6 py-3 border border-gray-300 text-gray-800 bg-white rounded-xl font-medium shadow hover:shadow-lg hover:border-gray-400 hover:-translate-y-1 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <FaInfoCircle className="inline mr-2" /> Learn More
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right: Image */}
          <motion.div
            className="w-full max-w-md lg:max-w-xl xl:max-w-2xl"
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          >
            <img
              src={car}
              alt="Car illustration"
              className="w-full h-auto drop-shadow-xl rounded-lg"
              loading="lazy"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Landing;
