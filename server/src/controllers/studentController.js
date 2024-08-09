const Student = require("../models/Student");

// CRUD operations for Student

// Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const students = await Student.find()
      .populate("class")
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    const totalStudents = await Student.countDocuments();
    res.json({
      students,
      totalStudents,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalStudents / limit),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single student by ID
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate("class");
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new student
exports.createStudent = async (req, res) => {
  const {
    name,
    gender,
    dob,
    contactDetails,
    feesPaid,
    class: class_id,
  } = req.body;
  try {
    const newStudent = new Student({
      name,
      gender,
      dob,
      contactDetails,
      feesPaid,
      class: class_id,
    });
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a student
exports.updateStudent = async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("class");
    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a student
exports.deleteStudent = async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json({ message: "Student deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
