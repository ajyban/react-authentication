import { Navigate } from "react-router";

export default function AuthRoute({ children }) {
  const isAuthenticated = false;

  return isAuthenticated ? children : <Navigate to="/login" />;
}
