import React, { useState } from 'react';

function SendSms() {
  const [searchPlate, setSearchPlate] = useState('');
  const [foundDriver, setFoundDriver] = useState(null);
  const [smsMessage, setSmsMessage] = useState('');
  const [messageSent, setMessageSent] = useState(false); // To show confirmation

  const drivers = [
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

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent page reload on form submission
    setMessageSent(false); // Reset message sent status
    const normalizedSearch = searchPlate.trim().toUpperCase();
    const driver = drivers.find(d => d.numberPlate.toUpperCase() === normalizedSearch);
    setFoundDriver(driver);
    if (!driver) {
      alert(`No driver found with number plate: ${searchPlate}`);
    }
  };

  const handleSendSms = () => {
    if (foundDriver && smsMessage.trim() !== '') {
      // In a real application, you would send an API request here
      // to a backend service that handles SMS sending.
      console.log(`Simulating SMS send to ${foundDriver.phoneNumber} (${foundDriver.driverName}):`);
      console.log(`Message: "${smsMessage}"`);
      alert(`SMS sent to ${foundDriver.driverName} (${foundDriver.phoneNumber}): "${smsMessage}"`);
      setMessageSent(true);
      setSmsMessage(''); // Clear message after sending
    } else if (foundDriver) {
      alert('Please enter a message to send.');
    } else {
      alert('No driver selected to send SMS to.');
    }
  };

  return (
    <div className="bg-white shadow rounded p-4 sm:p-6 w-full max-w-2xl mx-auto"> {/* Adjusted padding for smaller screens */}
      <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">Send SMS to Driver</h3> {/* Adjusted font size for smaller screens */}

      {/* Search Section */}
      <form onSubmit={handleSearch} className="mb-6 p-4 border rounded bg-gray-50">
        <label htmlFor="searchPlate" className="block text-sm font-medium text-gray-700 mb-2">
          Search by Number Plate:
        </label>
        <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-3 sm:space-y-0"> {/* Flex direction change for responsiveness */}
          <input
            type="text"
            id="searchPlate"
            className="flex-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base p-2 text-gray-950" {/* Adjusted text size */}
            value={searchPlate}
            onChange={(e) => setSearchPlate(e.target.value)}
            placeholder="e.g., CA 123-456"
            required
          />
          <button
            type="submit"
            className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" {/* Full width on small, auto on larger */}
          >
            Search
          </button>
        </div>
      </form>

      {/* Driver Information and SMS Section */}
      {foundDriver ? (
        <div className="p-4 border rounded bg-blue-50 mb-6">
          <h4 className="text-lg font-semibold text-blue-800 mb-2">Driver Found:</h4>
          <p className="text-gray-700 text-sm sm:text-base"> {/* Adjusted text size */}
            <strong>Name:</strong> {foundDriver.driverName}<br />
            <strong>Phone:</strong> {foundDriver.phoneNumber}<br />
            <strong>Number Plate:</strong> {foundDriver.numberPlate}
          </p>

          <div className="mt-4">
            <label htmlFor="smsMessage" className="block text-sm font-medium text-gray-700 mb-2">
              SMS Message:
            </label>
            <textarea
              id="smsMessage"
              rows="4"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base p-2 text-gray-950" {/* Adjusted text size */}
              value={smsMessage}
              onChange={(e) => setSmsMessage(e.target.value)}
              placeholder="Type your message here..."
            ></textarea>
            <button
              onClick={handleSendSms}
              className="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Send SMS
            </button>
            {messageSent && (
              <p className="mt-2 text-sm text-green-700">Message simulated and sent successfully!</p>
            )}
          </div>
        </div>
      ) : (
        <p className="text-gray-600 text-center py-4 text-sm sm:text-base">Search for a driver by their number plate to send an SMS.</p> {/* Adjusted text size */}
      )}
    </div>
  );
}

export default SendSms;