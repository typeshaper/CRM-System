import { Navigate, Outlet } from "react-router";
import { refreshSession } from "../api/auth";
import { useEffect } from "react";
import { authActions } from "../store/auth";
import type { RootState } from "../store";
import useErrorMessage from "../hooks/useErrorMessage";
import authService from "../services/authService";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AxiosError } from "axios";
import { Flex, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const ProtectedRoutes = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const showError = useErrorMessage();
  const isAuth = useSelector<RootState>((state) => state.isAuthenticated);

  useEffect(() => {
    (async () => {
      const refreshToken = localStorage.getItem("refreshToken");
      const accessToken = authService.getAccessToken();

      if (refreshToken) {
        if (!accessToken) {
          try {
            const newTokens = await refreshSession({ refreshToken });
            authService.setAccessToken(newTokens.accessToken);
            dispatch(authActions.login(newTokens.refreshToken));
          } catch (error) {
            if (error instanceof AxiosError) {
              if (error.status === 401) {
                dispatch(authActions.logout());
                showError(error);
              }
            }
          }
        } else {
          dispatch(authActions.login(refreshToken));
        }
      } else {
        dispatch(authActions.logout());
      }
      setIsLoading(false);
    })();
  }, []);

  if (isLoading) {
    return (
      <Flex
        style={{ height: "100vh", width: "100wh" }}
        align="center"
        justify="center"
        gap="middle"
      >
        <Spin
          indicator={
            <LoadingOutlined
              style={{ fontSize: 60 }}
              spin
            />
          }
        />
      </Flex>
    );
  }

  if (!isAuth) {
    return (
      <Navigate
        to="/auth"
        replace
      />
    );
  }
  return <Outlet />;
};
export default ProtectedRoutes;
