import { useState } from "react";

const useLogin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (username, password) => {
    setLoading(true);
    // Simulate a network request
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock authentication logic
    if (username === "admin" && password === "password") {
      setIsAuthenticated(true);
      setLoading(false);
      return true;
    } else {
      alert("Invalid credentials");
      setLoading(false);
      return false;
    }
  };

  return { isAuthenticated, handleLogin, loading };
};

export default useLogin;
