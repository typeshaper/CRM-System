import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router";
import RootLayout from "./pages/Root";
import TodoPage from "./pages/Todo";
import { loader as todoListLoader } from "./components/TodoList";
import AddTodo, { action as addTodoAction } from "./components/AddTodo";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <TodoPage />,
        loader: todoListLoader,
        action: addTodoAction,
        id: "todo-page",
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
