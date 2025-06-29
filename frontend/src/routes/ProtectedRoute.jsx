import { Navigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isLogged } = useAuth();

  if (!isLogged) return <Navigate to="/" />;

  return children;
};

export default ProtectedRoute;
