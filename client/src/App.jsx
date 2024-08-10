import { Box } from "@mui/material";
import { motion } from "framer-motion";
import Sidebar from "./components/sidebax/Sidebar";
import Routes from "./routes/routes";
import { Outlet } from "react-router-dom";
import { useApp } from "./context/AppContext";

import "./App.css";

const App = () => {
  const { user } = useApp();
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0.3, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "tween", duration: 0.7 }}
      sx={{ display: "flex" }}
    >
      {user && <Sidebar />}
      <Box sx={{ width: "100%" }}>
        <Routes />
        <Outlet />
      </Box>
    </Box>
  );
};

export default App;
