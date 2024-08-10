import { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Select,
  MenuItem,
  TextField,
  Box,
  CircularProgress,
} from "@mui/material";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { motion } from "framer-motion";

import { BASE_URL } from "../utils/constants";

const IncomeExpenseAnalytics = () => {
  const [data, setData] = useState(null);
  const [view, setView] = useState("monthly");
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/analytics/income-expense?period=${view}&year=${year}&month=${month}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [view, year, month]);

  if (!data) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  const chartData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Amount",
        data: [
          data.incomeExpenseByClass.reduce(
            (total, item) => total + item.totalFees,
            0
          ),
          data.incomeExpenseByClass.reduce(
            (total, item) => total + item.totalSalaries,
            0
          ),
        ],
        backgroundColor: ["#3f51b5", "#f50057"],
        borderColor: ["#3f51b5", "#f50057"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Container>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          width: "100%",
          justifyContent: "space-evenly",
          alignItems: "center",
          borderRadius: "15px",
        }}
        component={motion.div}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Income and Expense Analytics
        </Typography>

        <Box
          display="flex"
          justifyContent="space-evenly"
          gap={2}
          sx={{
            width: "100%",
            alignItems: "center",

            padding: "10px",
            margin: " 10px 0",
            borderBottom: "1px solid #c0c0c0",
          }}
        >
          <Select
            label="View"
            variant="standard"
            value={view}
            onChange={(e) => setView(e.target.value)}
            sx={{ minWidth: 120, backgroundColor: "white", borderRadius: 2 }}
          >
            <MenuItem value="monthly">Monthly</MenuItem>
            <MenuItem value="yearly">Yearly</MenuItem>
          </Select>

          {view === "monthly" && (
            <TextField
              variant="standard"
              label="Month"
              type="number"
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
              InputProps={{ inputProps: { min: 1, max: 12 } }}
            />
          )}

          <TextField
            variant="standard"
            label="Year"
            type="number"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            InputProps={{ inputProps: { min: 2000, max: 2100 } }}
            sx={{ backgroundColor: "white", borderRadius: 2 }}
          />
          <Box>
            <Typography variant="h6" align="center" sx={{ color: "gray" }}>
              Total Fees
            </Typography>
            <Typography variant="h4" align="center" sx={{ color: "#333" }}>
              {data.incomeExpenseByClass.reduce(
                (total, item) => total + item.totalFees,
                0
              )}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6" align="center" sx={{ color: "gray" }}>
              Total Salaries
            </Typography>
            <Typography variant="h4" align="center" sx={{ color: "#333" }}>
              {data.incomeExpenseByClass.reduce(
                (total, item) => total + item.totalSalaries,
                0
              )}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ width: "80%", height: "40%" }}>
          <Bar data={chartData} options={{ maintainAspectRatio: false }} />
        </Box>
      </Box>
    </Container>
  );
};

export default IncomeExpenseAnalytics;
