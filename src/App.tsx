import "./App.css";
import ProfilePage from "./pages/ProfilePage";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router";
import RootLayoutPage from "./pages/RootLayoutPage";
import TodoListPage from "./pages/TodoListPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayoutPage />,
    children: [
      {
        index: true,
        element: (
          <Navigate
            to="/tasks"
            replace
          />
        ),
      },
      { path: "/tasks", element: <TodoListPage /> },
      { path: "/profile", element: <ProfilePage /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
