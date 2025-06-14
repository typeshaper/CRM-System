import "./App.css";
import AuthLayout from "./layouts/AuthLayout";
import AppLayout from "./layouts/AppLayout";
import TodoListPage from "./pages/app/TodoListPage";
import ProfilePage from "./pages/app/ProfilePage";
import { Navigate } from "react-router";
import { createBrowserRouter, RouterProvider } from "react-router";
import { App as AntdApp } from "antd";

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
      { path: "sign-up", element: <TodoListPage /> },
      { path: "login", element: <ProfilePage /> },
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
