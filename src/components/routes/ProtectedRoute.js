import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate, Route } from "react-router-dom";
import Loader from "../loader/Loader";

const ProtectedRoute = ({ isAdmin}) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  if(loading === false) {
    if (isAuthenticated === false) {
      console.log("hello")
      return <Navigate to="/login" />;
    }
    if (isAdmin === true && user.role !== "admin") {
      console.log(user)
      return <Navigate to="/login" />;
    }
    return <Outlet />
  }
  else return <Loader />
};

export default ProtectedRoute;