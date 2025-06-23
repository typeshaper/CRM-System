import { Navigate, Outlet } from "react-router";

const ProtectedRoutes = () => {
  const isAuth = !!localStorage.getItem("refreshToken");
  const content = isAuth ? <Outlet /> : <Navigate to="/auth" />;

  return content;
};

export default ProtectedRoutes;
