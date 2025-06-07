import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import {
  FaCar,
  FaStar,
  FaBolt,
  FaLeaf,
  FaCalendarAlt,
  FaInfoCircle,
  FaTint,
  FaPaintRoller,
  FaSoap
} from 'react-icons/fa';
import car from '../assets/car-wash.svg'; // Adjust path if needed

function LandingPage() {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  const imageAnim = {
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Spacing below navbar */}
      <div className="pt-8">
        {/* Hero Section */}
        <section className="w-full overflow-hidden pb-20">
          <div className="container mx-auto px-4 py-12 md:py-20 lg:py-24">
            <motion.div
              className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12"
              initial="hidden"
              animate="visible"
              variants={container}
              viewport={{ once: true, margin: "-100px" }}
            >
              {/* Left Column - Image */}
              <motion.div
                className="w-full lg:w-1/2 order-2 lg:order-1"
                variants={imageAnim}
              >
                <motion.div
                  className="relative aspect-video lg:aspect-square rounded-xl lg:rounded-3xl overflow-hidden  "
                  whileHover={{ scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                >
                  <img
                    src={car}
                    alt="Car Wash"
                    className=" w-full h-full"
                    loading="lazy"
                  />
                </motion.div>
              </motion.div>

              {/* Right Column - Text & Buttons */}
              <motion.div
                className="w-full lg:w-1/2 space-y-4 md:space-y-6 order-1 lg:order-2"
                variants={container}
              >
                <motion.h3
                  className="text-sm md:text-base font-semibold text-blue-600 flex items-center"
                  variants={item}
                >
                  <FaLeaf className="mr-2" /> ECO-FRIENDLY SERVICES
                </motion.h3>

                <motion.h1
                  className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
                  variants={item}
                >
                  Your Car Deserves <span className="text-blue-600">Expert</span> Treatment
                </motion.h1>

                <motion.p
                  className="text-base md:text-lg text-gray-600"
                  variants={item}
                >
                  Our advanced cleaning technology removes 99% of dirt and contaminants while being gentle on your vehicle's finish. Choose from our range of premium wash packages.
                </motion.p>

                <motion.div
                  className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2"
                  variants={item}
                >
                  <motion.button
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm md:text-base"
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <FaCalendarAlt className="text-lg" /> Book Appointment
                  </motion.button>

                  <motion.button
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-800 font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 text-sm md:text-base"
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <FaInfoCircle className="text-lg" /> Service Details
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default LandingPage;
