import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Dashboard.css';
const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/");
          return;
        }

        const response = await axios.get("http://localhost:5000/api/auth/user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data", error);
        localStorage.removeItem("token");
        navigate("/");
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>HiTrack Dashboard</h2>
        <ul>
          <li>Patient Records</li>
          <li>Screening Data</li>
          <li>Reports</li>
          <li onClick={handleLogout} className="logout">Logout</li>
        </ul>
      </div>

      <div className="dashboard-content">
        {user ? (
          <>
            <h1>Welcome, {user.name}</h1>
            <p>Email: {user.email}</p>
            <p>Doctor ID: {user.doctorId || "N/A"}</p>
          </>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
