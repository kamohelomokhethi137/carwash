import { useState, useEffect } from 'react';
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
    } else {
      const found = navItems.find(item => item.href === location.pathname);
      if (found) setActiveLink(found.name);
      else setActiveLink('');
    }
  }, [location.pathname]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { name: 'Home', href: '#home', icon: <img src={HomeIcon} alt="Home" className="inline mr-2 w-5 h-5" /> },
    { name: 'About', href: '/about', icon: <img src={AboutIcon} alt="About" className="inline mr-2 w-5 h-5" /> },
    { name: 'Services', href: '/services', icon: <MdMiscellaneousServices className="inline mr-2" /> },
    { name: 'Contact', href: '/contact', icon: <img src={ContactIcon} alt="Contact" className="inline mr-2 w-5 h-5" /> },
    // { name: 'Payments', href: '/paymentsDashBoard', icon: <RiContactsBook2Fill className="inline mr-2" /> },
    // { name: 'Notifications', href: '/notifications', icon: <img src={NotificationIcon} alt="Notifications" className="inline mr-2 w-5 h-5" /> },
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
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'backdrop-blur-md bg-[#f7fafc]/90 py-2 shadow-md' : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex-shrink-0 flex items-center cursor-pointer hover:scale-105 transition-transform duration-300"
            onClick={() => navigate('/')}
          >
            <span className="text-xl font-bold tracking-tight bg-gray-500 bg-clip-text text-transparent select-none">
              logo???
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className="relative group"
                >
                  <Link
                    to={item.href}
                    className={`flex items-center px-3 py-2 text-sm font-medium transition-colors duration-300 cursor-pointer ${
                      activeLink === item.name
                        ? 'text-[#1a202c]' : 'text-[#4a5568] hover:text-[#2d3748]'
                    }`}
                    onClick={() => handleLinkClick(item.name, item.href)}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                  {activeLink === item.name && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#2d3748] transition-all duration-300" />
                  )}
                </div>
              ))}
            </div>
            <button
              className="px-4 py-2 rounded-md bg-gradient-to-r from-[#a3bffa] to-[#c3dafe] text-[#1a202c] text-sm font-medium shadow-md hover:shadow-lg transition-all duration-300"
              onClick={() => navigate('/login')}
              aria-label="Sign In"
            >
              Sign In
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none cursor-pointer"
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
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-[#f7fafc]/95 backdrop-blur-sm mt-2 transition-all duration-300">
          <div className="px-2 pt-2 pb-4 space-y-2 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-3 py-3 rounded-md text-base font-medium cursor-pointer transition-all duration-300 ${
                  activeLink === item.name
                    ? 'bg-[#edf2f7] text-[#1a202c]' : 'text-[#4a5568] hover:bg-[#edf2f7] hover:text-[#2d3748]'
                }`}
                onClick={() => handleLinkClick(item.name, item.href)}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
            <button
              className="w-full mt-2 px-4 py-3 rounded-md bg-gradient-to-r from-[#a3bffa] to-[#c3dafe] text-[#1a202c] font-medium shadow-md hover:shadow-lg transition-all duration-300"
              onClick={() => {
                setIsOpen(false);
                navigate('/login');
              }}
            >
              Sign In
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;