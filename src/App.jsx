import Login from "./pages/Login";
import ArticlesList from "./pages/ArticlesList";
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

  return isAuthenticated ? <ArticlesList /> : <Login />;
};
