import { App as AntdApp } from "antd";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import "./App.css";
import AppLayout from "./layouts/AppLayout";
import AuthLayout from "./layouts/AuthLayout";
import ProfilePage from "./pages/app/ProfilePage";
import TodoListPage from "./pages/app/TodoListPage";
import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";
import ProtectedRoutes from "./pages/ProtectedRoutes";

// const router = createBrowserRouter([
//   {
//     element: <ProtectedRoutes />,
//     path: "/",
//     children: [
//       {
//         index: true,
//         element: (
//           <Navigate
//             to="app"
//             replace
//           />
//         ),
//       },
//       {
//         path: "/app",
//         element: <AppLayout />,
//         children: [
//           {
//             index: true,
//             element: (
//               <Navigate
//                 to="tasks"
//                 replace
//               />
//             ),
//           },
//           { path: "tasks", element: <TodoListPage /> },
//           { path: "profile", element: <ProfilePage /> },
//         ],
//       },
//     ],
//   },
//   {
//     path: "/auth",
//     element: <AuthLayout />,
//     children: [
//       {
//         index: true,
//         element: (
//           <Navigate
//             to="login"
//             replace
//           />
//         ),
//       },
//       { path: "login", element: <LoginPage /> },
//       { path: "signup", element: <SignUpPage /> },
//     ],
//   },
// ]);
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
      {
        element: <ProtectedRoutes />,
        children: [
          {
            index: true,
            element: (
              <Navigate
                to="app"
                replace
              />
            ),
          },
          { path: "tasks", element: <TodoListPage /> },
          { path: "profile", element: <ProfilePage /> },
        ],
      },
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
