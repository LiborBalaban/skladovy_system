import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Outlet, Navigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = () => {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await axios.get("http://localhost:5000/get-checktoken", { withCredentials: true });
      const isAuthenticated = response.data.message;
      
      if (isAuthenticated === 'You are authenticated') {
        setAuth(true);
      } else {
        setAuth(false);
      }
    } catch (error) {
      console.error("Error checking authentication:", error);
      setAuth(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className='loadingPage flex'>
      <div className='loading'>

      </div>
    </div>;
}

  if (auth) {
    return <Outlet/>;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;