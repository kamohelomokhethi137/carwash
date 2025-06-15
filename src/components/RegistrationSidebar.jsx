import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiUser, FiHome, FiList, FiLogOut } from 'react-icons/fi';

const Sidebar = ({ sidebarOpen, toggleSidebar, activeTab, setActiveTab, userEmail }) => {
  const userName = userEmail ? userEmail.split('@')[0] : 'User';

  const handleNavClick = (tab) => {
    setActiveTab(tab);
    if (window.innerWidth < 768) toggleSidebar();
  };

  const navItems = [
    { id: 'register', label: 'Register Car', icon: <FiHome size={18} /> },
    { id: 'registrations', label: 'View Registrations', icon: <FiList size={18} /> }
  ];

  return (
    <AnimatePresence>
      {(sidebarOpen || window.innerWidth >= 768) && (
        <motion.aside
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 250, damping: 22 }}
          className="fixed md:relative z-30 inset-y-0 left-0 w-64 bg-gradient-to-br from-gray-100 to-white shadow-2xl rounded-tr-3xl rounded-br-3xl flex flex-col border-r border-gray-200"
        >
          {/* Top bar for mobile */}
          <div className="p-4 flex justify-between items-center border-b border-gray-200 md:hidden">
            <h2 className="text-lg font-semibold text-gray-800 tracking-wide">Menu</h2>
            <button
              onClick={toggleSidebar}
              className="text-gray-600 hover:text-gray-800 transition"
              aria-label="Close sidebar"
            >
              <FiX size={20} />
            </button>
          </div>

          {/* Profile */}
          <motion.div
            className="p-5 border-b border-gray-200 flex items-center gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="w-11 h-11 rounded-full bg-gray-300 text-white flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.1 }}
            >
              <FiUser size={20} className="text-gray-700" />
            </motion.div>
            <div>
              <p className="font-semibold text-gray-800">{userName}</p>
              <p className="text-xs text-gray-500 truncate">{userEmail}</p>
            </div>
          </motion.div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <motion.li
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
                </motion.li>
              ))}
            </ul>
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-gray-200">
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

export default Sidebar;
