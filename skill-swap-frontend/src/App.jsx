

import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import LandingPage from './pages/LandingPage';
import Profile from './pages/Profile';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [receiverId, setReceiverId] = useState(null)

  const onLoggedOut = async () => {
    // Remove any tokens or session info if stored
    // localStorage.removeItem('token'); // Uncomment if you use tokens
    try {
      await fetch('http://localhost:5000/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (err) {
      // Optionally handle error
      console.error('Logout error:', err);
    }
    setIsLoggedIn(false);
    window.location.replace('/login');
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage isLoggedIn={isLoggedIn}onLoggedOut={onLoggedOut} />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register switchToLogin={() => window.location.replace('/login')} />} />
        <Route path="/home" element={<Home isLoggedIn={isLoggedIn} onLoggedOut={onLoggedOut} setReceiverId={setReceiverId} receiverId={receiverId} />} />
        <Route path="/profile" element={<Profile isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
