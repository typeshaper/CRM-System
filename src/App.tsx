import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router";
import RootLayout from "./pages/Root";

const router = createBrowserRouter([
  { path: "/", element: <RootLayout />, children: [] },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
