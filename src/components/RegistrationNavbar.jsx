import { motion } from 'framer-motion';
import { FiMenu, FiUser } from 'react-icons/fi';

const RegistrationNavbar = ({ toggleSidebar, userEmail }) => {
  const userName = userEmail ? userEmail.split('@')[0] : 'User';

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="bg-gradient-to-r from-gray-100 to-white shadow-lg p-4 flex justify-between items-center sticky top-0 z-30 backdrop-blur-md border-b border-gray-200 rounded-b-xl"
    >
      {/* Left: Menu + Title */}
      <div className="flex items-center">
        <motion.button
          onClick={toggleSidebar}
          whileHover={{ rotate: 90 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="mr-4 text-gray-700 hover:text-gray-900 focus:outline-none md:hidden"
          aria-label="Toggle sidebar"
        >
          <FiMenu size={24} />
        </motion.button>
        <h1 className="text-xl font-bold text-gray-800 tracking-wide">Car Registration</h1>
      </div>

      {/* Right: Avatar + Name */}
      <div className="flex items-center space-x-3">
        <span className="hidden md:block text-sm font-medium text-gray-700">{userName}</span>
        <motion.div
          className="w-10 h-10 rounded-full bg-gray-300 text-white flex items-center justify-center shadow-md"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <FiUser className="text-gray-800" size={20} />
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default RegistrationNavbar;
