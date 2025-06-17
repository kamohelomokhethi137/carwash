import { useState, useEffect, useCallback } from 'react';
import { useSnackbar } from 'notistack';
import Navbar from '../components/RegistrationNavbar';
import Sidebar from '../components/RegistrationSidebar';
import RegisterCarForm from '../components/registration/RegisterCarForm';
import RegisteredCarsList from '../components/registration/RegisteredCarsList';

const CarRegistrationDashboard = () => {
  // State management
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('register');
  const [registrations, setRegistrations] = useState([]);
  const [filteredRegistrations, setFilteredRegistrations] = useState([]);
  const [filterDate, setFilterDate] = useState('');
  const [userEmail] = useState('name@domain');
  const { enqueueSnackbar } = useSnackbar();

  // Form state
  const [formData, setFormData] = useState({
    ownerName: '',
    phoneNumber: '',
    plateNumber: '',
    carName: '',
    make: '',
    model: ''
  });


  useEffect(() => {
    const loadSampleData = () => {
      const sampleData = [
        {
          id: 1,
          ownerName: 'name surname',
          phoneNumber: '57736313',
          plateNumber: 'A113',
          carName: 'Toyota Hiace',
          make: 'Toyota',
          model: 'Hiace',
          timestamp: new Date('2025-05-15T09:30:00')
        },
        {
          id: 2,
          ownerName: 'name surname',
          phoneNumber: '57736314',
          plateNumber: 'A114',
          carName: 'Honda Accord',
          make: 'Honda',
          model: 'Accord',
          timestamp: new Date('2025-05-16T10:00:00')
        },
        {
          id: 3,
          ownerName: 'name surname',
          phoneNumber: '57736315',
          plateNumber: 'A115',
          carName: 'Ford Focus',
          make: 'Ford',
          model: 'Focus',
          timestamp: new Date('2025-05-17T11:15:00')
        }
      ];
      setRegistrations(sampleData);
      setFilteredRegistrations(sampleData);
    };

    loadSampleData();
  }, []);

  // Filter registrations by date
  useEffect(() => {
    const filterRegistrations = () => {
      if (filterDate) {
        const filtered = registrations.filter(reg =>
          reg.timestamp.toISOString().split('T')[0] === filterDate
        );
        setFilteredRegistrations(filtered);
      } else {
        setFilteredRegistrations(registrations);
      }
    };

    filterRegistrations();
  }, [filterDate, registrations]);

  // Event handlers
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    
    const newRegistration = {
      id: registrations.length + 1,
      ...formData,
      timestamp: new Date()
    };
    
    setRegistrations(prev => [...prev, newRegistration]);
    setFormData({
      ownerName: '',
      phoneNumber: '',
      plateNumber: '',
      carName: '',
      make: '',
      model: '',
    });
    
    enqueueSnackbar('Car registered successfully!', { 
      variant: 'success',
      autoHideDuration: 3000 
    });
  }, [formData, registrations, enqueueSnackbar]);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prev => !prev);
  }, []);

  const clearDateFilter = useCallback(() => {
    setFilterDate('');
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar 
        toggleSidebar={toggleSidebar} 
        userEmail={userEmail} 
      />

      <div className="flex flex-1 overflow-hidden h-screen relative pt-16">
        {/* Desktop Sidebar */}
        <div className="hidden md:block fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 z-30 bg-white shadow-lg">
          <Sidebar
            sidebarOpen={sidebarOpen}
            toggleSidebar={toggleSidebar}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            userEmail={userEmail}
          />
        </div>

        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 flex md:hidden">
            <div
              className="fixed inset-0 bg-black bg-opacity-40"
              onClick={toggleSidebar}
            />
            <div className="relative w-64 bg-white shadow-xl h-full z-50">
              <Sidebar
                sidebarOpen={sidebarOpen}
                toggleSidebar={toggleSidebar}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                userEmail={userEmail}
              />
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto md:ml-64">
          {activeTab === 'register' ? (
            <RegisterCarForm 
              formData={formData}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
            />
          ) : (
            <RegisteredCarsList 
              filteredRegistrations={filteredRegistrations}
              filterDate={filterDate}
              setFilterDate={setFilterDate}
              clearDateFilter={clearDateFilter}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default CarRegistrationDashboard;