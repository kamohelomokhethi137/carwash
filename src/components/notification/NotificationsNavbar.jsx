import { motion } from 'framer-motion';
import { FiMenu, FiUser } from 'react-icons/fi';

const NotificationsNavbar = ({ toggleSidebar, userEmail }) => {
  const userName = userEmail
    ? userEmail.split('@')[0].replace(/[^a-zA-Z0-9]/g, ' ')
    : 'User';

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="fixed top-0 left-0 w-full h-16 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-md px-4 flex justify-between items-center z-40"
    >
      {/* Menu & Title */}
      <div className="flex items-center">
        <motion.button
          onClick={toggleSidebar}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="text-gray-700 hover:text-gray-900 focus:outline-none md:hidden mr-4"
          aria-label="Toggle sidebar"
        >
          <FiMenu size={24} />
        </motion.button>
        <h1 className="text-xl font-bold text-gray-900 tracking-wide">
          Notifications Dashboard
        </h1>
      </div>

      {/* User Info */}
      <motion.div
        className="flex items-center space-x-3"
        whileHover={{ scale: 1.02 }}
      >
        <span className="hidden sm:block text-sm font-semibold text-gray-800 truncate max-w-[140px]">
          {userName}
        </span>

        <motion.div
          className="relative"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shadow-md border border-gray-300">
            <FiUser className="text-gray-700" size={18} />
          </div>
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-400 border-2 border-white rounded-full animate-ping" />
        </motion.div>
      </motion.div>
    </motion.nav>
  );
};

export default NotificationsNavbar;
