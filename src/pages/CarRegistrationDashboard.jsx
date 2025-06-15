import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiClock, FiCalendar } from 'react-icons/fi';
import { useSnackbar } from 'notistack';

import Navbar from '../components/RegistrationNavbar';
import Sidebar from '../components/RegistrationSidebar';

const CarRegistrationDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('register');
  const [registrations, setRegistrations] = useState([]);
  const [filteredRegistrations, setFilteredRegistrations] = useState([]);
  const [filterDate, setFilterDate] = useState('');
  const [userEmail] = useState('name@domain');

  const { enqueueSnackbar } = useSnackbar();

  const [formData, setFormData] = useState({
    plateNumber: '',
    phoneNumber: '',
    carName: '',
    make: '',
    model: ''
  });

  useEffect(() => {
    const sampleData = [
      {
        id: 1,
        plateNumber: 'A113',
        phoneNumber: '57736313',
        carName: 'Toyota Hiace',
        make: 'Toyota',
        model: 'Hiace',
        timestamp: new Date('2023-05-15T09:30:00')
      },
      {
        id: 2,
        plateNumber: 'G432',
        phoneNumber: '63234923',
        carName: 'Executive Car',
        make: 'Mercedes',
        model: 'E-Class',
        timestamp: new Date('2023-05-15T14:15:00')
      }
    ];
    setRegistrations(sampleData);
    setFilteredRegistrations(sampleData);
  }, []);

  useEffect(() => {
    if (filterDate) {
      const filtered = registrations.filter(reg =>
        reg.timestamp.toISOString().split('T')[0] === filterDate
      );
      setFilteredRegistrations(filtered);
    } else {
      setFilteredRegistrations(registrations);
    }
  }, [filterDate, registrations]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRegistration = {
      id: registrations.length + 1,
      ...formData,
      timestamp: new Date()
    };
    setRegistrations(prev => [...prev, newRegistration]);
    setFormData({
      plateNumber: '',
      phoneNumber: '',
      carName: '',
      make: '',
      model: ''
    });
    enqueueSnackbar('Car registered successfully!', { variant: 'success' });
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar toggleSidebar={toggleSidebar} userEmail={userEmail} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          sidebarOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          userEmail={userEmail}
        />

        {sidebarOpen && window.innerWidth < 768 && (
          <div
            onClick={toggleSidebar}
            className="fixed inset-0 bg-black bg-opacity-30 z-20 md:hidden"
          />
        )}

        <main className={`flex-1 p-6 overflow-auto`}>
          {activeTab === 'register' ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow p-6 max-w-2xl mx-auto"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Register New Car</h2>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    { id: 'plateNumber', label: 'Number Plate' },
                    { id: 'phoneNumber', label: 'Phone Number' },
                    { id: 'carName', label: 'Car Name' },
                    { id: 'make', label: 'Make' },
                    { id: 'model', label: 'Model' }
                  ].map(field => (
                    <div key={field.id}>
                      <label htmlFor={field.id} className="block text-sm font-medium text-black mb-1">
                        {field.label}
                      </label>
                      <input
                        type="text"
                        id={field.id}
                        name={field.id}
                        value={formData[field.id]}
                        onChange={handleInputChange}
                        className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        required
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex justify-center">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
                  >
                    Register Car
                  </button>
                </div>
              </form>
            </motion.div>
          ) : (
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
                  {/* Table for desktop */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          {['Plate', 'Car Name', 'Make/Model', 'Phone', 'Date/Time'].map((h, i) => (
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

                  {/* Mobile Cards */}
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
          )}
        </main>
      </div>
    </div>
  );
};

export default CarRegistrationDashboard;
