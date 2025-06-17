import { useState, useEffect, useCallback } from 'react';
import { useSnackbar } from 'notistack';

import AdminNavbar from '../components/admin/AdminNavbar';
import AdminSidebar from '../components/admin/AdminSidebar';
import RegisteredCarsList from '../components/registration/RegisteredCarsList';

// Placeholder components for admin-specific tabs
const CreateEmployee = () => <div className='bg-black'>loading ......</div>;
const AllAccounts = () => <div className='bg-black'>loading ......</div>;
const RolesPermissions = () => <div className='bg-black'>loading ......</div>;

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('registrations');
  const [registrations, setRegistrations] = useState([]);
  const [filteredRegistrations, setFilteredRegistrations] = useState([]);
  const [filterDate, setFilterDate] = useState('');
  const [userEmail] = useState('admin@domain.com');

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
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
      }
    ];
    setRegistrations(sampleData);
    setFilteredRegistrations(sampleData);
  }, []);

  useEffect(() => {
    if (filterDate) {
      setFilteredRegistrations(
        registrations.filter(reg =>
          reg.timestamp.toISOString().split('T')[0] === filterDate
        )
      );
    } else {
      setFilteredRegistrations(registrations);
    }
  }, [filterDate, registrations]);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prev => !prev);
  }, []);

  const clearDateFilter = useCallback(() => {
    setFilterDate('');
  }, []);

  const renderTab = () => {
    switch (activeTab) {
      case 'registrations':
        return (
          <RegisteredCarsList
            filteredRegistrations={filteredRegistrations}
            filterDate={filterDate}
            setFilterDate={setFilterDate}
            clearDateFilter={clearDateFilter}
          />
        );
      case 'create-employee':
        return <CreateEmployee />;
      case 'accounts':
        return <AllAccounts />;
      case 'roles':
        return <RolesPermissions />;
      default:
        return <div className='bg-black'>Welcome to the Admin Dashboard</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <AdminNavbar toggleSidebar={toggleSidebar} userEmail={userEmail} />

      <div className="flex flex-1 overflow-hidden h-screen relative pt-16">
        {/* Desktop Sidebar */}
        <div className="hidden md:block fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 z-30 bg-white shadow-lg">
          <AdminSidebar
            sidebarOpen={sidebarOpen}
            toggleSidebar={toggleSidebar}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
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
              <AdminSidebar
                sidebarOpen={sidebarOpen}
                toggleSidebar={toggleSidebar}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto md:ml-64">
          {renderTab()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
