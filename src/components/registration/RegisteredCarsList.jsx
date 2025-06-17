import { motion } from 'framer-motion';
import { FiClock, FiCalendar } from 'react-icons/fi';

const RegisteredCarsList = ({ filteredRegistrations, filterDate, setFilterDate }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow p-6 max-w-5xl mx-auto"
    >
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-semibold text-gray-800">Registered Cars</h2>
        <div className="flex items-center gap-2">
          <FiCalendar className="text-black" size={20} />
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="text-black border border-gray-700 px-3 py-1 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            style={{ colorScheme: 'light' }}
          />
          {filterDate && (
            <button
              onClick={() => setFilterDate('')}
              className="text-sm text-red-500 hover:text-red-700 transition"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {filteredRegistrations.length > 0 ? (
        <>
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {['Plate', 'Owner', 'Car Name', 'Make/Model', 'Phone', 'Date/Time'].map((h, i) => (
                    <th
                      key={i}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRegistrations.map((car) => (
                  <motion.tr
                    key={car.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="hover:bg-blue-50"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">{car.plateNumber}</td>
                    <td className="px-6 py-4 text-gray-700">{car.ownerName}</td>
                    <td className="px-6 py-4 text-gray-700">{car.carName}</td>
                    <td className="px-6 py-4 text-gray-700">{car.make} {car.model}</td>
                    <td className="px-6 py-4 text-gray-700">{car.phoneNumber}</td>
                    <td className="px-6 py-4 text-gray-700">
                      <div className="flex items-center">
                        <FiClock className="mr-1 text-blue-400" size={14} />
                        {car.timestamp.toLocaleDateString()} {car.timestamp.toLocaleTimeString()}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="md:hidden space-y-4">
            {filteredRegistrations.map((car) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow p-4"
              >
                <div className="text-lg font-semibold text-blue-600">{car.carName}</div>
                <div className="text-gray-800 font-medium">Plate: {car.plateNumber}</div>
                <div className="text-gray-700">Owner: {car.ownerName}</div>
                <div className="text-gray-700">Make/Model: {car.make} {car.model}</div>
                <div className="text-gray-700">Phone: {car.phoneNumber}</div>
                <div className="text-gray-500 text-sm flex items-center mt-1">
                  <FiCalendar className="mr-1" />
                  {car.timestamp.toLocaleDateString()} @ {car.timestamp.toLocaleTimeString()}
                </div>
              </motion.div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <p>No registrations found for the selected date.</p>
        </div>
      )}
    </motion.div>
  );
};

export default RegisteredCarsList;