import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Revised import paths, assuming 'pages' directory is a sibling to 'src'
// For example, if App.jsx is in 'carwash/src/', then Landing.jsx is in 'carwash/pages/'
import Home from './pages/Landing';
import Notifications from './pages/notifications/Notifications';
import Signup from './pages/Signup';
import Login from './pages/Login';
import SendSms from './pages/notifications/SendSms'; // Corrected casing to SendSms for consistency

import AdminDashboard from './pages/AdminDashboard';
import CarRegistrationDashboard from './pages/CarRegistrationDashboard';
import Booking from './pages/BookingPage';

import PageNotFound from './pages/PageNotFound';


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 font-inter">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/car-registration" element={<CarRegistrationDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/book" element={<Booking />} />
          <Route path="/sendsms" element={<SendSms />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
