import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Landing';
import Notifications from './pages/Notifications';
import Signup from './pages/Signup';
import Login from './pages/Login';

import AdminDashboard from './pages/AdminDashboard';
import CarRegistrationDashboard from './pages/CarRegistrationDashboard';

import PageNotFound from './pages/PageNotFound';
import Navbar from './components/Navbar'; 


function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              
              <Navbar />
              <Home />
            </>
          }
        />
        <Route path="/notifications" element={<Notifications />} />


        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/car-registration" element={<CarRegistrationDashboard />} />

        <Route path="/admin" element={<AdminDashboard />} />
        
    

        <Route path="*" element={<PageNotFound />} />

      </Routes>
    </Router>
  );
}

export default App;
