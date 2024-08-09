const Student = require("../models/Student");

// CRUD operations for Student

// Get all students for a specific user
exports.getAllStudents = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const userId = req.user._id; // Assuming the user ID is attached to the request
    const students = await Student.find({ user: userId })
      .populate("class")
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    const totalStudents = await Student.countDocuments({ user: userId });
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

// Get a single student by ID for a specific user
exports.getStudentById = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming the user ID is attached to the request
    const student = await Student.findOne({
      _id: req.params.id,
      user: userId,
    }).populate("class");
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new student for a specific user
exports.createStudent = async (req, res) => {
  const {
    name,
    gender,
    dob,
    contactDetails,
    feesPaid,
    class: class_id,
  } = req.body;

  console.log(class_id);
  try {
    const userId = req.user._id; // Assuming the user ID is attached to the request
    const newStudent = new Student({
      name,
      gender,
      dob,
      contactDetails,
      feesPaid,
      class: class_id,
      user: userId,
    });
    const savedStudent = await newStudent.save();
    console.log(savedStudent);
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a student for a specific user
exports.updateStudent = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming the user ID is attached to the request
    const updatedStudent = await Student.findOneAndUpdate(
      { _id: req.params.id, user: userId },
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

// Delete a student for a specific user
exports.deleteStudent = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming the user ID is attached to the request
    const deletedStudent = await Student.findOneAndDelete({
      _id: req.params.id,
      user: userId,
    });
    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json({ message: "Student deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
