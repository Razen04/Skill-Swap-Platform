

import './App.css';
import React, { useState } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const [showRegister, setShowRegister] = useState(false);

  const switchToRegister = () => setShowRegister(true);
  const switchToLogin = () => setShowRegister(false);

  return showRegister ? (
    <Register switchToLogin={switchToLogin} />
  ) : (
    <Login switchToRegister={switchToRegister} />
  );
}

export default App;
