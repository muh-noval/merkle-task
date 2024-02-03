import { useEffect } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import LoginPage from "./views/Auth/login";
import UserList from "./views/UserList/userlist";

const PrivateRoute = ({ element }) => {
  const isAuthenticated = !!localStorage.getItem("token");

  return isAuthenticated ? element : <Navigate to="/" replace />;
};

function App() {
  useEffect(() => {
    document.title = "Merkle Test";
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/user-list"
          element={<PrivateRoute element={<UserList />} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
