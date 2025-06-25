import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

const ProtectedRoutes = () => {
  const isAuth = useSelector<RootState>((state) => state.isAuthenticated);
  console.log("On ProtectedRoutes rendering auth status:", isAuth);

  return isAuth ? <Outlet /> : <Navigate to="/auth" />;
};
export default ProtectedRoutes;
