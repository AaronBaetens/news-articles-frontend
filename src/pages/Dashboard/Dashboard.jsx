import ArticleList from "@components/ArticleList";
import Navbar from "@components/Navbar";
import { useAuth } from "@shared/authentication/useAuth";

const Dashboard = () => {
  const { handleLogout, loadingAuth } = useAuth();

  return (
    <>
      <Navbar onLogout={handleLogout} loadingAuth={loadingAuth} />
      <ArticleList />
    </>
  );
};

export default Dashboard;
