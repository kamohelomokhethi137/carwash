import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdMiscellaneousServices } from 'react-icons/md';
import { RiContactsBook2Fill } from 'react-icons/ri';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import HomeIcon from '../assets/home.webp'; 
import AboutIcon from '../assets/wired-outline-21-avatar-hover-looking-around.webp'; 
import NotificationIcon from '../assets/wired-outline-3095-notification-letter-in-reveal.webp';
import ContactIcon from '../assets/wired-outline-177-envelope-send-in-unfold.webp';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (location.pathname === '/notifications') {
      setActiveLink('Notifications');
    } else if (location.pathname === '/') {
      setActiveLink('Home'); 
    }
  }, [location.pathname]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
   { name: 'Home', href: '#home', icon: <img src={HomeIcon} alt="Home" className="inline mr-2 w-5 h-5" /> },
    { name: 'About', href: '/about', icon: <img src={AboutIcon} alt="Home" className="inline mr-2 w-5 h-5" /> },
    { name: 'Services', href: '/services', icon: <MdMiscellaneousServices className="inline mr-2" /> },
    { name: 'Contact', href: '/contact', icon:<img src={ContactIcon} alt="Home" className="inline mr-2 w-5 h-5" /> },
    { name: 'Notifications', href: '/notifications', icon: <img src={NotificationIcon} alt="Home" className="inline mr-2 w-5 h-5" /> }
  ];

  const handleLinkClick = (name, path) => {
    setActiveLink(name);
    setIsOpen(false);

    if (path && path.startsWith('/')) {
      navigate(path);
    } else if (path && path.startsWith('#')) {
      const id = path.substring(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <motion.nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-md bg-[#f7fafc]/90 py-2 shadow-md'
          : 'bg-transparent py-4'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0 flex items-center"
          >
            <Link 
              to="/"
              className="text-xl font-bold tracking-tight bg-gray-500 bg-clip-text text-transparent"
            >
              logo??? 
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  className="relative"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.href.startsWith('/') ? (
                    <Link
                      to={item.href}
                      className={`flex items-center px-3 py-2 text-sm font-medium transition-colors duration-300 ${
                        activeLink === item.name
                          ? 'text-[#1a202c]'
                          : 'text-[#4a5568] hover:text-[#2d3748]'
                      }`}
                      onClick={() => handleLinkClick(item.name, item.href)}
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      className={`flex items-center px-3 py-2 text-sm font-medium transition-colors duration-300 ${
                        activeLink === item.name
                          ? 'text-[#1a202c]'
                          : 'text-[#4a5568] hover:text-[#2d3748]'
                      }`}
                      onClick={() => handleLinkClick(item.name, item.href)}
                    >
                      {item.icon}
                      {item.name}
                    </a>
                  )}
                  {activeLink === item.name && (
                    <motion.span
                      layoutId="activeLink"
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-[#2d3748]"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 rounded-md bg-gradient-to-r from-[#a3bffa] to-[#c3dafe] text-[#1a202c] text-sm font-medium shadow-md hover:shadow-xl transition-all duration-300"
              onClick={() => navigate('/login')}
            >
              Sign In
            </motion.button>
          </div>

          {/* Mobile Menu Toggle - Moved to the end of the flex container */}
          <div className="md:hidden flex items-center">
            <motion.button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6 text-[#2d3748]"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Added margin-top to prevent overlapping */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-[#f7fafc]/95 backdrop-blur-sm mt-2" 
          >
            <div className="px-2 pt-2 pb-4 space-y-2 sm:px-3">
              {navItems.map((item, index) => (
                item.href.startsWith('/') ? (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center px-3 py-3 rounded-md text-base font-medium ${
                      activeLink === item.name
                        ? 'bg-[#edf2f7] text-[#1a202c]'
                        : 'text-[#4a5568] hover:bg-[#edf2f7] hover:text-[#2d3748]'
                    }`}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                    onClick={() => handleLinkClick(item.name, item.href)}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                ) : (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-3 py-3 rounded-md text-base font-medium ${
                      activeLink === item.name
                        ? 'bg-[#edf2f7] text-[#1a202c]'
                        : 'text-[#4a5568] hover:bg-[#edf2f7] hover:text-[#2d3748]'
                    }`}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                    onClick={() => handleLinkClick(item.name, item.href)}
                  >
                    {item.icon}
                    {item.name}
                  </motion.a>
                )
              ))}
              <motion.button
                className="w-full mt-2 px-4 py-3 rounded-md bg-gradient-to-r from-[#a3bffa] to-[#c3dafe] text-[#1a202c] font-medium shadow-md"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.1 + 0.3 }}
                onClick={() => navigate('/login')}
              >
                Sign In
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;