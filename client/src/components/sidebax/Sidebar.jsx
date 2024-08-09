import { Avatar, Box, Button, Typography } from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import { PiStudent } from "react-icons/pi";
import { MdClass } from "react-icons/md";
import LogoutIcon from "@mui/icons-material/Logout";

import { FaChalkboardTeacher } from "react-icons/fa";
import BarChartIcon from "@mui/icons-material/BarChart";

import SideBarItem from "./SidebarItem";

const SideBar = () => {
  const user = JSON.parse(localStorage.getItem("user"));

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
          <Avatar
            sx={{ width: "30px", height: "30px" }}
            src={
              "https://img.freepik.com/free-photo/colorful-design-with-spiral-design_188544-9588.jpg"
            }
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
              border: "1px solid #DDDDDD",
              backgroundColor: "#f0f0f0",
              color: "gray",
              cursor: "pointer",
              textTransform: "none",
              position: "absolute",
              bottom: "10px",
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
