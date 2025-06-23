import React, { useState } from 'react';
import axios from 'axios'; // Make sure axios is installed: npm install axios

function SendSms() {
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
      <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">Send WhatsApp Message to Driver</h3>

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
              WhatsApp Message:
            </label>
            <textarea
              id="smsMessage"
              rows="4"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base p-2 text-gray-950"
              value={smsMessage}
              onChange={(e) => setSmsMessage(e.target.value)}
              placeholder="Type your WhatsApp message here..."
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
        <p className="text-gray-600 text-center py-4 text-sm sm:text-base">Search for a driver by their number plate to send a WhatsApp message.</p>
      )}
    </div>
  );
}

export default SendSms;