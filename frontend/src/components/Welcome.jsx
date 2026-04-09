import React from 'react';
import './Welcome.css';

function Welcome({ onGetStarted }) {
  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <div className="welcome-text-section">
          <h1 className="welcome-tagline">Every great home starts with a small idea</h1>
          <p className="welcome-subtitle">Design your dream home with AI Smart Architect</p>
        </div>

        <div className="welcome-image-section">
          <img 
            src="assets/images/house.svg" 
            alt="Beautiful 3D house illustration" 
            className="house-img"
          />
        </div>
      </div>

      <button onClick={onGetStarted} className="get-started-btn">
        Start Designing Your Home →
      </button>
    </div>
  );
}

export default Welcome;
