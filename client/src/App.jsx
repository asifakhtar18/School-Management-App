import { Box } from "@mui/material";
import Sidebar from "./components/sidebax/Sidebar";
import "./App.css";
import Routes from "./routes/routes";
import { Outlet } from "react-router-dom";
import { useApp } from "./context/AppContext";

const App = () => {
  const { user } = useApp();
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
