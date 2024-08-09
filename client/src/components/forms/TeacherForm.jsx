import React, { useState, useEffect, useContext } from "react";
import { createTeacher, updateTeacher } from "../../services/teacherService";
import { useTeachers } from "../../context/TeachersContext";
import {
  TextField,
  MenuItem,
  Button,
  Box,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

const TeacherForm = ({ currentTeacher, setCurrentTeacher, classes }) => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    dob: "",
    contactDetails: "",
    salary: "",
    assignedClass: "",
  });

  const { fetchTeachers } = useTeachers();

  useEffect(() => {
    if (currentTeacher) {
      setFormData(currentTeacher);
    }
  }, [currentTeacher]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentTeacher) {
      // console.log(formData);
      await updateTeacher(currentTeacher._id, formData);
    } else {
      await createTeacher(formData);
    }
    setCurrentTeacher(null);
    await fetchTeachers();
    setFormData({
      name: "",
      gender: "",
      dob: "",
      contactDetails: "",
      salary: "",
      assignedClass: "",
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
      <TextField
        fullWidth
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        margin="normal"
        required
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Gender</InputLabel>
        <Select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          label="Gender"
          required
        >
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
        </Select>
      </FormControl>
      <TextField
        fullWidth
        label="Date of Birth"
        name="dob"
        type="date"
        value={formData.dob}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Contact Details"
        name="contactDetails"
        value={formData.contactDetails}
        onChange={handleChange}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Salary"
        name="salary"
        type="number"
        value={formData.salary}
        onChange={handleChange}
        margin="normal"
        required
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Assign Class</InputLabel>
        <Select
          name="assignedClass"
          value={formData.assignedClass}
          onChange={handleChange}
          label="Assigned Class"
        >
          {classes.map((classs) => (
            <MenuItem key={classs._id} value={classs._id} sx={{ p: 2 }}>
              {classs.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        type="submit"
        variant="contained"
        color={!currentTeacher ? "success" : "primary"}
        sx={{ textTransform: "none", mt: 1 }}
      >
        {currentTeacher ? "Update" : "Create"} Class
      </Button>
    </Box>
  );
};

export default TeacherForm;
