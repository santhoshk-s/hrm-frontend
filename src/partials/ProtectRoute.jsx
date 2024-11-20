
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../utils/useAuth"; 

export const ProtectRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem("token");
  const { role } = useAuth();  


  if (!token) {
    return <Navigate to="/login" replace />;
  }


  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/home" replace />; 
  }

  return <Outlet />; 
};

export default ProtectRoute;

