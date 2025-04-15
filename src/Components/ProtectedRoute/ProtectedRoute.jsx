import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import './ProtectedRoute.css';

const ProtectedRoute = () => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    isLoading: true,
    error: null
  });

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setAuthState({
          isAuthenticated: false,
          isLoading: false,
          error: 'No authentication token found'
        });
        return;
      }

      try {
        // Use this URL construction
        const apiUrl = process.env.NODE_ENV === 'development'
          ? 'http://localhost:5000/api/auth/verify-token'
          : '/api/auth/verify-token';

        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setAuthState({
          isAuthenticated: response.data.valid,
          isLoading: false,
          error: null
        });
      } catch (err) {
        console.error('Token verification failed:', err);
        localStorage.removeItem('token');
        setAuthState({
          isAuthenticated: false,
          isLoading: false,
          error: err.response?.data?.message || 'Session verification failed'
        });
      }
    };

    verifyToken();
  }, []);

  if (authState.isLoading) {
    return (
      <div className="auth-loading">
        <div className="spinner"></div>
        <p>Verifying your session...</p>
      </div>
    );
  }

  if (authState.error) {
    return (
      <div className="auth-error">
        <p>Authentication Error: {authState.error}</p>
        <button onClick={() => window.location.href = '/'}>
          Return to Login
        </button>
      </div>
    );
  }

  return authState.isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;