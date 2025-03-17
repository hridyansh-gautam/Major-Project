import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import babyImage from "../Assets/babyImage.jpg";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Both fields are required!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email: username,
        password,
      });

      // Store JWT token in localStorage
      localStorage.setItem("token", response.data.token);

      // Redirect to Dashboard
      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <div className="left">
        <h1 className="title">HI*TRACK</h1>
        <p className="subtitle">Successful Hearing Screening Tracking and Data Management</p>
        <img src={babyImage} alt="Baby with parents" className="banner-image" />
      </div>

      <div className="right">
        <h3 className="sign-in">Sign in</h3>
        <div className="login-box">
          <form onSubmit={handleSubmit}>
            {error && <p className="error-message">{error}</p>}

            <div className="input-group">
              <label>Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? "Signing in..." : "Start"}
            </button>
            <div className="newuser">
              New user? <a href="/signup">Signup</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
