import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const SuperAdminPages = ({ children }) => {
  const { isLoggedIn, user } = useAuth();
  const state = {
    loginMsg:
      "You are not logged in yet, please fill the following fields to continue",
    roleMsg: "You do not have permission to access this page.",
  };

  if (!isLoggedIn) {
    return <Navigate to="/admin/login" state={{ message: state.loginMsg }} />;
  }

  if (user.role !== "SUPERADMIN") {
    return <Navigate to="/admin/login" state={{ message: state.roleMsg }} />;
  }

  return children;
};

export default SuperAdminPages;
