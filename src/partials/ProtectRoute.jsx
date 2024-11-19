import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// PrivateRoute checks if the user is authenticated

export const ProtectRoute = () => {
  const token = localStorage.getItem('token'); // Check if JWT exists in localStorage
  
  if (!token) {
    return <Navigate to="/login" />; // Redirect to login page if not authenticated
  }

  return <Outlet />; // Render the child routes if authenticated
};
