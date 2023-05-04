import React from "react";
import { Navigate } from "react-router-dom";
export default function Protected({ children }) {
  const authUser = localStorage.getItem("userData");
  if (!authUser) {
    return <Navigate to="/" />;
  }
  return children;
}