// src/components/PaymentsPage.jsx (or wherever you prefer to store your components)
import React from 'react';

function PaymentsPage() {
  // Sample data for the table
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
    <div className="bg-white shadow rounded p-4 w-full mx-auto">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Payments Due</h3>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700 bg-gray-50">Number Plate</th>
              <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700 bg-gray-50">Driver Full Name</th>
              <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700 bg-gray-50">Phone Number</th>
              <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700 bg-gray-50">Amount Due (M)</th>
            </tr>
          </thead>
          <tbody>
            {paymentsData.map((data, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="py-2 px-4 border-b text-sm text-gray-800">{data.numberPlate}</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">{data.driverName}</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">{data.phoneNumber}</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">M{data.amountDue.toFixed(2)}</td>
              </tr>
            ))}
            {paymentsData.length === 0 && (
              <tr>
                <td colSpan="4" className="py-4 px-4 text-center text-gray-600">No payments due.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="mt-6 text-sm text-gray-600">
        This table displays the outstanding payments.
      </p>
    </div>
  );
}

export default PaymentsPage;