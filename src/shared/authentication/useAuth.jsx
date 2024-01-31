import { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";

export const useAuth = () => {
  const {
    isAuthenticated,
    handleLogin: contextHandleLogin,
    handleLogout: contextHandleLogout,
  } = useContext(AuthContext);
  const [loadingAuth, setLoadingAuth] = useState(false);

  const handleLogin = async (...args) => {
    setLoadingAuth(true);
    try {
      const result = await contextHandleLogin(...args);
      setLoadingAuth(false);
      return result;
    } catch (error) {
      setLoadingAuth(false);
      throw error;
    }
  };

  const handleLogout = async () => {
    setLoadingAuth(true);
    try {
      await contextHandleLogout();
      setLoadingAuth(false);
    } catch (error) {
      setLoadingAuth(false);
      throw error;
    }
  };

  return { isAuthenticated, handleLogin, handleLogout, loadingAuth };
};
