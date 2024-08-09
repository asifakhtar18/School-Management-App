import { Box, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const SideBarItem = ({ icon, text, pathName }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isSelected = location.pathname === pathName;
  const handleClick = () => {
    navigate(pathName);
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        color: "#797979",
        gap: "8px",
        width: "85%",
        padding: "10px",
        cursor: "pointer",
        marginTop: "10px",
        backgroundColor: isSelected ? "#f5f5f5" : "transparent",
        "&:hover": {
          backgroundColor: "#f5f5f5",
          color: "#626367",
          borderRadius: "10px",
          border: "1px solid #DDDDDD",
        },
        borderRadius: isSelected ? "10px" : "0px",
        border: isSelected ? "1px solid #DDDDDD" : "none",
      }}
      onClick={handleClick}
    >
      {icon}

      <Typography sx={{ fontSize: "18px" }}>{text}</Typography>
    </Box>
  );
};

export default SideBarItem;
