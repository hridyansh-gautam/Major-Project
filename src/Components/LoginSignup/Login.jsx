import React, { useState } from 'react';
import './Login.css';
import babyImage from '../Assets/babyImage.jpg';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!username || !password) {
      setError('Both fields are required!');
      return;
    }

    // Clear error if valid
    setError('');

    // Proceed with form submission (backend authentication logic here)
    console.log('Logging in with:', { username, password });
  };

  return (
    <div className="container">
      {/* Left Section: Title + Image */}
      <div className="left">
        <h1 className="title">HI*TRACK</h1>
        <p className="subtitle">Successful Hearing Screening Tracking and Data Management</p>
        <img src={babyImage} alt="Baby with parents" className="banner-image" />
      </div>

      {/* Right Section: Login Box */}
      <div className="right">
        <h3 className="sign-in">Sign in</h3>
        <div className="login-box">
          <form onSubmit={handleSubmit}>
            {/* Show error message if validation fails */}
            {error && <p className="error-message">{error}</p>}

            <div className="input-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="login-button">Start</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
