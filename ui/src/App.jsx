import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

function App() {
  const token = JSON.parse(localStorage.getItem("token"));

  const RequireAuth = ({ children }) => {
    // Redirect to login if token is not valid
    if (!token || typeof token !== 'string' || token.length === 0) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  const RequireLogin = ({ children }) => {
    // Redirect to home if the user is already logged in
    if (token && typeof token === 'string' && token.length > 0) {
      return <Navigate to="/" />;
    }
    return children;
  };

  return (
    <>
      <Routes>
        <Route path="/" element={
          <RequireAuth>
            <HomePage />
          </RequireAuth>
        } />
        <Route path="/profile" element={
          <RequireAuth>
            <Profile />
          </RequireAuth>
        } />
        <Route path="/register" element={
          <RequireLogin>
            <Register />
          </RequireLogin>
        } />
        <Route path="/login" element={
          <RequireLogin>
            <Login />
          </RequireLogin>
        } />
      </Routes>
    </>
  );
}

export default App;
