import React, { useState } from 'react';
import './Form.css';

function Form({ onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    plot_size: 2000,
    num_rooms: 3,
    budget_level: 'medium'
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'num_rooms' ? parseInt(value) : value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.plot_size || formData.plot_size <= 0) {
      newErrors.plot_size = 'Plot size must be greater than 0';
    }
    if (formData.plot_size > 100000) {
      newErrors.plot_size = 'Plot size cannot exceed 100,000 sq ft';
    }

    if (!formData.num_rooms || formData.num_rooms <= 0) {
      newErrors.num_rooms = 'Number of rooms must be greater than 0';
    }
    if (formData.num_rooms > 20) {
      newErrors.num_rooms = 'Maximum 20 rooms allowed';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      setErrors({});
      onSubmit(formData);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="form-container">
      <h2>Design Your Dream Home</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="plot_size">Plot Size (sq ft)</label>
          <input
            type="number"
            id="plot_size"
            name="plot_size"
            min="100"
            max="100000"
            value={formData.plot_size}
            onChange={handleChange}
            className={errors.plot_size ? 'error' : ''}
          />
          {errors.plot_size && <span className="error-message">{errors.plot_size}</span>}
          <small>Range: 100 - 100,000 sq ft</small>
        </div>

        <div className="form-group">
          <label htmlFor="num_rooms">Number of Rooms</label>
          <input
            type="number"
            id="num_rooms"
            name="num_rooms"
            min="1"
            max="20"
            value={formData.num_rooms}
            onChange={handleChange}
            className={errors.num_rooms ? 'error' : ''}
          />
          {errors.num_rooms && <span className="error-message">{errors.num_rooms}</span>}
          <small>Range: 1 - 20 rooms</small>
        </div>

        <div className="form-group">
          <label htmlFor="budget_level">Budget Level</label>
          <select
            id="budget_level"
            name="budget_level"
            value={formData.budget_level}
            onChange={handleChange}
          >
            <option value="low">Budget-Friendly ($50/sq ft)</option>
            <option value="medium">Standard ($100/sq ft)</option>
            <option value="high">Premium ($150/sq ft)</option>
          </select>
        </div>

        <button type="submit" disabled={isLoading} className="submit-btn">
          {isLoading ? 'Generating Design...' : 'Generate Design'}
        </button>
      </form>
    </div>
  );
}

export default Form;
