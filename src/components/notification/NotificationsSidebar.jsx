import { motion, AnimatePresence } from 'framer-motion';
import {FiX,FiLogOut,} from 'react-icons/fi';

const NotificationsSidebar = ({ sidebarOpen, toggleSidebar, activeTab, setActiveTab }) => {
  const handleNavClick = (tab) => {
    setActiveTab(tab);
    if (window.innerWidth < 768) toggleSidebar();
  };

  const navItems = [
    { id: 'sendSms', label: 'Send SMS' },
    { id: 'bookings', label: 'Bookings'},
    { id: 'payments', label: 'Due Payments'}
  ];

  return (
    <AnimatePresence>
      {(sidebarOpen || window.innerWidth >= 768) && (
        <motion.aside
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 250, damping: 22 }}
          className="fixed md:relative z-30 inset-y-0 left-0 w-64 h-screen bg-gradient-to-br from-gray-100 to-white shadow-2xl rounded-tr-3xl rounded-br-3xl flex flex-col border-r border-gray-200"
        >
          {/* Mobile Header */}
          <div className="p-4 flex justify-between items-center border-b border-gray-200 md:hidden">

            <button
              onClick={toggleSidebar}
              className="text-gray-600 hover:text-gray-800 transition"
              aria-label="Close sidebar"
            >
              <FiX size={20} />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="px-4 pt-10 md:pt-24 space-y-2 flex-grow mb-10">

            {navItems.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.02, x: 4 }}
                transition={{ type: 'spring', stiffness: 250 }}
              >
                <button
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
                    activeTab === item.id
                      ? 'bg-gray-200 text-gray-900 shadow-md'
                      : 'text-gray-700 hover:bg-gray-100 hover:shadow-sm'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              </motion.div>
            ))}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-gray-200 mt-auto mb-6">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-100 text-red-600 hover:bg-red-200 rounded-lg transition"
            >
              <FiLogOut />
              Logout
            </motion.button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default NotificationsSidebar;
