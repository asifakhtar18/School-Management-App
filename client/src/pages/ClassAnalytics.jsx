import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Box, Typography, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

import { BASE_URL } from "../utils/constants";

const ClassAnalytics = () => {
  const { id } = useParams();
  const [classData, setClassData] = useState(null);
  const token = JSON.parse(localStorage.getItem("user")).token;

  const fetchClassData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/analytics/class/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setClassData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchClassData();
  }, []);

  if (!classData) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  const pieData = {
    labels: ["Male Students", "Female Students"],
    datasets: [
      {
        data: [classData.maleCount, classData.femaleCount],
        backgroundColor: ["#42A5F5", "#FF6384"],
        hoverBackgroundColor: ["#64B5F6", "#FF7A9B"],
      },
    ],
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      sx={{ p: 4 }}
    >
      <Typography
        variant="h4"
        component={motion.h4}
        initial={{ x: -200 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 50 }}
        sx={{ mb: 2, textAlign: "center" }}
      >
        Class Analytics : {classData.className}
      </Typography>
      <Typography
        variant="h5"
        component={motion.h5}
        initial={{ x: 200 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 50 }}
        sx={{ mb: 4 }}
      >
        Total Students : {classData.maleCount + classData.femaleCount}
        <br />
        Male : {classData.maleCount} Female : {classData.femaleCount}
      </Typography>
      <Box
        component={motion.div}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: "inertia", stiffness: 100 }}
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "400px",
          height: "400px",
          mx: "auto",
        }}
      >
        <Pie data={pieData} />
      </Box>
    </Box>
  );
};

export default ClassAnalytics;
