import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Landing';
import Notifications from './pages/Notifications';
<<<<<<< HEAD
import PaymentDashboard from './pages/PaymentDashBoard';
=======

import Signup from './pages/Signup';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';

import PageNotFound from './pages/PageNotFound';
>>>>>>> cbfb84cd6319c381785a0b062bc8056970682635
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
<<<<<<< HEAD
        <Route path="/payments" element={<PaymentDashboard />} />
=======

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<AdminDashboard />} />
        
    

        <Route path="*" element={<PageNotFound />} />
>>>>>>> cbfb84cd6319c381785a0b062bc8056970682635
      </Routes>
    </Router>
  );
}

export default App;
