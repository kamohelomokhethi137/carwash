import {CalendarDays,Search} from 'lucide-react';
import React, { useState} from 'react';

function BookingsPage() 
 {
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

export default BookingsPage;