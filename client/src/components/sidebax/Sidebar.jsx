import { Avatar, Box, Button, Typography } from "@mui/material";
import { MdSchool } from "react-icons/md";
import HomeIcon from "@mui/icons-material/Home";
import { PiStudent } from "react-icons/pi";
import { MdClass } from "react-icons/md";
import LogoutIcon from "@mui/icons-material/Logout";

import { FaChalkboardTeacher } from "react-icons/fa";
import BarChartIcon from "@mui/icons-material/BarChart";

import SideBarItem from "./SidebarItem";

const SideBar = () => {
  const userJSON = localStorage.getItem("user");
  const user = userJSON ? JSON.parse(userJSON) : null;

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <Box sx={{ width: "350px", height: "100vh", background: "#f0f0f0" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: "10px",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "10px",
            margin: " 10px 0",
            borderBottom: "1px solid #c0c0c0",
          }}
        >
          <MdSchool
            style={{
              width: "60px",
              height: "60px",
              color: "#464846",
              borderRadius: "50%",
              padding: "10",
              backgroundColor: "#e0e0e0",
              border: "1px solid #d6d6d6",
            }}
          />
          <Typography sx={{ fontWeight: "bold", padding: "10px" }}>
            {user?.name.toUpperCase()}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ paddingLeft: "10px" }}>
        <SideBarItem icon={<HomeIcon />} text="Home" pathName={"/"} />
        <SideBarItem icon={<MdClass />} text="Classes" pathName={"/classes"} />
        <SideBarItem
          icon={<PiStudent />}
          text="Students"
          pathName={"/students"}
        />
        <SideBarItem
          icon={<FaChalkboardTeacher />}
          text="Teachers"
          pathName={"/teachers"}
        />
        <SideBarItem
          icon={<BarChartIcon />}
          text="Analytics"
          pathName={"/analytics"}
        />

        <Box>
          <Button
            endIcon={<LogoutIcon />}
            variant="contained"
            style={{
              width: "200px",
              margin: "10px",
              padding: "10px 20px",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",

              backgroundColor: "#ff6a6a",
              color: "white",
              cursor: "pointer",
              textTransform: "none",
              position: "absolute",
              bottom: "10px",
              opacity: "0.7",
              boxShadow: 0,
            }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SideBar;
