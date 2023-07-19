import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/Home";
import { MainLayout } from "../layout";
import { Income } from "../pages/Income";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/income", element: <Income /> },
    ],
  },
]);
