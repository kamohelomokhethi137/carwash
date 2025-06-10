import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Landing';
import Notifications from './pages/Notifications';
import Signup from './pages/Signup';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';

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

<<<<<<< HEAD
=======
        <Route path="/payments" element={<PaymentDashboard />} />

>>>>>>> 8c665febb1ebe8cfda53cdb6bd80eeb8a843293c

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<AdminDashboard />} />
        
    

        <Route path="*" element={<PageNotFound />} />

      </Routes>
    </Router>
  );
}

export default App;
