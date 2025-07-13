import React from 'react';
// import { CalendarDays } from 'lucide-react';

const BookingsPage = () => {
  const bookings = [
    { numberPlate: 'CA 123-456', driverName: 'Nts’ebo Ramatla', dateBooked: '2025-07-01', reason: 'Speeding' },
    { numberPlate: 'GP 789-012', driverName: 'Lineo Sehlabo', dateBooked: '2025-07-04', reason: 'Reckless driving' },
    { numberPlate: 'NW 345-678', driverName: 'Lerato Sebilo', dateBooked: '2025-07-08', reason: 'Expired license' },
    { numberPlate: 'EC 901-234', driverName: 'Limakatso Lirontsho', dateBooked: '2025-07-11', reason: 'No seatbelt' },
  ];

  return (
    <div className="bg-white shadow rounded-lg p-6 w-full max-w-3xl mx-auto animate-fadeIn">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">Driver Bookings</h3>
      {bookings.length > 0 ? (
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          <table className="min-w-full bg-white divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Number Plate</th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Driver Name</th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Date Booked</th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Reason</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookings.map((data, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-800">{data.numberPlate}</td>
                  <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-800">{data.driverName}</td>
                  <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-800">{data.dateBooked}</td>
                  <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-800">{data.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600 text-center py-8">No recent bookings found.</p>
      )}
      <p className="mt-6 text-sm text-gray-600">Review and manage all driver bookings from this section.</p>
      <div className="mt-8 pt-4 border-t border-gray-200 flex justify-end">
        <button className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition duration-300">Manage Bookings</button>
      </div>
    </div>
  );
};

export default BookingsPage;
