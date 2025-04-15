import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddFacilities.css';

const AddFacilities = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    type: 'Clinic',
    protocol: 'Two-Stage Manual',
    showInMatching: true
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const facilityTypes = ['Clinic', 'Hospital', 'Laboratory', 'Screening Center'];
  const protocols = [
    'Two-Stage Manual',
    'Single-Stage Automated',
    'Hybrid Review',
    'Direct Reporting'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.name || !formData.code) {
      setError('Name and Code are required');
      return;
    }
  
    try {
      setIsLoading(true);
      
      // Use this URL construction
      const apiUrl = process.env.NODE_ENV === 'development' 
        ? 'http://localhost:5000/api/facilities'
        : '/api/facilities';
      
      const response = await axios.post(apiUrl, formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        }
      });
      
      if (response.data.success) {
        navigate('/facilities');
      } else {
        setError(response.data.message || 'Failed to save facility');
      }
    } catch (err) {
      console.error('Full error:', err);
      
      if (err.response) {
        // Server responded with error status
        setError(err.response.data.message || `Server error: ${err.response.status}`);
      } else if (err.request) {
        // Request was made but no response received
        setError('Network error - please check your connection');
      } else {
        // Other errors
        setError('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="facility-form-container">
    <title>Add facility</title>
      <h2>Add a new Facility</h2>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Facility Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter facility name"
          />
        </div>

        <div className="form-group">
          <label>Code:</label>
          <input
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
            required
            placeholder="Enter unique code"
          />
        </div>

        <div className="form-group">
          <label>Type:</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            {facilityTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              name="showInMatching"
              checked={formData.showInMatching}
              onChange={handleChange}
            />
            Used to match Screening Equipment and version 3.5 data.
          </label>
        </div>

        <div className="form-group">
          <label>Protocol:</label>
          <select
            name="protocol"
            value={formData.protocol}
            onChange={handleChange}
          >
            {protocols.map(protocol => (
              <option key={protocol} value={protocol}>{protocol}</option>
            ))}
          </select>
          <p className="protocol-description">
            {formData.protocol === 'Two-Stage Manual' 
              ? 'Use this Protocol if you want to manually review Inpatient and Outpatient results for all infants.'
              : 'Select appropriate protocol for this facility.'}
          </p>
        </div>

        <div className="form-actions">
          <button type="submit" disabled={isLoading} 
          onClick={handleSubmit}>
            {isLoading ? 'Saving...' : 'Save'}
          </button>
          <button 
            type="button" 
            onClick={() => navigate('/dashboard')}
            className="cancel-btn"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFacilities;