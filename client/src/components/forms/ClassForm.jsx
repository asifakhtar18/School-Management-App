import { useState, useEffect } from "react";
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
} from "@mui/material";
import { useClasses } from "../../context/ClassContext";
import { useTeachers } from "../../context/TeachersContext";
import { useApp } from "../../context/AppContext";

const ClassForm = ({ currentClass, setCurrentClass }) => {
  const [formData, setFormData] = useState({
    name: "",
    year: "",
    teacher: "",
    fees: "",
    students: [],
  });

  const [teachersData, setTeachers] = useState([]);

  const { setOpenModal } = useApp();
  const { teachers } = useTeachers();
  const { handleCreateClass, handleUpdateClass } = useClasses();

  useEffect(() => {
    if (currentClass) {
      setFormData(currentClass);
    } else {
      setFormData({ name: "", year: "", teacher: "", fees: "", students: [] });
    }
  }, [currentClass]);

  useEffect(() => {
    setTeachers(teachers);
  }, [teachers]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTeacherChange = (e) => {
    setFormData({ ...formData, teacher: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentClass) {
      await handleUpdateClass(currentClass._id, formData);
    } else {
      await handleCreateClass(formData);
    }

    setCurrentClass(null);
    setFormData({ name: "", year: "", teacher: "", fees: "", students: [] });
  };

  return (
    <Box
      maxWidth={800}
      mx="auto"
      component="form"
      onSubmit={handleSubmit}
      sx={{ p: 4, backgroundColor: "white", borderRadius: 1.5, boxShadow: 1 }}
    >
      <Typography variant="h6">
        {currentClass ? "Update Class" : "Create Class"}
      </Typography>

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
        <TextField
          label="Year"
          name="year"
          type="number"
          value={formData.year}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          required
        />
      </Box>
      <Box mb={2}>
        <FormControl fullWidth variant="outlined" required>
          <InputLabel>Teacher</InputLabel>
          <Select
            label="Teacher"
            name="teacher"
            value={formData.teacher}
            onChange={handleTeacherChange}
          >
            {teachersData?.map((teacher) => (
              <MenuItem key={teacher._id} value={teacher._id}>
                {teacher.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box mb={2}>
        <TextField
          label="Fees"
          name="fees"
          type="number"
          value={formData.fees}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          required
        />
      </Box>
      <Box mt={3}>
        <Button
          type="submit"
          variant="contained"
          color={!currentClass ? "success" : "primary"}
          sx={{ textTransform: "none" }}
        >
          {currentClass ? "Update" : "Create"} Class
        </Button>
      </Box>
    </Box>
  );
};

export default ClassForm;
