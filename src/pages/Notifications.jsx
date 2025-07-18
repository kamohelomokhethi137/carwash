import React, { useState, useEffect } from 'react';
import NotificationsNavbar from '../components/notification/NotificationsNavbar';
import NotificationsSidebar from '../components/notification/NotificationsSidebar';
import PaymentsPage from './PaymentsPage';
import SendSms from './SendSms';
import BookingsPage from '../components/notification/BookingsPage';

const Notifications = () => {
  // Start directly on Send SMS tab
  const [activeContent, setActiveContent] = useState('sendSms');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadTimer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(loadTimer);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const renderMainContent = () => {
    switch (activeContent) {
      case 'payments':
        return <PaymentsPage />;
      case 'sendSms':
        return <SendSms />;
      case 'bookings':
        return <BookingsPage />;
      default:
        return <SendSms />;
    }
  };

  return (
    <div className={`flex flex-col md:flex-row min-h-screen bg-gray-100 font-inter transition-opacity duration-700 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* Sidebar */}
      <NotificationsSidebar
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        activeTab={activeContent}
        setActiveTab={setActiveContent}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <NotificationsNavbar
          toggleSidebar={toggleSidebar}
          userEmail="name@example.com"  // i will with this later
        />

        <main className="flex-1 overflow-y-auto p-4 flex items-center justify-center">
          {renderMainContent()}
        </main>
      </div>
    </div>
  );
};

export default Notifications;
