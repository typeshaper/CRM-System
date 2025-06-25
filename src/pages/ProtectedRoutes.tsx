import { Navigate, Outlet, useNavigate } from "react-router";
import { AxiosError } from "axios";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { useDispatch } from "react-redux";
import authService from "../services/authService";
import useErrorMessage from "../hooks/useErrorMessage";
import { useEffect } from "react";
import { authActions } from "../store/auth";
import { refreshSession } from "../api/auth";

const ProtectedRoutes = () => {
  const dispatch = useDispatch();
  const accessToken = authService.getAccessToken();
  const refreshToken = localStorage.getItem("refreshToken");
  const showError = useErrorMessage();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (!accessToken && refreshToken) {
        try {
          const newTokens = await refreshSession({ refreshToken });
          authService.setAccessToken(newTokens.accessToken);
          dispatch(authActions.login());
          localStorage.setItem("refreshToken", newTokens.refreshToken);
        } catch (error) {
          if (error instanceof AxiosError) {
            if (error.status === 401) {
              localStorage.removeItem("refreshToken");
              dispatch(authActions.logout());
              navigate("/auth");
              showError(error);
            }
          }
        }
      }
    })();
  });

  const isAuth = useSelector<RootState>((state) => state.isAuthenticated);
  const content = isAuth ? <Outlet /> : <Navigate to="/auth" />;

  return content;
};
export default ProtectedRoutes;
