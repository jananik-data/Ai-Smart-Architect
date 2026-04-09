import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Welcome from './components/Welcome';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import './App.css';

function AppContent() {
  const { isAuthenticated, logout } = useAuth();
  const [showWelcome, setShowWelcome] = useState(true);

  const handleGetStarted = () => {
    setShowWelcome(false);
  };

  const handleLogout = () => {
    logout();
  };

  const handleLoginSuccess = () => {
    // User will automatically see the home page after login
  };

  if (showWelcome) {
    return <Welcome onGetStarted={handleGetStarted} />;
  }

  if (!isAuthenticated) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="App">
      <Navbar onLogout={handleLogout} />
      <Home />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
