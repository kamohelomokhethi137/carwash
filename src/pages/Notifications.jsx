import React, { useState } from 'react';
import { RxQuestionMarkCircled } from 'react-icons/rx';
import { FaArrowRight } from 'react-icons/fa';
import { Bell } from 'lucide-react';

const notificationsData = [
  { id: 1, text: '3 devices are failing security checks', time: '4h ago' },
  { id: 2, text: '6 users have unsigned policies', time: '5h ago' },
  { id: 3, text: 'Your CyberEssentials certification is due for renewal in 30 days', time: '1d ago' },
  { id: 4, text: 'DC Holdings has 5 security issues', time: '3d ago' },
];

function Notifications() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      
      {/* Sidebar */}
      <aside className={`w-full md:w-64 bg-white border-b md:border-r border-gray-200 p-6 md:h-full ${
        showSidebar ? 'block' : 'hidden md:block'
      }`}>
        <h1 className="text-lg font-bold text-[#1a1a1a] mb-6">Car Wash</h1>
        <nav className="space-y-4">
          <a href="#" className="text-sm text-gray-700 font-medium block">Payments</a>
          <a href="#" className="text-sm text-gray-700 font-medium block">Ready Cars</a>
          <a href="#" className="text-sm text-gray-700 font-medium block">Unwashed Cars</a>
        </nav>
      </aside>

      {/* Main Dashboard */}
      <main className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="flex justify-between items-center bg-white shadow px-4 py-3">
          <div className="flex items-center space-x-4">
            {/* Hamburger Menu for small screens */}
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
              <Bell className="text-gray-600" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm text-white font-bold">L</div>
            <span className="text-sm font-medium text-gray-700 hidden sm:inline">Lineo</span>
          </div>
        </div>

        {/* Main Content,  className="bg-white shadow rounded p-4 w-full max-w-xl mx-auto" */}
        <div className="p-4 overflow-y-auto">
          <div>
            {/* this is a place holder for the main cotent*/}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Notifications;
