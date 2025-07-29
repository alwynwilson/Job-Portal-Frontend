import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = sessionStorage.getItem("role");

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute
