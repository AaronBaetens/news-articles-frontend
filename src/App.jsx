import Login from "./pages/Login";
import HeadlinesList from "./pages/HeadlinesList";
import { AuthProvider } from "@shared/authentication/AuthContext";
import { useAuth } from "@shared/authentication/useAuth";

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

  return isAuthenticated ? <HeadlinesList /> : <Login />;
};
