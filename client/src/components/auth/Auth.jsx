import { useState } from "react";
import { Box, TextField, Typography } from "@mui/material";

import { useApp } from "../../context/AppContext";

export default function Auth({ isRegister = false }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { handleLogin, handleRegister } = useApp();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isRegister) {
      handleRegister(formData);
    } else {
      handleLogin(formData);
    }
  };

  return (
    <Box>
      <Typography variant="h4">{isRegister ? "Register" : "Login"}</Typography>
      <Box component="form" onSubmit={handleSubmit}>
        {isRegister && (
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        )}
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <TextField
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
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
          />
        )}
        <button type="submit">{isRegister ? "Register" : "Login"}</button>
      </Box>
    </Box>
  );
}
