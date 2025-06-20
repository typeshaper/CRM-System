import { App as AntdApp } from "antd";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import "./App.css";
import AppLayout from "./layouts/AppLayout";
import AuthLayout from "./layouts/AuthLayout";
import ProfilePage from "./pages/app/ProfilePage";
import TodoListPage from "./pages/app/TodoListPage";
import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";

const isAuth = !!localStorage.getItem("refreshToken");

const router = createBrowserRouter([
  {
    path: "/",
    element: isAuth ? <Navigate to="/app" /> : <Navigate to="/auth" />,
  },
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
  return (
    <AntdApp>
      <RouterProvider router={router} />
    </AntdApp>
  );
};

export default App;
