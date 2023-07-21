import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/Home";
import { MainLayout } from "../layout";
import { Income } from "../pages/Income";
import { Expense } from "../pages/Expense";
import { CategoryIncome } from "../pages/CategoryIncome";
import { CategoryExpense } from "../pages/CategoryExpense";
import { Report } from "../pages/Report";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/income", element: <Income /> },
      { path: "/income/category", element: <CategoryIncome /> },
      { path: "/expense", element: <Expense /> },
      { path: "/expense/category", element: <CategoryExpense /> },
      { path: "/report", element: <Report /> },
    ],
  },
]);
