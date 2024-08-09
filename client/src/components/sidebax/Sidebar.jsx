import { Avatar, Box, Button, Typography } from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import { PiStudent } from "react-icons/pi";
import { MdClass } from "react-icons/md";

import { FaChalkboardTeacher } from "react-icons/fa";

import SideBarItem from "./SidebarItem";

const SideBar = () => {
  return (
    <Box sx={{ width: "250px", height: "100vh", background: "#f0f0f0" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
        }}
      ></Box>
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
      </Box>
    </Box>
  );
};

export default SideBar;
