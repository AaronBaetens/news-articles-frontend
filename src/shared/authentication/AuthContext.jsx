import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const handleLogin = (username, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === "admin" && password === "password") {
          setIsAuthenticated(true);
          localStorage.setItem("isLoggedIn", "true");
          resolve(true);
        } else {
          reject(new Error("Invalid credentials"));
          alert(new Error("Invalid credentials"));
        }
      }, 1500);
    });
  };

  const handleLogout = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setIsAuthenticated(false);
        localStorage.removeItem("isLoggedIn");
        resolve();
      }, 1500);
    });
  };

  const value = {
    isAuthenticated,
    handleLogin,
    handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
