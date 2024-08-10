import { useRoutes } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Classes from "../pages/Classes";
import Students from "../pages/Students";
import Teachers from "../pages/Teachers";
import Home from "../pages/Home";
import IncomeExpenseAnalytics from "../pages/ExpenseAnalytics";
import ClassAnalytics from "../pages/ClassAnalytics";

const Routes = () => {
  return useRoutes([
    { path: "/", element: <Home /> },
    { path: "class/:id", element: <ClassAnalytics /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/classes", element: <Classes /> },
    { path: "/students", element: <Students /> },
    { path: "/teachers", element: <Teachers /> },
    { path: "/analytics", element: <IncomeExpenseAnalytics /> },
  ]);
};

export default Routes;
