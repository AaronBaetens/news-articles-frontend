import Login from "./pages/Login";
import { AuthProvider } from "@shared/authentication/AuthContext";
import { useAuth } from "@shared/authentication/useAuth";
import Dashboard from "@pages/Dashboard";

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

  return isAuthenticated ? <Dashboard /> : <Login />;
};
