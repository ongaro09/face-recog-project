import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import AdminDashboard from './pages/AdminDashboard';
import SignUpPage from './pages/SignUpPage';
import VerificationPage from './pages/VerificationPage';
import UserDashboard from './pages/UserDashboard';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/verify/:username" element={<VerificationPage />} />
        <Route path="/dashboard/:username" element={<UserDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
