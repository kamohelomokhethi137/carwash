import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Landing';
import Notifications from './pages/Notifications';
import PaymentDashboard from './pages/PaymentDashBoard';
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
        <Route path="/payments" element={<PaymentDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
