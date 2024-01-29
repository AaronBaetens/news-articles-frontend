import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { AuthProvider } from "@shared/authentication/AuthContext";
import { useAuth } from "@shared/authentication/useAuth";
import Dashboard from "@pages/Home";
import Favorites from "@pages/Favorites";
import Navbar from "@components/Navbar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "@shared/theme/theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;

const AppContent = () => {
  const { isAuthenticated, handleLogout, loadingAuth } = useAuth();

  return (
    <Router>
      {isAuthenticated ? (
        <>
          <Navbar onLogout={handleLogout} loadingAuth={loadingAuth} />
          <Routes>
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </>
      ) : (
        <Login />
      )}
    </Router>
  );
};
