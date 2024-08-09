import { Box } from "@mui/material";
import Sidebar from "./components/sidebax/Sidebar";
import "./App.css";
import Routes from "./routes";
import { Outlet } from "react-router-dom";

const App = () => {
  const user = localStorage.getItem("user");
  return (
    <Box sx={{ display: "flex" }}>
      {user && <Sidebar />}
      <Box sx={{ width: "100%" }}>
        <Routes />
        <Outlet />
      </Box>
    </Box>
  );
};

export default App;
