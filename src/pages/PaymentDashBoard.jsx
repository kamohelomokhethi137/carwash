import React, { useState } from 'react';
import { FaMoneyCheckAlt, FaClock, FaUndoAlt } from 'react-icons/fa';
import { RiNotification3Line } from 'react-icons/ri';
import { CgProfile } from 'react-icons/cg';
import { RiMenuLine, RiCloseLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const payments = [
  { id: 1, customer: '89093', status: 'Completed', amount: 300, time: 'Today, 10:30 AM' },
  { id: 2, customer: '89093', status: 'Pending', amount: 150, time: 'Today, 9:15 AM' },
  { id: 3, customer: '89093', status: 'Refunded', amount: 75, time: 'Yesterday, 3:45 PM' },
  { id: 4, customer: '89093', status: 'Completed', amount: 500, time: '2 days ago' },
  { id: 5, customer: '89093', status: 'Completed', amount: 200, time: '3 days ago' },
  { id: 6, customer: '89093', status: 'Pending', amount: 80, time: '4 days ago' },
];

function PaymentDashBoard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const totalPayments = payments.filter(p => p.status === 'Completed').reduce((sum, p) => sum + p.amount, 0);
  const pendingPayments = payments.filter(p => p.status === 'Pending').reduce((sum, p) => sum + p.amount, 0);
  const refundedPayments = payments.filter(p => p.status === 'Refunded').reduce((sum, p) => sum + p.amount, 0);

  return (
    // Overall container: flex-col for header on top, content below
    <div className="flex flex-col min-h-screen bg-gray-100">

      {/* Overlay for small screens when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* GLOBAL TOP HEADER */}
      <header className="flex justify-between items-center bg-white shadow px-4 py-3 sm:px-6 z-20">
        <div className="flex items-center">
          {/* Hamburger/Close menu icon for small screens */}
          <button
            onClick={toggleSidebar}
            className="md:hidden mr-4 p-1 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isSidebarOpen ? (
              <RiCloseLine className="text-gray-600 text-2xl" />
            ) : (
              <RiMenuLine className="text-gray-600 text-2xl" />
            )}
          </button>
          {/* Brand/Logo - "Car Wash" */}
          <h1 className="text-xl font-bold text-[#1a1a1a] mr-4">Car Wash</h1>
          {/* Dashboard Title - appears only on medium screens and up */}
          <h2 className="text-lg md:text-xl font-semibold text-gray-800 hidden md:block md:pl-50">Payment Dashboard</h2>
        </div>

        <div className="flex items-center space-x-4">

          {/* User Profile / Initial */}
          <div className="flex items-center space-x-2">
            <div className="w-9 h-9 bg-blue-500 rounded-full flex items-center justify-center text-sm text-white font-bold uppercase ring-2 ring-blue-300">L</div>
            <span className="text-sm font-medium text-gray-700 hidden sm:inline">Lineo</span>
          </div>
        </div>
      </header>

      {/* Main Layout below the Global Header: Sidebar + Main Content */}
      <div className="flex flex-1 overflow-hidden"> {/* flex-1 makes this section take remaining height */}

        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 p-6 flex flex-col z-40
            transform transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            md:relative md:translate-x-0 md:h-auto`} // md:relative makes it flow naturally; md:h-auto for height
        >
          {/* Removed "Car Wash" as it's now in the global header */}
          <nav className="flex flex-col space-y-4 flex-grow">
            <Link to="/payments" onClick={() => setIsSidebarOpen(false)} className="text-sm text-blue-600 font-semibold block hover:text-blue-700 transition-colors">Payments</Link>
            <Link to="/history" onClick={() => setIsSidebarOpen(false)} className="text-sm text-gray-700 font-medium block hover:text-gray-900 transition-colors">History</Link>
            <Link to="/make-payment" onClick={() => setIsSidebarOpen(false)} className="text-sm text-gray-700 font-medium block hover:text-gray-900 transition-colors">Make Payment</Link>
            <Link to="/Payment-info" onClick={() => setIsSidebarOpen(false)} className="text-sm text-gray-700 font-medium block hover:text-gray-900 transition-colors">Payment info</Link>
          </nav>
          {/* Logout button in sidebar */}
          <div className="mt-auto pt-6 border-t border-gray-200">
            <button onClick={() => { /* Add logout logic here */ setIsSidebarOpen(false); }} className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors w-full justify-center py-2 rounded-md bg-gray-100 hover:bg-gray-200">
              <CgProfile className="mr-2 text-base" /> Logout
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col overflow-hidden"> {/* flex-1 allows it to take remaining width */}
          {/* The header content that was here is now part of the global header */}

          {/* Scrollable Content Area */}
          <div className="p-4 space-y-6 overflow-y-auto flex-1"> {/* flex-1 ensures it takes remaining height and scrolls */}
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white shadow rounded-lg p-4 flex items-center space-x-4">
                <FaMoneyCheckAlt className="text-green-500 text-3xl" />
                <div>
                  <p className="text-sm text-gray-500">Total Payments</p>
                  <p className="text-xl font-semibold text-gray-800">R{totalPayments}</p>
                </div>
              </div>
              <div className="bg-white shadow rounded-lg p-4 flex items-center space-x-4">
                <FaClock className="text-yellow-500 text-3xl" />
                <div>
                  <p className="text-sm text-gray-500">Pending</p>
                  <p className="text-xl font-semibold text-gray-800">R{pendingPayments}</p>
                </div>
              </div>
              <div className="bg-white shadow rounded-lg p-4 flex items-center space-x-4">
                <FaUndoAlt className="text-red-500 text-3xl" />
                <div>
                  <p className="text-sm text-gray-500">Refunded</p>
                  <p className="text-xl font-semibold text-gray-800">R{refundedPayments}</p>
                </div>
              </div>
            </div>

            {/* Recent Payments Table/List */}
            <div className="bg-white shadow rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Payments</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Time
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {payments.map(payment => (
                      <tr key={payment.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <p className="text-sm font-medium text-gray-800">{payment.customer}</p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <p className="text-sm text-gray-800">R{payment.amount}</p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              payment.status === 'Completed' ? 'bg-green-100 text-green-800' :
                              payment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                          }`}>
                            {payment.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {payment.time}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Optional: Pagination or "View All" button */}
              <div className="mt-4 flex justify-center">
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All Transactions</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default PaymentDashBoard;