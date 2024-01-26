import HeadlinesList from "@components/HeadlinesList";
import Navbar from "@components/Navbar";
import { useAuth } from "@shared/authentication/useAuth";

const Dashboard = () => {
  const { handleLogout, loadingAuth } = useAuth();

  return (
    <>
      <Navbar onLogout={handleLogout} loadingAuth={loadingAuth} />
      <HeadlinesList />
    </>
  );
};

export default Dashboard;
