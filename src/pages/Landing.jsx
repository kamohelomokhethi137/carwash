import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  FaLeaf,
  FaCalendarAlt,
  FaInfoCircle,
} from 'react-icons/fa';

import bookIcon from '../assets/wired-outline-112-book-in-reveal.webp';
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
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

const imageAnimVariants = {
  hidden: { x: -30, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.33, 1, 0.68, 1]
    }
  }
};

function Landing() {
  const CarImage = useMemo(() => (
    <motion.div
      className="relative overflow-hidden"
      whileHover={{ scale: 0.98 }}
      transition={{ duration: 0.4 }}
    >
      <img
        src={car}
        alt="Car Wash"
        className="w-full h-full object-cover"
        loading="lazy"
        width="600"
        height="400"
      />
    </motion.div>
  ), []);

  const Buttons = useMemo(() => (
    <motion.div
      className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2"
      variants={itemVariants}
    >
      {/* Book Appointment Button */}
      <motion.button
        className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:shadow-xl transition-all duration-300 text-sm md:text-base"
        whileHover={{ y: -4, scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
      >
        <FaCalendarAlt className="text-lg" />
        <span>Book Appointment</span>
      </motion.button>

      {/* Service Details Button */}
      <motion.button
        className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-800 border border-gray-300 font-semibold rounded-lg shadow-sm hover:shadow-md transition-all duration-300 text-sm md:text-base"
        whileHover={{ y: -4, scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
      >
        <FaInfoCircle className="text-lg" />
        <span>Service Details</span>
      </motion.button>
    </motion.div>
  ), []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-8">
        <section className="w-full overflow-hidden pb-20">
          <div className="container mx-auto px-4 py-12 md:py-20 lg:py-24">
            <motion.div
              className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              viewport={{ once: true, margin: "-100px" }}
            >
              {/* Left Column - Image */}
              <motion.div
                className="w-full lg:w-1/2 order-2 lg:order-1"
                variants={imageAnimVariants}
              >
                {CarImage}
              </motion.div>

              {/* Right Column - Text & Buttons */}
              <motion.div
                className="w-full lg:w-1/2 space-y-4 md:space-y-6 order-1 lg:order-2"
                variants={containerVariants}
              >
                <motion.h3
                  className="text-sm md:text-base font-semibold text-blue-600 flex items-center"
                  variants={itemVariants}
                >
                  <FaLeaf className="mr-2" /> ECO-FRIENDLY SERVICES
                </motion.h3>

                <motion.h1
                  className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
                  variants={itemVariants}
                >
                  Your Car Deserves <span className="text-blue-600">Expert</span> Treatment
                </motion.h1>

                <motion.p
                  className="text-base md:text-lg text-gray-600"
                  variants={itemVariants}
                >
                  Our advanced cleaning technology removes 99% of dirt and contaminants while being gentle on your vehicle's finish. Choose from our range of premium wash packages.
                </motion.p>

                {Buttons}
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default React.memo(Landing);
