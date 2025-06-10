import React, { useState, useEffect } from 'react';
import { RxQuestionMarkCircled } from 'react-icons/rx'; 
import { FaArrowRight, FaMoneyBillWave, FaEnvelope, FaCar, FaSignOutAlt } from 'react-icons/fa'; 
import { Bell } from 'lucide-react'; 
import PaymentsPage from '../pages/PaymentsPage'; 
import SendSms from '../pages/SendSms';       

function Notifications() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeContent, setActiveContent] = useState('notifications'); 
  const [isLoaded, setIsLoaded] = useState(false); // State for main page animation trigger
  const [iconsVisible, setIconsVisible] = useState(false); // New state for icon animation trigger

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
      case 'unwashedCars':
        return (
          <div className="bg-white shadow rounded p-4 w-full max-w-xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Unwashed Cars</h3>
            <p className="text-gray-600">Content for Unwashed Cars goes here.</p>
          </div>
        );
      case 'notifications': 
      default:
        return (
          <div className="bg-white shadow rounded p-4 w-full max-w-xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Welcome to Notifications Dashboard</h3>
            <p className="text-gray-600">Select an option from the sidebar to view details.</p>
          </div>
        );
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    alert('Logged out successfully!'); 
    console.log('User logged out.');
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`w-full md:w-64 bg-white border-b md:border-r border-gray-200 p-6 md:h-full
                   flex flex-col justify-between
                   transition-transform duration-500 ease-out ${ // Sidebar slide-in
                     isLoaded ? 'translate-x-0' : '-translate-x-full'
                   } ${showSidebar ? 'block' : 'hidden md:flex'}`}
      >
        <div>
          <h1 className="flex items-center space-x-2 text-lg font-bold text-[#1a1a1a] mb-6">
            <FaCar className={`h-6 w-6 transition-opacity duration-300 ${iconsVisible ? 'opacity-100' : 'opacity-0'}`} /> {/* Icon with opacity transition */}
            <span className='text-4xl'>Car Wash</span>
          </h1>
          <nav className="space-y-4">
            <a
              href="#"
              className={`p-7 flex items-center space-x-3 text-sm font-medium ${activeContent === 'payments' ? 'text-blue-600' : 'text-gray-700'}`}
              onClick={(e) => {
                e.preventDefault();
                setActiveContent('payments');
                if (window.innerWidth < 768) {
                  setShowSidebar(false);
                }
              }}
            >
              <FaMoneyBillWave className={`h-5 w-5 transition-opacity duration-300 delay-100 ${iconsVisible ? 'opacity-100' : 'opacity-0'}`} /> {/* Icon with opacity transition and delay */}
              <span>DUE PAYMENTS</span>
            </a>
            <a
              href="#"
              className={`m-7 flex items-center space-x-3 text-sm font-medium ${activeContent === 'sendSms' ? 'text-blue-600' : 'text-gray-700'}`}
              onClick={(e) => {
                e.preventDefault();
                setActiveContent('sendSms');
                if (window.innerWidth < 768) {
                  setShowSidebar(false);
                }
              }}
            >
              <FaEnvelope className={`h-5 w-5 transition-opacity duration-300 delay-200 ${iconsVisible ? 'opacity-100' : 'opacity-0'}`} /> {/* Icon with opacity transition and delay */}
              <span>SEND SMS</span>
            </a>
            <a
              href="#"
              className={`md:hidden flex items-center space-x-3 text-sm font-medium ${activeContent === 'unwashedCars' ? 'text-blue-600' : 'text-gray-700'}`}
              onClick={(e) => {
                e.preventDefault();
                setActiveContent('unwashedCars');
                if (window.innerWidth < 768) {
                  setShowSidebar(false);
                }
              }}
            >
   
              Unwashed Cars
            </a>
          </nav>
        </div>

        <div className="mt-8">
          <a
            href="#"
            className="flex items-center space-x-3 text-sm font-medium text-red-600 hover:text-red-800"
            onClick={handleLogout}
          >
            <FaSignOutAlt className={`h-5 w-5 transition-opacity duration-300 delay-400 ${iconsVisible ? 'opacity-100' : 'opacity-0'}`} /> {/* Icon with opacity transition and delay */}
            <span>Logout</span>
          </a>
        </div>
      </aside>

      {/* Main Dashboard Content Area */}
      <main
        className={`flex-1 flex flex-col
                   transition-opacity duration-700 ease-out ${ // Main content fade-in
                     isLoaded ? 'opacity-100' : 'opacity-0'
                   }`}
      >
        {/* Top Bar */}
        <div className="flex justify-between items-center bg-white shadow px-4 py-3">
          <div className="flex items-center space-x-4">
            <button
              className="md:hidden text-gray-600"
              onClick={() => setShowSidebar(!showSidebar)}
            >
              ☰
            </button>
            <h2 className="text-lg md:text-xl font-semibold text-gray-800">Notifications Dashboard</h2>
          </div>

          <div className="flex items-center space-x-4">
            <button className="relative">
              <Bell className="h-8 w-8 text-gray-600" />
              <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold">9</span>
            </button>
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm text-white font-bold">L</div>
            <span className="text-sm font-medium text-gray-700 hidden sm:inline">Lineo</span>
          </div>
        </div>

        {/* Dynamic Main Content */}
        <div className="p-4 overflow-y-auto">
          {renderMainContent()}
        </div>
      </main>
    </div>
  );
}

export default Notifications;