import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp && decoded.exp < currentTime) {
      console.warn("Token expired. Redirecting to login.");
      localStorage.removeItem("token");
      return <Navigate to="/login" replace />;
    }

    return <Outlet />;
  } catch (error) {
    console.error("Invalid token format:", error);
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
