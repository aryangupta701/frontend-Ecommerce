import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate, Route } from "react-router-dom";

const ProtectedRoute = ({ isAdmin }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  if (isAuthenticated === false) {
    return <Navigate to="/login" />;
  }
  if (isAdmin === true && user.role !== "admin") {
    return <Navigate to="/login" />;
  }
  return <Outlet />
  
};

export default ProtectedRoute;