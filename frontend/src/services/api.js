/**
 * API Service
 * Handles all communication with the backend
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

/**
 * Generate floor plan and cost estimate
 * @param {Object} data - Form data with plot_size, num_rooms, budget_level
 * @returns {Promise<Object>} Response data with floor plan and cost estimate
 */
export const generateDesign = async (data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Error: ${response.status}`);
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || 'Failed to generate design');
    }

    return result;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error(
      error.message || 'Unable to connect to backend. Make sure the server is running on http://localhost:5000'
    );
  }
};

/**
 * Health check endpoint
 * @returns {Promise<Object>} Health status
 */
export const healthCheck = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/health`);
    return await response.json();
  } catch (error) {
    console.error('Health check failed:', error);
    throw error;
  }
};
