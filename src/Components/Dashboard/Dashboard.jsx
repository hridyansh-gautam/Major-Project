import React from "react";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Top Section with Navigation */}
      <div className="dashboard-header">
        <button className="nav-button">File Cabinet & File Card</button>
        <button className="nav-button">Facility Selector</button>
        <button className="nav-button">Tool Bar</button>
      </div>

      {/* Main Content Area */}
      <div className="dashboard-main">
        {/* Left Sidebar */}
        <div className="sidebar">
          <h3>Hanson, James</h3>
          <p>Medical ID: 1576826</p>
          <p>DOB: 10/9/2012</p>
          <p>Action Needed (9)</p>
        </div>

        {/* Work Area */}
        <div className="work-area">
          <h2>All Data for Green River Regional (15 of 15)</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Medical ID</th>
                <th>Birth Date</th>
                <th>Inpatient</th>
                <th>OP Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Montorsan, Emily</td>
                <td>1576829</td>
                <td>10/6/2012</td>
                <td>Referred</td>
                <td>10/9/2012</td>
              </tr>
              <tr>
                <td>Douglas, Sally</td>
                <td>1576830</td>
                <td>10/8/2012</td>
                <td>Inconclusive</td>
                <td>10/9/2012</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="dashboard-footer">
        <button className="action-button">Add Entry</button>
        <button className="action-button">Delete Entry</button>
        <button className="action-button">Save</button>
      </div>
    </div>
  );
};

export default Dashboard;