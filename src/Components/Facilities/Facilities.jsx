import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Facilities.css';

const Facilities = () => {
    const [facilities, setFacilities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchFacilities = async () => {
        try {
          setLoading(true);
          // Use the correct backend URL
          const apiUrl = process.env.NODE_ENV === 'development' 
            ? 'http://localhost:5000/api/facilities'
            : '/api/facilities';
          
          const response = await axios.get(apiUrl);
          setFacilities(response.data.facilities || []);
        } catch (err) {
          console.error('Error fetching facilities:', err);
          setError(
            err.response?.data?.message || 
            'Failed to load facilities. Please try again later.'
          );
        } finally {
          setLoading(false);
        }
      };
  
      fetchFacilities();
    }, []);

  const handleEdit = (id) => {
    navigate(`/facilities/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this facility?')) {
      try {
        await axios.delete(`/api/facilities/${id}`);
        setFacilities(facilities.filter(facility => facility._id !== id));
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete facility');
      }
    }
  };

  const handleAddNew = () => {
    navigate('/facilities/new');
  };

  return (
    <div className="facilities-container">
        <title>Facilites</title>
      <div className="facilities-header">
        <h2>Facilities Management</h2>
        <button onClick={handleAddNew} className="add-facility-btn">
          Add New Facility
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading-message">Loading facilities...</div>
      ) : facilities.length === 0 ? (
        <div className="no-facilities">
          No facilities found. <button onClick={handleAddNew}>Add your first facility</button>
        </div>
      ) : (
        <div className="facilities-table-container">
          <table className="facilities-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Code</th>
                <th>Type</th>
                <th>Protocol</th>
                <th>Matching</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {facilities.map((facility) => (
                <tr key={facility._id}>
                  <td>{facility.name}</td>
                  <td>{facility.code}</td>
                  <td>{facility.type}</td>
                  <td>{facility.protocol}</td>
                  <td>{facility.showInMatching ? 'Yes' : 'No'}</td>
                  <td className="actions-cell">
                    <button 
                      onClick={() => handleEdit(facility._id)}
                      className="edit-btn"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(facility._id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Facilities;