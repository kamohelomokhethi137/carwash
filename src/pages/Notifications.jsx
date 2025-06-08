import React from 'react';
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
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200">
        <div className="p-6">
          <h1 className="text-lg font-bold text-[#1a1a1a] mb-6">CyberSmart</h1>
          <nav className="space-y-4">
            <a href="#" className="text-sm text-gray-700 font-medium block">Partner Dashboard</a>
            <a href="#" className="text-sm text-gray-700 font-medium block">Subscriptions/Finance</a>
            <a href="#" className="text-sm text-gray-700 font-medium block">CertOS</a>
            <a href="#" className="text-sm text-gray-700 font-medium block">Partner Settings</a>
          </nav>
        </div>
      </aside>

      {/* Main Dashboard */}
      <main className="flex-1">
        <div className="flex justify-between items-center bg-white shadow px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-800">Partner Dashboard</h2>
          <div className="flex items-center space-x-4">
            <button className="relative">
              <Bell className="text-gray-600" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm text-white font-bold">N</div>
            <span className="text-sm font-medium text-gray-700">Natasha</span>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-5 gap-4 mb-6">
            <div className="bg-white shadow rounded p-4 text-center">
              <p className="text-sm text-gray-500">ORGANISATIONS ENROLLED</p>
              <p className="text-xl font-bold">8</p>
            </div>
            <div className="bg-white shadow rounded p-4 text-center">
              <p className="text-sm text-gray-500">DEVICE OWNERS</p>
              <p className="text-xl font-bold">124</p>
            </div>
            <div className="bg-white shadow rounded p-4 text-center">
              <p className="text-sm text-gray-500">DEVICES INSTALLED</p>
              <p className="text-xl font-bold">195</p>
            </div>
            <div className="bg-white shadow rounded p-4 text-center">
              <p className="text-sm text-gray-500">ORGANISATIONS PASSING</p>
              <p className="text-xl font-bold">✓</p>
            </div>
          </div>

          <div className="bg-white shadow rounded p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Notifications</h3>
              <RxQuestionMarkCircled className="text-gray-400" />
            </div>
            <div className="space-y-4">
              {notificationsData.map((notification) => (
                <div key={notification.id} className="flex justify-between">
                  <div className="flex items-start">
                    <span className="h-2 w-2 mt-2 rounded-full bg-blue-500 mr-3"></span>
                    <div>
                      <p className="text-sm text-gray-800">{notification.text}</p>
                      <p className="text-xs text-gray-500">{notification.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-right">
              <button className="text-sm text-blue-600 flex items-center hover:text-blue-800">
                See all notifications <FaArrowRight className="ml-2" size={12} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


export default Notifications;
