import { motion } from 'framer-motion';
import { FiClock, FiCalendar } from 'react-icons/fi';

const RegisteredCarsList = ({
  filteredRegistrations,
  filterDate,
  setFilterDate,
}) => {
  const container = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.1 },
    },
  };
  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="bg-white/30 backdrop-blur-md border border-gray-200 rounded-2xl shadow-2xl p-8 max-w-6xl mx-auto mt-12"
    >
      {/* Header / Filter */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <motion.h2
          variants={item}
          className="text-3xl font-bold text-black"
        >
          Registered Cars
        </motion.h2>
        <motion.div
          variants={item}
          className="relative flex items-center gap-3"
        >
          <FiCalendar className="text-black" size={20} />
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="peer border border-gray-400 text-black px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            style={{ colorScheme: 'light' }}
          />
          {filterDate && (
            <button
              onClick={() => setFilterDate('')}
              className="text-sm text-red-600 hover:text-red-800 transition"
            >
              Clear
            </button>
          )}
        </motion.div>
      </div>

      {/* Table for Desktop */}
      {filteredRegistrations.length > 0 ? (
        <>
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {['Plate', 'Owner', 'Car Name', 'Make/Model', 'Phone', 'Date/Time'].map((h) => (
                    <th
                      key={h}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <motion.tbody variants={container} className="bg-white divide-y divide-gray-200">
                {filteredRegistrations.map((car) => (
                  <motion.tr
                    key={car.id}
                    variants={item}
                    whileHover={{ backgroundColor: 'rgba(59,130,246,0.1)', boxShadow: '0 0 8px rgba(59,130,246,0.3)' }}
                    className="transition"
                  >
                    <td className="px-6 py-4 font-medium text-black">{car.plateNumber}</td>
                    <td className="px-6 py-4 text-gray-800">{car.ownerName}</td>
                    <td className="px-6 py-4 text-gray-800">{car.carName}</td>
                    <td className="px-6 py-4 text-gray-800">{car.make} {car.model}</td>
                    <td className="px-6 py-4 text-gray-800">{car.phoneNumber}</td>
                    <td className="px-6 py-4 text-gray-800 flex items-center">
                      <FiClock className="mr-1 text-blue-400" size={14} />
                      {car.timestamp.toLocaleDateString()} {car.timestamp.toLocaleTimeString()}
                    </td>
                  </motion.tr>
                ))}
              </motion.tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {filteredRegistrations.map((car) => (
              <motion.div
                key={car.id}
                variants={item}
                className="bg-white rounded-xl shadow-md p-4 border border-gray-100"
              >
                <div className="text-xl font-bold text-blue-600">{car.carName}</div>
                <div className="text-black font-medium">Plate: {car.plateNumber}</div>
                <div className="text-gray-800">Owner: {car.ownerName}</div>
                <div className="text-gray-800">Make/Model: {car.make} {car.model}</div>
                <div className="text-gray-800">Phone: {car.phoneNumber}</div>
                <div className="text-gray-500 text-sm flex items-center mt-1">
                  <FiCalendar className="mr-1" />
                  {car.timestamp.toLocaleDateString()} @ {car.timestamp.toLocaleTimeString()}
                </div>
              </motion.div>
            ))}
          </div>
        </>
      ) : (
        <motion.div variants={item} className="text-center py-12 text-gray-600">
          <p>No registrations found for the selected date.</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default RegisteredCarsList;
