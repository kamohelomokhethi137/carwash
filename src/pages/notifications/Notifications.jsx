import React, { useState, useEffect } from 'react';
import { Bell, Car, DollarSign, Mail, CalendarDays, LogOut, X, Search } from 'lucide-react';
import SendSms from './SendSms'; 
import PaymentsPage from './paymentPage';
import BookingsPage from './Bookings'; 

function Notifications() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeContent, setActiveContent] = useState('notifications');
  const [isLoaded, setIsLoaded] = useState(false); // State for main page animation trigger
  const [iconsVisible, setIconsVisible] = useState(false); // New state for icon animation trigger
  const [showLogoutModal, setShowLogoutModal] = useState(false); // State for logout confirmation modal

  useEffect(() => {
    // Set isLoaded to true after a short delay for main layout animations
    const mainLoadTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 100); // Small delay for the initial layout to settle

    // Set iconsVisible to true after an additional delay
    const iconLoadTimer = setTimeout(() => {
      setIconsVisible(true);
    }, 600); // Delay icons by 600ms after component mount (or 500ms after main layout starts moving)

    // Cleanup timers on component unmount
    return () => {
      clearTimeout(mainLoadTimer);
      clearTimeout(iconLoadTimer);
    };
  }, []);

  const renderMainContent = () => {
    switch (activeContent) {
      case 'payments':
        return <PaymentsPage />;
      case 'sendSms':
        return <SendSms />;
      case 'bookings':
        return <BookingsPage />;
      case 'notifications':
      default:
        return (
          <div className="bg-white shadow rounded-lg p-6 w-full max-w-2xl mx-auto animate-fadeIn">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
              Welcome to Notifications Dashboard
            </h3>
            <p className="text-gray-700 leading-relaxed">
              This dashboard provides a centralized place to manage various aspects of your car wash operations.
              Use the sidebar on the left to navigate between different sections such as "Due Payments", "Send SMS",
              and "Bookings". Each section offers specific functionalities to help you efficiently manage your business.
            </p>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg shadow-sm flex items-center space-x-3">
                <DollarSign className="h-6 w-6 text-blue-600" />
                <p className="text-blue-800 font-medium">Manage all outstanding payments.</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg shadow-sm flex items-center space-x-3">
                <Mail className="h-6 w-6 text-green-600" />
                <p className="text-green-800 font-medium">Send marketing or reminder SMS.</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg shadow-sm flex items-center space-x-3">
                <CalendarDays className="h-6 w-6 text-purple-600" />
                <p className="text-purple-800 font-medium">Handle all customer bookings.</p>
              </div>
            </div>
            <p className="mt-8 text-gray-600 text-sm">
              Click on any of the options in the sidebar to explore more details and functionalities.
            </p>
          </div>
        );
    }
  };

  const handleLogout = () => {
    // In a real application, you would perform actual logout logic here
    console.log('User logged out.');
    setShowLogoutModal(false); // Close modal after action
    // Redirect to login page or update auth state
  };

  // Custom Modal for Logout Confirmation
  const LogoutConfirmationModal = () => {
    if (!showLogoutModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm transform transition-all scale-100 animate-slideUp">
          <div className="flex justify-between items-center mb-4 border-b pb-2">
            <h4 className="text-lg font-semibold text-gray-800">Confirm Logout</h4>
            <button onClick={() => setShowLogoutModal(false)} className="text-gray-500 hover:text-gray-700">
              <X className="h-5 w-5" />
            </button>
          </div>
          <p className="text-gray-700 mb-6">Are you sure you want to log out?</p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setShowLogoutModal(false)}
              className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition duration-300"
            >
              Cancel
            </button>
            <button
              onClick={handleLogout}
              className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100 font-inter">
      {/* Sidebar */}
      <aside
        className={`w-full md:w-64 bg-white border-b md:border-r border-gray-200 p-6 md:h-full
                    flex flex-col justify-between
                    transition-transform duration-500 ease-out rounded-lg shadow-lg m-4
                    ${isLoaded ? 'translate-x-0' : '-translate-x-full'} ${showSidebar ? 'block' : 'hidden md:flex'}`}
      >
        <div>
          <h1 className="flex items-center space-x-3 text-2xl font-bold text-[#1a1a1a] mb-8">
            <Car className={`h-8 w-8 text-blue-600 transition-opacity duration-300 ${iconsVisible ? 'opacity-100' : 'opacity-0'}`} />
            <span className='text-4xl'>Car Wash</span>
          </h1>
          <nav className="space-y-4">
            <a
              href="#"
              className={`relative p-3 flex items-center space-x-3 text-lg font-medium rounded-lg transition-colors duration-200
                          ${activeContent === 'payments' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}
              onClick={(e) => {
                e.preventDefault();
                setActiveContent('payments');
                if (window.innerWidth < 768) {
                  setShowSidebar(false);
                }
              }}
            >
              <DollarSign className={`h-6 w-6 transition-opacity duration-300 delay-100 ${iconsVisible ? 'opacity-100' : 'opacity-0'}`} />
              <span>DUE PAYMENTS</span>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">9</span>
            </a>
            <a
              href="#"
              className={`relative p-3 flex items-center space-x-3 text-lg font-medium rounded-lg transition-colors duration-200
                          ${activeContent === 'sendSms' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}
              onClick={(e) => {
                e.preventDefault();
                setActiveContent('sendSms');
                if (window.innerWidth < 768) {
                  setShowSidebar(false);
                }
              }}
            >
              <Mail className={`h-6 w-6 transition-opacity duration-300 delay-200 ${iconsVisible ? 'opacity-100' : 'opacity-0'}`} />
              <span>SEND SMS</span>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">9</span>
            </a>
            <a
              href="#"
              className={`relative p-3 flex items-center space-x-3 text-lg font-medium rounded-lg transition-colors duration-200
                          ${activeContent === 'bookings' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}
              onClick={(e) => {
                e.preventDefault();
                setActiveContent('bookings');
                if (window.innerWidth < 768) {
                  setShowSidebar(false);
                }
              }}
            >
              <CalendarDays className={`h-6 w-6 transition-opacity duration-300 delay-300 ${iconsVisible ? 'opacity-100' : 'opacity-0'}`} />
              <span>Bookings</span>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">9</span>
            </a>
          </nav>
        </div>

        <div className="mt-8 pt-4 border-t border-gray-200">
          <a
            href="#"
            className="flex items-center space-x-3 text-lg font-medium text-red-600 hover:text-red-800 p-3 rounded-lg hover:bg-red-50 transition-colors duration-200"
            onClick={(e) => {
              e.preventDefault();
              setShowLogoutModal(true); // Show the custom modal
            }}
          >
            <LogOut className={`h-6 w-6 transition-opacity duration-300 delay-400 ${iconsVisible ? 'opacity-100' : 'opacity-0'}`} />
            <span>Logout</span>
          </a>
        </div>
      </aside>

      {/* Main Dashboard Content Area */}
      <main
        className={`flex-1 flex flex-col p-4
                    transition-opacity duration-700 ease-out rounded-lg m-4
                    ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* Top Bar */}
        <div className="flex justify-between items-center bg-white shadow-md px-6 py-4 rounded-lg mb-4">
          <div className="flex items-center space-x-4">
            <button
              className="md:hidden text-gray-600 text-2xl p-2 rounded-md hover:bg-gray-100 transition-colors"
              onClick={() => setShowSidebar(!showSidebar)}
              aria-label="Toggle Sidebar"
            >
              ☰
            </button>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800">Notifications Dashboard</h2>
          </div>

          <div className="flex items-center space-x-6">
            <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Bell className="h-7 w-7 text-gray-600" />
              <span className="absolute top-0 right-0 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold border-2 border-white">9</span>
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-md text-white font-bold shadow-md">L</div>
              <span className="text-md font-medium text-gray-700 hidden sm:inline">Lineo</span>
            </div>
          </div>
        </div>

        {/* Dynamic Main Content */}
        <div className="flex-1 overflow-y-auto pb-4">
          {renderMainContent()}
        </div>
      </main>

      {/* Logout Confirmation Modal */}
      <LogoutConfirmationModal />
    </div>
  );
}

export default Notifications;
