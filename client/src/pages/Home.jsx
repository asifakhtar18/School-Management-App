import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { useApp } from "../context/AppContext";
import { useEffect } from "react";
export default function Home() {
  const { user } = useApp();
  const nameArr = user?.name.split(" ");
  const updatedName = nameArr
    ?.map((name) => name?.charAt(0)?.toUpperCase() + name?.slice(1))
    ?.join(" ");

  const navigate = useNavigate();

  const handleClick = (page) => {
    if (page === "classes") {
      navigate("/classes");
    }
    if (page === "teachers") {
      navigate("/teachers");
    }
    if (page === "students") {
      navigate("/students");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        component={motion.div}
        initial={{ opacity: 0.3, scale: 0.8, y: -200 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "tween", duration: 0.9 }}
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", color: "#464846", fontFamily: "Poppins" }}
        >
          Welcome to your dashboard, {updatedName}
        </Typography>
        <Typography
          sx={{
            color: "#464846",
            fontFamily: "Poppins",
            fontSize: "20px",
            padding: "10px",
          }}
          variant="body1"
        >
          Empowering Schools with Seamless Management, Anytime, Anywhere.
        </Typography>
      </Box>
      <Box
        component={motion.div}
        initial={{ opacity: 0.3, scale: 0.8, y: 200 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "tween", duration: 0.9 }}
        sx={{ display: "flex", gap: "10px" }}
      >
        <Button
          variant="outlined"
          sx={{
            color: "#464846",
            borderColor: "#464846",
            textTransform: "none",
            padding: "10px 20px",
            borderRadius: "10px",
            marginTop: "20px",
            "&:hover": {
              backgroundColor: "#464846",
              color: "white",
            },
          }}
          onClick={() => handleClick("classes")}
        >
          <Typography variant="body1">Go to Class</Typography>
        </Button>
        <Button
          variant="outlined"
          sx={{
            color: "#464846",
            borderColor: "#464846",
            textTransform: "none",
            padding: "10px 20px",
            borderRadius: "10px",
            marginTop: "20px",
            "&:hover": {
              backgroundColor: "#464846",
              color: "white",
            },
          }}
          onClick={() => handleClick("students")}
        >
          <Typography variant="body1">Go to Students</Typography>
        </Button>
        <Button
          variant="outlined"
          sx={{
            color: "#464846",
            borderColor: "#464846",
            textTransform: "none",
            padding: "10px 20px",
            borderRadius: "10px",
            marginTop: "20px",
            "&:hover": {
              backgroundColor: "#464846",
              color: "white",
            },
          }}
          onClick={() => handleClick("teachers")}
        >
          <Typography variant="body1">Go to Teachers</Typography>
        </Button>
      </Box>
    </Box>
  );
}
