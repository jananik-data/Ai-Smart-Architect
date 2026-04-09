import React, { useState } from 'react';
import { downloadResultsAsPDF } from '../services/pdf';
import './ResultCard.css';

function ResultCard({ floorPlan, costEstimate, onReset }) {
  const { summary, breakdown, details } = costEstimate;
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState('');

  const handleDownloadPDF = async () => {
    setDownloading(true);
    setDownloadError('');

    try {
      await downloadResultsAsPDF('pdf-content', 'architect-design-plan.pdf');
    } catch (error) {
      setDownloadError(error.message);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="result-container">
      <div id="pdf-content">
        <div className="pdf-header">
          <h2>🏗️ AI Smart Architect - Design Plan</h2>
          <p>Generated on {new Date().toLocaleDateString()}</p>
        </div>

        <div className="results-wrapper">
          <div className="result-section floor-plan-section">
            <h3>Your Floor Plan</h3>
            <div className="floor-plan-display">
              <pre>{floorPlan.floor_plan}</pre>
            </div>

            <div className="room-details">
              <h4>Room Details</h4>
              <div className="rooms-grid">
                {floorPlan.room_details.map((room, idx) => (
                  <div key={idx} className="room-card">
                    <h5>{room.name}</h5>
                    <p><strong>Size:</strong> {room.size}</p>
                    <p><strong>Dimensions:</strong> {room.dimensions}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="result-section cost-estimate-section">
            <h3>Cost Estimate</h3>

            <div className="cost-summary">
              <div className="summary-item total">
                <span>Total Estimated Cost</span>
                <strong>${summary.total_estimated_cost.toLocaleString()}</strong>
              </div>
              <div className="summary-item">
                <span>Cost per Sq Ft</span>
                <strong>${summary.cost_per_sqft}</strong>
              </div>
              <div className="summary-item">
                <span>Cost per Room</span>
                <strong>${summary.cost_per_room.toLocaleString()}</strong>
              </div>
              <div className="summary-item">
                <span>Budget Level</span>
                <strong>{summary.budget_level}</strong>
              </div>
            </div>

            <div className="cost-breakdown">
              <h4>Cost Breakdown</h4>
              <div className="breakdown-items">
                {Object.entries(breakdown).map(([key, value]) => (
                  <div key={key} className="breakdown-item">
                    <span>{key.replace(/_/g, ' ').toUpperCase()}</span>
                    <strong>${typeof value === 'number' ? value.toLocaleString() : value}</strong>
                  </div>
                ))}
              </div>
            </div>

            <div className="project-details">
              <h4>Project Details</h4>
              <p><strong>Plot Size:</strong> {details.plot_size_sqft} sq ft</p>
              <p><strong>Number of Rooms:</strong> {details.number_of_rooms}</p>
              <p><strong>Estimated Timeline:</strong> {details.timeline_months} months</p>
            </div>

            <div className="percentage-breakdown">
              <h4>Cost Distribution (%)</h4>
              <div className="percentage-items">
                {Object.entries(details.breakdown_percentage).map(([key, value]) => (
                  <div key={key} className="percentage-item">
                    <span>{key.replace(/_/g, ' ')}</span>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${value}%` }}
                      >
                        {value}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {downloadError && (
        <div className="download-error">
          <strong>Error:</strong> {downloadError}
          <button onClick={() => setDownloadError('')}>×</button>
        </div>
      )}

      <div className="action-buttons">
        <button 
          onClick={handleDownloadPDF} 
          className="download-btn"
          disabled={downloading}
        >
          {downloading ? (
            <>
              <span className="spinner"></span>
              Generating PDF...
            </>
          ) : (
            '📥 Download as PDF'
          )}
        </button>
        
        <button onClick={onReset} className="reset-btn">
          ← Start Over
        </button>
      </div>
    </div>
  );
}

export default ResultCard;
