import React, { useState, useContext, createContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import instance from "../utils/axiosClient";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const accessToken = localStorage.getItem("accessToken");
    return !!accessToken;
  });
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  });
  const navigate = useNavigate();
  const location = useLocation();

  const login = async (payload) => {
    try {
      const response = await instance.post(`/auth/login`, payload);

      const newUser = response.data.user;
      localStorage.setItem("user", JSON.stringify(newUser));
      localStorage.setItem("accessToken", response.data.token);
      setUser(newUser);
      setIsLoggedIn(true);

      if (newUser.role === "SUPERADMIN") {
        navigate("/admin/dashboard");
      } else {
        navigate("/admin/login", {
          state: { message: "You are not authorized to access this page" },
        });
      }
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
    setUser(null);
    navigate("/");
  };

  const values = {
    isLoggedIn,
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
