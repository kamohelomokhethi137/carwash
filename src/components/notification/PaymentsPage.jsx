// PaymentsPage.jsx
import React from 'react';
import { DollarSign } from 'lucide-react';

const PaymentsPage = () => {
  const paymentsData = [
    { numberPlate: 'CA 123-456', driverName: 'Lineo Sehlabo', phoneNumber: '52345678', amountDue: 150.0 },
    { numberPlate: 'GP 789-012', driverName: 'Lerato Sebilo', phoneNumber: '53456789', amountDue: 75.5 },
    { numberPlate: 'NW 345-678', driverName: 'Limakatso Lirontsho', phoneNumber: '64567890', amountDue: 200.0 },
    { numberPlate: 'EC 901-234', driverName: 'Joyce Miller', phoneNumber: '65678901', amountDue: 120.0 },
  ];

  return (
    <div className="bg-white shadow rounded-lg p-6 w-full max-w-3xl mx-auto animate-fadeIn">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">Payments Due</h3>
      {paymentsData.length > 0 ? (
        <>
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
          <div className="md:hidden grid grid-cols-1 gap-4">
            {paymentsData.map((data, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Payment Details</h4>
                <p className="text-sm text-gray-600 mb-1"><span className="font-medium">Number Plate:</span> {data.numberPlate}</p>
                <p className="text-sm text-gray-600 mb-1"><span className="font-medium">Driver Name:</span> {data.driverName}</p>
                <p className="text-sm text-gray-600 mb-1"><span className="font-medium">Phone:</span> {data.phoneNumber}</p>
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
      <p className="mt-6 text-sm text-gray-600">This section displays the outstanding payments.</p>
      <div className="mt-8 pt-4 border-t border-gray-200 flex justify-end">
        <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300">Process Payments</button>
      </div>
    </div>
  );
};

export default PaymentsPage;
