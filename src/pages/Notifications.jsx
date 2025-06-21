import React, { useState, useEffect } from 'react';
import { Bell, Car, DollarSign, Mail, CalendarDays, LogOut, X, Search } from 'lucide-react';

// PaymentsPage component with responsive layout
const PaymentsPage = () => {
  const paymentsData = [
    {
      numberPlate: 'CA 123-456',
      driverName: 'Lineo Sehlabo',
      phoneNumber: '52345678',
      amountDue: 150.00,
    },
    {
      numberPlate: 'GP 789-012',
      driverName: 'Lerato Sebilo',
      phoneNumber: '53456789',
      amountDue: 75.50,
    },
    {
      numberPlate: 'NW 345-678',
      driverName: 'Limakatso Lirontsho',
      phoneNumber: '64567890',
      amountDue: 200.00,
    },
    {
      numberPlate: 'EC 901-234',
      driverName: 'Joyce Miller',
      phoneNumber: '65678901',
      amountDue: 120.00,
    },
  ];

  return (
    <div className="bg-white shadow rounded-lg p-6 w-full max-w-3xl mx-auto animate-fadeIn">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">Payments Due</h3>

      {paymentsData.length > 0 ? (
        <>
          {/* Table View (for medium and larger screens) */}
          <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
            <table className="min-w-full bg-white divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Number Plate</th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Driver Full Name</th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Phone Number</th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Amount Due (M)</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paymentsData.map((data, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-800">{data.numberPlate}</td>
                    <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-800">{data.driverName}</td>
                    <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-800">{data.phoneNumber}</td>
                    <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-800">M{data.amountDue.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* List View (for small screens) */}
          <div className="md:hidden grid grid-cols-1 gap-4">
            {paymentsData.map((data, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Payment Details</h4>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">Number Plate:</span> {data.numberPlate}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">Driver Name:</span> {data.driverName}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">Phone:</span> {data.phoneNumber}
                </p>
                <p className="text-sm text-gray-600 flex items-center mt-2">
                  <DollarSign className="h-4 w-4 text-green-500 mr-2" />
                  <span>Amount Due: M{data.amountDue.toFixed(2)}</span>
                </p>
                <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end space-x-3">
                  <button className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200">View Details</button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-gray-600 text-center py-8">No payments due.</p>
      )}

      <p className="mt-6 text-sm text-gray-600">
        This section displays the outstanding payments.
      </p>
      <div className="mt-8 pt-4 border-t border-gray-200 flex justify-end">
        <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
          Process Payments
        </button>
      </div>
    </div>
  );
};

const SendSms = () => {
  const [searchPlate, setSearchPlate] = useState('');
  const [foundDriver, setFoundDriver] = useState(null);
  const [smsMessage, setSmsMessage] = useState('');
  const [messageSent, setMessageSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // --- IMPORTANT: This is the URL of your new backend server ---
  // The frontend now talks to YOUR backend, which then talks to Africa's Talking.
  const BACKEND_URL = 'http://localhost:5000/api/send-whatsapp'; // Matches the endpoint in server.js

  const drivers = [
    {
      numberPlate: 'CA 123-456',
      driverName: 'Lineo Sehlabo',
      phoneNumber: '+26652345678', // IMPORTANT: Use full international format
      amountDue: 150.00,
    },
    {
      numberPlate: 'GP 789-012',
      driverName: 'Lerato Sebilo',
      phoneNumber: '+26653456789',
      amountDue: 75.50,
    },
    {
      numberPlate: 'NW 345-678',
      driverName: 'Limakatso Lirontsho',
      phoneNumber: '+26664567890',
      amountDue: 200.00,
    },
    {
      numberPlate: 'EC 901-234',
      driverName: 'Monaheng Phakoana',
      phoneNumber: '+26659908114', // Assuming this is your test number
      amountDue: 120.00,
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    setMessageSent(false);
    setError('');
    const normalizedSearch = searchPlate.trim().toUpperCase();
    const driver = drivers.find(d => d.numberPlate.toUpperCase() === normalizedSearch);
    setFoundDriver(driver);
    if (!driver) {
      alert(`No driver found with number plate: ${searchPlate}`);
    }
  };

  const handleSendSms = async () => {
    if (!foundDriver) {
      alert('No driver selected to send message to.');
      return;
    }
    if (smsMessage.trim() === '') {
      alert('Please enter a message to send.');
      return;
    }

    setLoading(true);
    setMessageSent(false);
    setError('');

    try {
      // Make the POST request to YOUR BACKEND SERVER
      const response = await axios.post(BACKEND_URL, {
        phoneNumber: foundDriver.phoneNumber, // Your backend expects 'phoneNumber'
        messageBody: smsMessage,              // Your backend expects 'messageBody'
        // API key and username are now handled securely by your backend
      });

      console.log('WhatsApp message sent response (from backend):', response.data);
      setMessageSent(true);
      setSmsMessage('');
      alert(`WhatsApp message successfully sent to ${foundDriver.driverName}. Check console.`);

    } catch (err) {
      console.error('Error sending WhatsApp message from frontend:', err);
      // Display a user-friendly error message
      if (err.response && err.response.data && err.response.data.error) {
        setError(`Failed to send message: ${err.response.data.error}`);
      } else if (err.response) {
         setError(`Failed to send message. Server responded with status ${err.response.status}`);
      }
      else {
        setError(`Failed to send message: ${err.message}. Check if backend is running.`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow rounded p-4 sm:p-6 w-full max-w-2xl mx-auto">
      <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">Send Message to Driver</h3>

      {/* Search Section */}
      <form onSubmit={handleSearch} className="mb-6 p-4 border rounded bg-gray-50">
        <label htmlFor="searchPlate" className="block text-sm font-medium text-gray-700 mb-2">
          Search by Number Plate:
        </label>
        <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-3 sm:space-y-0">
          <input
            type="text"
            id="searchPlate"
            className="flex-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base p-2 text-gray-950"
            value={searchPlate}
            onChange={(e) => setSearchPlate(e.target.value)}
            placeholder="e.g., CA 123-456"
            required
          />
          <button
            type="submit"
            className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Search
          </button>
        </div>
      </form>

      {/* Driver Information and SMS Section */}
      {foundDriver ? (
        <div className="p-4 border rounded bg-blue-50 mb-6">
          <h4 className="text-lg font-semibold text-blue-800 mb-2">Driver Found:</h4>
          <p className="text-gray-700 text-sm sm:text-base">
            <strong>Name:</strong> {foundDriver.driverName}<br />
            <strong>Phone:</strong> {foundDriver.phoneNumber}<br />
            <strong>Number Plate:</strong> {foundDriver.numberPlate}
          </p>

          <div className="mt-4">
            <label htmlFor="smsMessage" className="block text-sm font-medium text-gray-700 mb-2">
              Message:
            </label>
            <textarea
              id="smsMessage"
              rows="4"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base p-2 text-gray-950"
              value={smsMessage}
              onChange={(e) => setSmsMessage(e.target.value)}
              placeholder="Type your message here..."
            ></textarea>
            <button
              onClick={handleSendSms}
              className="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
            {messageSent && (
              <p className="mt-2 text-sm text-green-700">message sent successfully!</p>
            )}
            {error && (
              <p className="mt-2 text-sm text-red-600">Error: {error}</p>
            )}
          </div>
        </div>
      ) : (
        <p className="text-gray-600 text-center py-4 text-sm sm:text-base">Search for a driver by their number plate to send a message.</p>
      )}
    </div>
  );
}

const BookingsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [bookings, setBookings] = useState([
    { id: 1, name: 'John Doe', plate: 'CA123-456', date: '2025-07-20', time: '09:30 AM', service: 'Full Wash', makeModel: 'Toyota Hiace', owner: 'John Doe', phone: '57736313' },
    { id: 2, name: 'Jane Smith', plate: 'GP789-012', date: '2025-07-20', time: '10:00 AM', service: 'Exterior Wash', makeModel: 'Honda Accord', owner: 'Jane Smith', phone: '57736314' },
    { id: 3, name: 'Peter Jones', plate: 'ND345-678', date: '2025-07-21', time: '11:00 AM', service: 'Full Wash & Polish', makeModel: 'BMW 3 Series', owner: 'Peter Jones', phone: '57736315' },
    { id: 4, name: 'Alice Brown', plate: 'MP901-234', date: '2025-07-21', time: '01:30 PM', service: 'Interior Cleaning', makeModel: 'Mercedes C-Class', owner: 'Alice Brown', phone: '57736316' },
    { id: 5, name: 'David Green', plate: 'EC567-890', date: '2025-07-22', time: '02:00 PM', service: 'Engine Bay Cleaning', makeModel: 'Ford Ranger', owner: 'David Green', phone: '57736317' },
    { id: 6, name: 'Sarah White', plate: 'NW111-222', date: '2025-07-22', time: '03:00 PM', service: 'Full Wash', makeModel: 'Volkswagen Polo', owner: 'Sarah White', phone: '57736318' },
    { id: 7, name: 'Michael Black', plate: 'LP333-444', date: '2025-07-23', time: '09:00 AM', service: 'Tyre Shine', makeModel: 'Nissan NP200', owner: 'Michael Black', phone: '57736319' },
    { id: 8, name: 'Emily Grey', plate: 'FS555-666', date: '2025-07-23', time: '10:30 AM', service: 'Full Wash', makeModel: 'Hyundai i20', owner: 'Emily Grey', phone: '57736320' },
    { id: 9, name: 'Chris Blue', plate: 'NC777-888', date: '2025-07-24', time: '11:00 AM', service: 'Exterior Wash', makeModel: 'Audi A3', owner: 'Chris Blue', phone: '57736321' },
  ]);

  const filteredBookings = bookings.filter(booking =>
    booking.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.makeModel.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white shadow rounded-lg p-6 w-full max-w-3xl mx-auto animate-fadeIn">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">Manage Bookings</h3>
      <p className="text-gray-700 leading-relaxed mb-6">
        View and manage all customer bookings for your car wash services. Confirm, reschedule, or cancel
        appointments with ease, ensuring a smooth flow of operations.
      </p>

      {/* Search Input */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search by number plate, name, phone or make/model..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
      </div>

      {filteredBookings.length > 0 ? (
        <>
          {/* Table View (for medium and larger screens) */}
          <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Number Plate
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Make/Model
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {booking.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {booking.plate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {booking.makeModel}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {booking.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {booking.date} @ {booking.time}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {booking.service}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-4">Edit</button>
                      <button className="text-red-600 hover:text-red-900">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* List View (for small screens) */}
          <div className="md:hidden grid grid-cols-1 gap-4">
            {filteredBookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">{booking.makeModel}</h4>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">Plate:</span> {booking.plate}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">Owner:</span> {booking.owner}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">Make/Model:</span> {booking.makeModel}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">Phone:</span> {booking.phone}
                </p>
                <p className="text-sm text-gray-600 flex items-center mt-2">
                  <CalendarDays className="h-4 w-4 text-gray-500 mr-2" />
                  <span>{booking.date} @ {booking.time}</span>
                </p>
                <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end space-x-3">
                  <button className="px-4 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-gray-600 text-center py-8">No bookings found matching your search.</p>
      )}

    </div>
  );
};


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
