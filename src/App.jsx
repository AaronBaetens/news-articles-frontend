import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { AuthProvider } from "@shared/authentication/AuthContext";
import { useAuth } from "@shared/authentication/useAuth";
import Dashboard from "@pages/Dashboard";
import Favorites from "@pages/Favorites";

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;

const AppContent = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      {isAuthenticated ? (
        <Routes>
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      ) : (
        <Login />
      )}
    </Router>
  );
};
