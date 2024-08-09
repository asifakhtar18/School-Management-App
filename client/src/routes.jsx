import { useRoutes } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Classes from "./pages/Classes";
import Students from "./pages/Students";
import Teachers from "./pages/Teachers";

const Routes = () => {
  return useRoutes([
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/classes", element: <Classes /> },
    { path: "/students", element: <Students /> },
    { path: "/teachers", element: <Teachers /> },
  ]);
};

export default Routes;
