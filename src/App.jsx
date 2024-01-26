import { useState } from "react";
import Login from "./pages/Login";
import ArticlesList from "./pages/ArticlesList";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div>
      {!isAuthenticated ? (
        <Login onLogin={setIsAuthenticated} />
      ) : (
        <ArticlesList />
      )}
    </div>
  );
};

export default App;
