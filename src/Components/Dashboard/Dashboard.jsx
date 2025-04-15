import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./Dashboard.css";

const Dashboard = () => {
  const [facilities, setFacilities] = useState([]);
  const [selectedFacility, setSelectedFacility] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeFacility, setActiveFacility] = useState("KMC Hospital Mangalore");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("isAuthenticated");
    navigate("/");
  };

  const resetDate = () => {
    setFromDate("");
    setToDate("");
  }

  const today = new Date().toISOString().split("T")[0];
  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 17);
  const minDateString = minDate.toISOString().split("T")[0];


  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/facilities');
        setFacilities(response.data.facilities || []);
        
        // Set default selection if facilities exist
        if (response.data.facilities?.length > 0) {
          setSelectedFacility(response.data.facilities[0]._id);
        }
      } catch (err) {
        console.error('Error fetching facilities:', err);
        setError('Failed to load facilities. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchFacilities();
  }, []);

  const handleFacilityChange = (e) => {
    setSelectedFacility(e.target.value);
  };

  if (loading) {
    return <div className="loading">Loading facilities...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }


  return (
    <div className="dashboard-container">
      <title>Dashboard</title>
      {/* Top Navigation Bar */}
      <div className="navigation-bar">
        <div className="file-section">
          <button className="nav-button active">All Folders</button>
          <button className="nav-button">No Action</button>
        </div>
        <div className="facility-selection">
          <label htmlFor="facility-select">Select Facility:</label>
          <select
            id="facility-select"
            value={selectedFacility}
            onChange={handleFacilityChange}
            disabled={facilities.length === 0}
          >
            {facilities.map(facility => (
              <option key={facility._id} value={facility._id}>
                {facility.name} ({facility.code})
              </option>
            ))}
          </select>
        </div>
        <div className="tool-section">
          <button className="tool-button">Letters</button>
          <button className="tool-button">Reports</button>
          <button className="tool-button">Merge</button>
          <button className="tool-button">Delete</button>
          <button className="tool-button">Settings</button>
          <button className="tool-button" id="logout" onClick={handleLogout}> Log Out </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        {/* Title Bar */}
        <div className="title-bar">
          <h3>All Data for {activeFacility} (15 of 15)</h3>
        </div>

        {/* Date Filter Section */}
        <div className="date-filter">
          <div className="date-range">
            <span>DOB From:</span>
            <input 
              type="date" min={minDateString} max={today} 
              value={fromDate} 
              onChange={(e) => setFromDate(e.target.value)} 
            />
            <span>To:</span>
            <input 
              type="date" min={minDateString} max={today} 
              value={toDate} 
              onChange={(e) => setToDate(e.target.value)} 
            />
            <button className="set-date-button">Filter</button>
            <button className="reset-date-button" onClick={resetDate}>Reset Date</button>
          </div>
          <div className="advanced-filter">
            <label>
              <input type="checkbox" /> Milestones
            </label>
            <button className="advanced-button">Advanced Find</button>
          </div>
        </div>

        <div className="dashboard-content">
          {/* Left Sidebar */}
          <div className="patient-sidebar">
            <div className="patient-info">
              <h4>Hanson, James</h4>
              <p>Medical ID: 1576826</p>
              <p>DOB: 10/9/2012</p>
              <p className="action-needed">Action Needed (9)</p>
            </div>
            
            <div className="sidebar-menu">
              <div className="sidebar-item">
                <span className="icon">📋</span> Record Overview
              </div>
              <div className="sidebar-item">
                <span className="icon">📊</span> Tracking Options
                <div className="sub-item">➜ Demographics</div>
                <div className="sub-item">➜ Screening</div>
              </div>
              <div className="sidebar-item">
                <span className="icon">⚠️</span> Risk Indicators
              </div>
              <div className="sidebar-item">
                <span className="icon">🔍</span> Diagnostics Manager
              </div>
              <div className="sidebar-item highlighted">
                <span className="icon">📝</span> Hearing Disposition
              </div>
              <div className="sidebar-item">
                <span className="icon">🔄</span> Classification
              </div>
              <div className="sidebar-item">
                <span className="icon">🔔</span> EI Services
              </div>
              <div className="sidebar-item">
                <span className="icon">✉️</span> Letters
              </div>
              <div className="sidebar-item">
                <span className="icon">↔️</span> Transfer
              </div>
            </div>
            
            <div className="messages-section">
              <h5>Messages:</h5>
              <p className="message">CONFIRMED DOB: 10/9/12</p>
              <p className="message">Milestone: 6M</p>
            </div>
          </div>

          {/* Main Work Area */}
          <div className="work-area">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Baby Name</th>
                  <th>Medical ID</th>
                  <th>Birth Date</th>
                  <th>Inpatient</th>
                  <th>IP Date</th>
                  <th>Outpatient</th>
                  <th>OP Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Hanson, James</td>
                  <td>1575826</td>
                  <td>10/9/2012</td>
                  <td>No Out Scrn-Eval</td>
                  <td>10/9/2012</td>
                  <td>No Out Scrn-Eval</td>
                  <td>10/9/2012</td>
                </tr>
                <tr>
                  <td>Montorsan, Emily</td>
                  <td>1577691</td>
                  <td>10/9/2012</td>
                  <td>Hospitalized</td>
                  <td>10/9/2012</td>
                  <td>No Out Scrn-Eval</td>
                  <td>10/9/2012</td>
                </tr>
                <tr>
                  <td>Douglas, Sally</td>
                  <td>1575852</td>
                  <td>10/8/2012</td>
                  <td>Referred</td>
                  <td>10/9/2012</td>
                  <td>Referred</td>
                  <td>10/9/2012</td>
                </tr>
                <tr>
                  <td>Clarke, Felicia</td>
                  <td>1577691</td>
                  <td>10/9/2012</td>
                  <td>Hospitalized</td>
                  <td>10/9/2012</td>
                  <td>No Out Scrn-Eval</td>
                  <td>10/9/2012</td>
                </tr>
                <tr>
                  <td>Rose, Kevin</td>
                  <td>1577348</td>
                  <td>10/9/2012</td>
                  <td>Referred</td>
                  <td>10/9/2012</td>
                  <td>Inconclusive</td>
                  <td>10/9/2012</td>
                </tr>
                <tr>
                  <td>Stevens, Rebecca</td>
                  <td>1565724</td>
                  <td>10/9/2012</td>
                  <td>Inconclusive</td>
                  <td>10/9/2012</td>
                  <td>No Out Scrn-Eval</td>
                  <td>10/9/2012</td>
                </tr>
                <tr>
                  <td>Willard, Kevin</td>
                  <td>1758632</td>
                  <td>10/9/2012</td>
                  <td>Hospitalized</td>
                  <td>10/9/2012</td>
                  <td>No Out Scrn-Eval</td>
                  <td>10/9/2012</td>
                </tr>
                <tr>
                  <td>Douglas, Cammie</td>
                  <td>1874231</td>
                  <td>12/7/2012</td>
                  <td>Passed</td>
                  <td>10/9/2013</td>
                  <td>Passed</td>
                  <td>10/9/2013</td>
                </tr>
                <tr>
                  <td>Postlate, Cindy</td>
                  <td>1574553</td>
                  <td>10/7/2012</td>
                  <td>Passed</td>
                  <td>10/9/2012</td>
                  <td>Passed</td>
                  <td>10/9/2012</td>
                </tr>
                <tr>
                  <td>Johnson, Emily</td>
                  <td>1579724</td>
                  <td>10/9/2012</td>
                  <td>Inconclusive</td>
                  <td>10/9/2012</td>
                  <td>Passed</td>
                  <td>10/9/2012</td>
                </tr>
                <tr>
                  <td>Rose, Brittany</td>
                  <td>1548726</td>
                  <td>10/5/2012</td>
                  <td>Inconclusive</td>
                  <td>10/9/2012</td>
                  <td>Passed</td>
                  <td>10/9/2012</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Filter and Action Area */}
        <div className="filter-action-area">
          <div className="filter-controls">
            <div className="filter-row">
              <div className="filter-group">
                <label>Status:</label>
                <select className="filter-select">
                  <option>Any Status</option>
                </select>
              </div>
              <div className="filter-group">
                <label>Type:</label>
                <select className="filter-select">
                  <option>PEOPLE</option>
                </select>
              </div>
              <div className="filter-group">
                <label>Right:</label>
                <select className="filter-select">
                  <option>Blank</option>
                </select>
              </div>
              <div className="filter-group">
                <label>Clinician:</label>
                <select className="filter-select">
                  <option>...</option>
                </select>
              </div>
            </div>
            <div className="filter-row">
              <div className="filter-group">
                <label>Date:</label>
                <input type="date" min={minDateString} max={today} 
               value={fromDate} className="date-input" />
                <select className="time-select">
                  <option>0</option>
                </select>
              </div>
              <div className="filter-group">
                <label>Left:</label>
                <select className="filter-select">
                  <option>Blank</option>
                </select>
              </div>
              <div className="filter-group">
                <label>Source:</label>
                <select className="filter-select">
                  <option>Blank</option>
                </select>
              </div>
              <div className="filter-group">
                <label htmlFor="facility-select">Select Facility:</label>
                <select
                  id="facility-select"
                  value={selectedFacility}
                  onChange={handleFacilityChange}
                  disabled={facilities.length === 0}
                >
                  {facilities.map(facility => (
                    <option key={facility._id} value={facility._id}>
                      {facility.name} ({facility.code})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="action-buttons">
            <button className="action-button">Find Similar</button>
            <button className="action-button">Create Data</button>
            <button className="action-button"
            onClick={() => navigate("/facilities")}> View Facilites </button>
            <button className="action-button"
            onClick={() => navigate("/facilities/new")}> Add facility </button>
            <label><input type="checkbox" /> Combine</label>
            <button className="save-button">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;