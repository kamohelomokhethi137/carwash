import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// Dummy Navbar component for demonstration purposes.
// In a real application, you would import your actual Navbar.
const Navbar = () => {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center fixed w-full z-50">
      <div className="text-2xl font-bold text-blue-600">CarWashApp</div>
      <div className="space-x-4">
        {/* You can add your actual navigation links here */}
        <a href="/" className="text-gray-600 hover:text-blue-600">Home</a>
        <a href="/book" className="text-gray-600 hover:text-blue-600">Book Now</a>
      </div>
    </nav>
  );
};

const BookingPage = () => {
  const [numberPlate, setNumberPlate] = useState('');
  const [amount, setAmount] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const shouldReduceMotion = useReducedMotion();

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // In a real application, you would send this data to a backend or a booking service.
    // For now, we'll just log it to the console.
    console.log({
      numberPlate,
      amount,
      bookingDate,
    });

    // You might want to add a success message or clear the form here
    alert('Booking details submitted! Check console for data.');
    setNumberPlate('');
    setAmount('');
    setBookingDate('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
      {/* Navbar will typically be part of your main App layout, but included here for a runnable example */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md bg-white rounded-xl shadow-2xl p-8 sm:p-10 border border-blue-200"
      >
        <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-8">
          Book Your Car Wash
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="number-plate" className="block text-sm font-medium text-gray-700">
              Number Plate
            </label>
            <input
              type="text"
              id="number-plate"
              name="number-plate"
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
              placeholder="e.g., ABC 123"
              value={numberPlate}
              onChange={(e) => setNumberPlate(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
              Amount (e.g., $25.00)
            </label>
            <input
              type="text" // Using text to allow for currency symbols, can be 'number' if only digits are needed
              id="amount"
              name="amount"
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm  text-black"
              placeholder="e.g., 25.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="booking-date" className="block text-sm font-medium text-gray-700">
              Booking Date
            </label>
            <input
              type="date"
              id="booking-date"
              name="booking-date"
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm  text-black"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
            />
          </div>

          <motion.button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-xl shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
            whileHover={!shouldReduceMotion ? { scale: 1.02, boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)' } : {}}
            whileTap={!shouldReduceMotion ? { scale: 0.98 } : {}}
          >
            Book Now
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default BookingPage;
