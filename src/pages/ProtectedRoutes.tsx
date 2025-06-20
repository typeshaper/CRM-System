import { Navigate, Outlet } from "react-router";

const ProtectedRoutes = () => {
  const isAuth = !!localStorage.getItem("refreshToken");
  return isAuth ? <Outlet /> : <Navigate to="/auth" />;
};

export default ProtectedRoutes;
