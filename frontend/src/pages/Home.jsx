import React, { useState } from 'react';
import Form from '../components/Form';
import ResultCard from '../components/ResultCard';
import { generateDesign } from '../services/api';
import './Home.css';

function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const handleFormSubmit = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await generateDesign(formData);
      setResult(response.data);
    } catch (err) {
      setError(err.message);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
  };

  return (
    <div className="home">
      <main className="main-content">
        <div className="container">
          {error && (
            <div className="error-banner">
              <strong>Error:</strong> {error}
              <button onClick={() => setError(null)}>×</button>
            </div>
          )}

          {!result ? (
            <Form onSubmit={handleFormSubmit} isLoading={loading} />
          ) : (
            <ResultCard 
              floorPlan={result.floorPlan}
              costEstimate={result.costEstimate}
              onReset={handleReset}
            />
          )}
        </div>
      </main>

      <footer className="footer">
        <p>© 2026 AI Smart Architect. Simplifying architectural design.</p>
      </footer>
    </div>
  );
}

export default Home;
