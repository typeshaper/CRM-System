import "./App.css";
import AuthLayout from "./layouts/AuthLayout";
import AppLayout from "./layouts/AppLayout";
import TodoListPage from "./pages/app/TodoListPage";
import ProfilePage from "./pages/app/ProfilePage";
import { Navigate } from "react-router";
import { createBrowserRouter, RouterProvider } from "react-router";
import { App as AntdApp } from "antd";
import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "./store";
import { refreshSession } from "./api/auth";
import { authActions } from "./store/auth";
import { useDispatch } from "react-redux";

const router = createBrowserRouter([
  {
    path: "/app",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: (
          <Navigate
            to="tasks"
            replace
          />
        ),
      },
      { path: "tasks", element: <TodoListPage /> },
      { path: "profile", element: <ProfilePage /> },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: (
          <Navigate
            to="login"
            replace
          />
        ),
      },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignUpPage /> },
    ],
  },
]);

const App = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state: RootState) => state.accessToken);
  const refreshToken = localStorage.getItem("refreshToken");

  useEffect(() => {
    (async () => {
      if (!accessToken && refreshToken) {
        const newTokens = await refreshSession({ refreshToken });
        localStorage.setItem("refreshToken", newTokens.refreshToken);
        dispatch(authActions.setAccessToken(newTokens.accessToken));
      }
    })();
  }, []);

  return (
    <AntdApp>
      <RouterProvider router={router} />
    </AntdApp>
  );
};

export default App;
