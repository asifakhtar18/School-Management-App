import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import { motion } from "framer-motion";

import { useApp } from "../../context/AppContext";

export default function Auth({ isRegister = false }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState(null);

  const navigate = useNavigate();

  const { handleLogin, handleRegister } = useApp();
  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = null;
    if (isRegister) {
      if (formData.password !== formData.confirmPassword) {
        setErrors("Passwords do not match");
        return;
      }
      data = await handleRegister(formData);
    } else {
      data = await handleLogin(formData);
    }

    if (data.error) {
      setErrors(data.error.message);
    }
  };

  const handleClick = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    if (isRegister) {
      navigate("/login");
    } else {
      navigate("/register");
    }
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0.3, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "tween", duration: 1 }}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "#f0f0f0",

        width: "100vw",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          background: "#202020",
          width: "600px",
          height: "600px",
          borderRadius: "8px 0 0 8px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        <Typography variant="h3">Welcome!</Typography>
        <Typography>We are pleased to see you!</Typography>
      </Box>
      <Box
        sx={{
          width: "400px",
          height: "600px",
          gap: "20px",
          padding: "30px ",
          background: "#fff",
          borderRadius: "0 8px 8px 0",
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.25)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
        component="form"
        onSubmit={handleSubmit}
      >
        <Typography style={{ fontWeight: "bold" }} variant="h4">
          {isRegister ? "Register" : "Login"}
        </Typography>
        {isRegister && (
          <TextField
            fullWidth
            type="text"
            variant="standard"
            required
            label="Name"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        )}
        <TextField
          fullWidth
          variant="standard"
          type="email"
          required
          label="Email"
          name="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <TextField
          fullWidth
          variant="standard"
          required
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        {isRegister && (
          <TextField
            fullWidth
            required
            variant="standard"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
          />
        )}
        <Button
          sx={{
            background: "#202020",
            color: "#f0f0f0",
            "&:hover": {
              background: "black",
            },
          }}
          fullWidth
          variant="contained"
          type="submit"
        >
          {isRegister ? "Register" : "Login"}
        </Button>
        {errors && <Typography color="red">{errors}</Typography>}
        <Typography onClick={handleClick} style={{ cursor: "pointer" }}>
          {isRegister
            ? "Already have an account? Login"
            : "Don't have an account? Register"}
        </Typography>
      </Box>
    </Box>
  );
}
