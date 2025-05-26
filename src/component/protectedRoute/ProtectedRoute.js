import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("ProtectedRoute user:", user);
  if (!user || !user.role) {
    console.log("User not found or role is missing");
  } else {
    console.log("User role:", user.role);
  }

  if (!user) return <Navigate to="/login" />;
  if (!allowedRoles.includes(user.role)) return <Navigate to="/unauthorized" />;

  return <Outlet />;
};

export default ProtectedRoute;
