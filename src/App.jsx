import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Landing';
import Notifications from './pages/Notifications';
import Signup from './pages/Signup';
import Login from './pages/Login';
import SendSms from './pages/SendSms';
import AdminDashboard from './pages/AdminDashboard';
import CarRegistrationDashboard from './pages/CarRegistrationDashboard';
import Booking from './pages/BookingPage';

import PageNotFound from './pages/PageNotFound';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/"element={<Home />}/>
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/car-registration" element={<CarRegistrationDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/book" element={<Booking />} />
        <Route path="/sendsms" element={<SendSms />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
