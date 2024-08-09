import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { createStudent, updateStudent } from "../../services/studentService";
import { useStudent } from "../../context/StudentContext";

const StudentForm = ({ currentStudent, setCurrentStudent, classes }) => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    dob: "",
    contactDetails: "",
    feesPaid: false,
    class: "",
  });

  const { handleCreateStudent, handleUpdateStudent } = useStudent();

  useEffect(() => {
    if (currentStudent) {
      setFormData(currentStudent);
    } else {
      setFormData({
        name: "",
        gender: "",
        dob: "",
        contactDetails: "",
        feesPaid: false,
        class: "",
      });
    }
  }, [currentStudent]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentStudent) {
      await handleUpdateStudent(currentStudent._id, formData);
    } else {
      console.log(formData);
      await handleCreateStudent(formData);
    }
    setCurrentStudent(null);
    setFormData({
      name: "",
      gender: "",
      dob: "",
      contactDetails: "",
      feesPaid: false,
      class: "",
    });
  };

  return (
    <Box
      maxWidth={800}
      mx="auto"
      component="form"
      onSubmit={handleSubmit}
      sx={{ p: 4, backgroundColor: "white", borderRadius: 1.5, boxShadow: 1 }}
    >
      <Box mb={2}>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          required
        />
      </Box>
      <Box mb={2}>
        <FormControl fullWidth variant="outlined" required>
          <InputLabel>Gender</InputLabel>
          <Select
            label="Gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box mb={2}>
        <TextField
          label="Date of Birth"
          name="dob"
          type="date"
          value={formData.dob}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          required
        />
      </Box>
      <Box mb={2}>
        <TextField
          label="Contact Details"
          name="contactDetails"
          value={formData.contactDetails}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          required
        />
      </Box>
      <Box mb={2}>
        <FormControlLabel
          control={
            <Checkbox
              name="feesPaid"
              checked={formData.feesPaid}
              onChange={handleChange}
            />
          }
          label="Fees Paid"
        />
      </Box>
      <Box mb={2}>
        <FormControl fullWidth variant="outlined" required>
          <InputLabel>Class</InputLabel>
          <Select
            label="Class"
            name="class"
            value={formData.class}
            onChange={handleChange}
          >
            {classes.map((cls) => (
              <MenuItem key={cls._id} value={cls._id}>
                {cls.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Button
        fullWidth
        sx={{
          textTransform: "none",
          mt: 1,
          background: "#202020",
          color: "#f0f0f0",
          "&:hover": {
            background: "black",
            color: "#f0f0f0",
          },
        }}
        type="submit"
        variant="contained"
        color={!currentStudent ? "success" : "primary"}
      >
        {currentStudent ? "Update" : "Create"} Student
      </Button>
    </Box>
  );
};

export default StudentForm;
