// SendSms.jsx
import React from 'react';
import { MessageSquare } from 'lucide-react';

const SendSms = () => {
  const smsMessages = [
    { name: 'Nts’ebo Ramatla', phone: '58745236', message: 'Please remember to pay your outstanding fine.' },
    { name: 'Lineo Sehlabo', phone: '52345678', message: 'Reminder: You have a balance due. Pay by Friday.' },
    { name: 'Lerato Sebilo', phone: '53456789', message: 'Payment pending for your last citation. Settle soon.' },
    { name: 'Limakatso Lirontsho', phone: '64567890', message: 'Your due date is near. Kindly process your payment.' },
  ];

  return (
    <div className="flex items-center justify-center min-h-[70vh] px-4">
      <div className="bg-white shadow rounded-lg p-6 w-full max-w-3xl animate-fadeIn">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
          Send SMS Alerts
        </h3>

        {smsMessages.length > 0 ? (
          <div className="space-y-4">
            {smsMessages.map((data, index) => (
              <div
                key={index}
                className="flex items-start justify-between bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200"
              >
                <div>
                  <p className="text-sm text-gray-700 font-medium">
                    To: {data.name} ({data.phone})
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Message: {data.message}
                  </p>
                </div>
                <button className="flex items-center px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200 text-sm">
                  <MessageSquare className="w-4 h-4 mr-1" /> Send
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center py-8">
            No SMS messages to send.
          </p>
        )}

        <p className="mt-6 text-sm text-gray-600">
          Use this panel to notify drivers of due payments or fines.
        </p>
      </div>
    </div>
  );
};

export default SendSms;
