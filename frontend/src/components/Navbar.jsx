import React from 'react';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

function Navbar({ onLogout }) {
  const { user } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-brand">
          <h2>🏗️ AI Smart Architect</h2>
        </div>
        
        {user && (
          <div className="navbar-user">
            <div className="user-info">
              <span className="user-name">{user.fullName || user.email}</span>
              <span className="user-email">{user.email}</span>
            </div>
            <button onClick={onLogout} className="logout-btn">
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
