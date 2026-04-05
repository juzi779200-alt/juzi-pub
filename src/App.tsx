import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../components/Home';
import Checkout from '../components/Checkout';
import Register from '../components/Register';
import Login from '../components/Login';
import Dashboard from '../components/Dashboard';
import Orders from '../components/Orders';
import TrackOrder from '../components/TrackOrder';
import { LanguageProvider } from '../components/LanguageContext';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return <Navigate to="/login" />;
    }
    return <>{children}</>;
  };

  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/orders" element={<PrivateRoute><Orders /></PrivateRoute>} />
          <Route path="/orders/:orderId" element={<PrivateRoute><Orders /></PrivateRoute>} />
          <Route path="/track" element={<TrackOrder />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
};

export default App;
