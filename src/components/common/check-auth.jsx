import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const CheckAuth = ({ isAuthenticated, userInfo, children }) => {
  const location = useLocation();

  //if user is not authenticated
  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    return <Navigate to={"/auth/login"} />;
  }

  //if user is authenticated and still tries to go to login or register page
  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    if (userInfo?.role === "admin") {
      return <Navigate to={"/admin/dashboard"} />;
    } else {
      return <Navigate to={"/shop/home"} />;
    }
  }

  //if user is not admin and still tries to access admin pages
  if (
    isAuthenticated &&
    userInfo?.role !== "admin" &&
    location.pathname.includes("admin")
  ) {
    return <Navigate to={"/unauth-page"} />;
  }

  //if user is admin and tries to access shop pages
  if (
    isAuthenticated &&
    userInfo?.role === "admin" &&
    location.pathname.includes("shop")
  ) {
    return <Navigate to={"/admin/dashboard"} />;
  }

  return <>{children}</>;
};

export default CheckAuth;
