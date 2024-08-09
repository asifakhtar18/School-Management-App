const Teacher = require("../models/Teacher");

// CRUD operations for Teacher

// Get all teachers
exports.getAllTeachers = async (req, res) => {
  try {
    const { page, limit = 10 } = req.query;
    const teachers = await Teacher.find()
      .populate("assignedClass")
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    const totalTeachers = await Teacher.countDocuments();
    res.json({
      teachers,
      totalTeachers,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalTeachers / limit),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single teacher by ID
exports.getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id).populate(
      "assignedClass"
    );
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.json(teacher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new teacher
exports.createTeacher = async (req, res) => {
  const { name, gender, dob, contactDetails, salary, assignedClass } = req.body;
  try {
    const newTeacher = new Teacher({
      name,
      gender,
      dob,
      contactDetails,
      salary,
      assignedClass,
    });
    await newTeacher.save();
    res.status(201).json(newTeacher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a teacher
exports.updateTeacher = async (req, res) => {
  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("assignedClass");
    if (!updatedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.json(updatedTeacher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a teacher
exports.deleteTeacher = async (req, res) => {
  try {
    const deletedTeacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!deletedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.json({ message: "Teacher deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
