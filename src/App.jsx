import { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./views/Auth/login";
import UserList from "./views/UserList/userlist";

function App() {
  useEffect(() => {
    document.title = "Merkle Test";
  }, []);
  return (
    <Router>
      <Routes>
        <Route element={<LoginPage />} path="/" />
        <Route element={<UserList />} path="/user-list" />
      </Routes>
    </Router>
  );
}

export default App;
