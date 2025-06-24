import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

const ProtectedRoutes = () => {
  const isAuth = useSelector<RootState>((state) => state.authStatus);
  const content = isAuth ? <Outlet /> : <Navigate to="/auth" />;

  return content;
};

export default ProtectedRoutes;
